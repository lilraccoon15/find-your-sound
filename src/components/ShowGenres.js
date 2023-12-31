import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addGenre, deleteGenre, } from "../redux/actions";

const ShowGenres = () => {

    const user = useSelector(state => state.user);
    const [genres, setGenres] = useState(["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"]);
    const [genre, setGenre] = useState(null);
    const [isAdd, setIsAdd] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
    //             headers: {
    //                 'Authorization': 'Bearer ' + user.token,
    //             },
    //         })
    //         .then(response => response.json())
    //         .then( data => setGenres(data.genres))
    //         .catch (error => console.error('Erreur lors de la requête:', error))
    // }, [user.token]);

    const handleAdd = (genre) => {
        setGenre(genre);
        dispatch(addGenre(genre));
        setIsAdd(true);
    }

    const handleDelete = (genre) => {
        setGenre(genre);
        dispatch(deleteGenre(genre));
        setIsDelete(true);
    }

    useEffect(() => {
        if(isAdd){
            fetch(`http://localhost:8000/genres/`, {
                method: 'POST',
                headers: {
                    "Authorization": user.jwt,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    genre: genre
                })
            });
            setIsAdd(false);
        }
    }, [genre, isAdd, user.jwt]);

    useEffect(() => {
        if(isDelete){
            fetch(`http://localhost:8000/genres/`, {
                method: 'DELETE',
                headers: {
                    "Authorization": user.jwt,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    genre: genre
                })
            });
            setIsAdd(false);
        }
    }, [genre, isDelete, user.jwt])

    return(
        <>
        <article className="mr-[200px] ml-[200px] mt-[50px]">
            <table className="md:w-2/3 m-auto mt-10 font-bold">
                <thead>
                    <tr className="border-b border-purple font-bold">
                        <td>Genre</td>
                        <td>Retirer</td>
                    </tr>
                </thead>
                {user && user.genres && user.genres.length > 0 && (
                    <tbody>
                        {user.genres.map((genre, index) => (
                            <tr key={index}>
                                <td>{genre}</td>
                                <td className="cursor-pointer" onClick={() => handleDelete(genre)}>Retirer</td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>

        <form className="w-full bg-purple border-2 border-purple rounded mt-4 p-8 flex flex-col" >
                <div className="flex">
                    <span className="md:w-1/3 font-bold text-[1.3rem]">Ajoutes des genres</span>
                </div>
                <div>
                {genres && genres.length > 0 && (
                    genres.map((genre, index) => (
                        <div className="cursor-pointer inline-block border-2 text-white border-spotify rounded-[36px] my-5 ml-5 text-purple-dark py-4 px-10 text-1xl font-bold active:bg-purple active:text-white" key={index} onClick={() => handleAdd(genre)}>{genre}</div>
                        
                    ))
                )}
                </div>
            </form>
        </article>
        </>
    )
}

export default ShowGenres;