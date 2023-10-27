import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, SpotifyLogo } from "@phosphor-icons/react";
import { addRecommendation } from "../redux/actions";

const Recommendations = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [isArtist, setIsArtist] = useState(false);
    const [isGenre, setIsGenre] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [selectedReco, setSelectedReco] = useState(null);
    const [isAdd, setIsAdd] = useState(false);
    const artistsParams = useMemo(() => {
        let ids = [];
        user.artists.map(artist => {
           return ids.push(artist.id)
        });
        return ids;
    },[user.artists])

    useEffect(() => {
        if (user.email === null) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if(isArtist){
            fetch('https://api.spotify.com/v1/recommendations?' + new URLSearchParams({seed_artists: artistsParams.toString()}), {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            .then(response => response.json())
            .then(data => setRecommendations(data.tracks))
            .catch(err => console.error(err.message))
            setIsArtist(false);
        }
    }, [artistsParams, isArtist, user.token]);
    
    useEffect(() => {
        if(isGenre){
            fetch('https://api.spotify.com/v1/recommendations?' + new URLSearchParams({seed_artists: user.genres.toString()}), {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            .then(response => response.json())
            .then(data => setRecommendations(data.tracks))
            .catch(err => console.error(err.message))
            setIsGenre(false);
        }
    }, [artistsParams, isGenre, user.genres, user.token]);

    const handleAdd = (track) => {
        setSelectedReco(track);
        dispatch(addRecommendation(track.name, track.artists[0].name, track.album.name, track.uri));
        setIsAdd(true);
    };

    useEffect(() => {
        console.log(selectedReco);
        if(isAdd){
            fetch(`http://localhost:8000/recommendations/`, {
                method: 'POST',
                headers: {
                    "Authorization": user.jwt,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recommendation: {name: selectedReco.name, artist: selectedReco.artists[0].name, album: selectedReco.album.name, url: selectedReco.uri}
                })
            });
            setIsAdd(false);
        }
    }, [isAdd, selectedReco, user.jwt])

    return(
        <>
            {!isArtist && (<div className="flex w-screen justify-center">
                <button className="bg-purple-dark rounded-[36px] border border-spotify my-32 text-spotify py-4 px-16 text-2xl font-bold active:bg-purple active:text-white flex" onClick={() => setIsArtist(true)}>Artistes</button>
            </div>)}
            {recommendations !== null && (
                <>
                <div className="flex flex-col items-center mt-28">
                    <h1 className="text-[5rem] font-bold text-purple">RECOMMANDATIONS</h1>
                        <table className="mx-3 mt-12 w-fit">
                            <thead>
                                <tr className="border-b border-purple font-bold">
                                    <td className="p-1 px-10">Titre</td>
                                    <td className="p-1 px-10">Artists</td>
                                    <td className="p-1 px-10">Album</td>
                                    <td className="p-1 px-10">Ajouter</td>
                                    <td className="p-1 px-10">Ecouter</td>
                                </tr>
                            </thead>
                            {user && user.artists && user.artists.length > 0 && (
                                <tbody>
                                    {recommendations.map((track, index) => (
                                        <tr key={index}>
                                            <td className="p-1 px-10">{track.name}</td>
                                            <td className="p-1 px-10">{track.artists[0].name}</td>
                                            <td className="p-1 px-10">{track.album.name}</td>
                                            <td className="cursor-pointer p-1 px-16" onClick={() => handleAdd(track)}><Plus fill="#E9E2ED"/></td>
                                            <td className="p-1 px-10"><a className="text-purple-dark px-4 rounded-3xl bg-spotify flex items-center w-fit font-bold" href={track.uri}>Écouter sur <SpotifyLogo size={32} fill="#201824"/></a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                </div>
                </>
            )}
        </>
    )
}

export default Recommendations;