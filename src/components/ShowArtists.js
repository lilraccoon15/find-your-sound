import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addArtist, deleteArtist } from "../redux/actions";

const ShowArtists = () => {

    const user = useSelector(state => state.user);
    const [artists, setArtists] = useState([]);
    const [artist, setArtist] = useState(null);
    const [isAdd, setIsAdd] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    console.log(artist);

    useEffect(() => {
        if(search[0]){
            fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist&limit=5`, {
            headers: {
                'Authorization': 'Bearer ' + user.token,
            }
            })
            .then(response => response.json())
            .then(data => setArtists(data.artists.items))
            .catch(err => console.error(err.message))
        }
    }, [search, user.token])

    const handleChange = async (e) => {
        const artistValue = e.target.value;
        if (artistValue.length >= 5) {
            setSearch(artistValue);
        }
    }

    const handleAdd = (artist) => {
        setArtist({name:artist.name, id:artist.id})
        dispatch(addArtist(artist.name, artist.id));
        setIsAdd(true);
    }

    const handleDelete = (artist, index) => {
        setArtist(artist);
        dispatch(deleteArtist(index));
        setIsDelete(true);
    }

    useEffect(() => {
        if(isAdd){
            fetch(`http://localhost:8000/artists/`, {
                method: 'POST',
                headers: {
                    "Authorization": user.jwt,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    artist: artist
                })
            });
            setIsAdd(false);
        }
    }, [artist, isAdd, user.jwt]);

    useEffect(() => {
        if(isDelete){
            console.log(artist)
            fetch(`http://localhost:8000/artists/`, {
                method: 'DELETE',
                headers: {
                    "Authorization": user.jwt,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    artist: artist
                })
            });
            setIsAdd(false);
        }
    }, [artist, isDelete, user.jwt])

    return(
        <>
        <article className="mr-[200px] ml-[200px] mt-[50px]">
            <table className="md:w-2/3 m-auto mt-10 font-bold">
                <thead>
                    <tr className="border-b border-purple font-bold">
                        <td>Artistes</td>
                        <td>Retirer</td>
                    </tr>
                </thead>
                {user && user.artists && user.artists.length > 0 && (
                    <tbody>
                        {user.artists.map((artist, index) => (
                            <tr key={index}>
                                <td>{artist.name}</td>
                                <td className="cursor-pointer" onClick={() => handleDelete(artist, index)}>Retirer</td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>

            <form className="w-full bg-purple border-2 border-purple rounded-2xl mt-4 p-8 flex flex-col" >
                <div className="flex">
                    <span className="md:w-1/3 font-bold text-[1.3rem]">Ajoutes des artistes</span>
                    <input className="md:w-2/3 bg-light appearance-none border-2 border-purple rounded w-full py-2 px-4 text-purple-dark font-bold leading-tight focus:outline-none focus:bg-light focus:border-spotify" id="artists" type="text" onChange={handleChange}/>
                </div>
                {artist !== "" && (
                <table className="md:w-1/2 m-auto mt-10 font-bold">
                    <tbody>
                        {artists.map(artist => (
                            <tr key={artist.id}>
                                <td>{artist.name}</td>
                                <td className="cursor-pointer" onClick={() => handleAdd(artist)}>Ajouter</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
            </form>
        </article>
        </>
    )
}

export default ShowArtists;