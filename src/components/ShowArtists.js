import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useRef, useState } from "react";
import { updateUser } from "../redux/actions";

const ShowArtists = () => {

    const user = useSelector(state => state.user);
    const selectedArtistsRef = useRef([]);
    const [artists, setArtists] = useState([]);
    const [artist, setArtist] = useState("");
    const dispatch = useDispatch();

    const handleChange = async (e) => {

        const artistValue = e.target.value;
        setArtist(artistValue);

        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                },
                params: {
                    limit: 5,
                }
            });

            setArtists(response.data.artists.items);

        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        } 
    }

    const addArtist = (artist) => {
        selectedArtistsRef.current = [...selectedArtistsRef.current, artist];

        dispatch({
            type:'UPDATE_ARTISTS',
            payload: {
                ...user,
                artists: selectedArtistsRef.current.map(artist => artist.name)
            },
        })
        
    }

    return(
        <>
        <article className="mr-[200px] ml-[200px] mt-[50px]">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-purple font-bold">
                        <td>Artiste</td>
                        <td>Retirer</td>
                    </tr>
                </thead>
                {user && user.artists && user.artists.length > 0 && (
                    <tbody>
                        {user.artists.map((artist, index) => (
                            <tr key={index}>
                                <td>{artist}</td>
                                {/* Ajoutez ici la colonne pour "Retirer" si nécessaire */}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>

            <form className="w-full bg-purple border-2 border-purple rounded mt-4 p-8 flex flex-col" >
                <div className="flex">
                    <span className="md:w-1/3 font-bold text-[1.3rem]">Ajoutes des artistes</span>
                    <input className="md:w-2/3 bg-light appearance-none border-2 border-purple rounded w-full py-2 px-4 text-purple-dark font-bold leading-tight focus:outline-none focus:bg-light focus:border-spotify" id="artists" type="text" onChange={handleChange}/>
                </div>
                {artist !== "" && (
                <table className="md:w-1/2 m-auto mt-10 font-bold">
                    {artists.map(artist => (
                        <tr key={artist.id}>
                            <td>{artist.name}</td>
                            <td className="cursor-pointer" onClick={() => addArtist(artist)}>Ajouter</td>
                        </tr>
                    ))}
                </table>
                )}
            </form>
        </article>
        </>
    )
}

export default ShowArtists;