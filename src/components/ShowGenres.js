import { useSelector } from "react-redux";
import axios from 'axios';
import { useState } from "react";

const ShowGenres = () => {

    const user = useSelector(state => state.user);
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState("");

    const handleChange = async (e) => {

        const genreValue = e.target.value;
        setGenre(genreValue);

        try {
            const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                'Authorization': 'Bearer ' + user.token,
            },
            params: {
                seed_genres: genre,
                limit:5
            }
        });

            setGenres(response.data.genres.items);

        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        } 
    }

    return(
        <>
        <article className="mr-[200px] ml-[200px] mt-[50px]">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-purple font-bold">
                        <td>Genre</td>
                        <td>Retirer</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

        <form className="w-full bg-purple border-2 border-purple rounded mt-4 p-8 flex flex-col" >
                <div className="flex">
                    <span className="md:w-1/3 font-bold text-[1.3rem]">Ajoutes des genres</span>
                    <input className="md:w-2/3 bg-light appearance-none border-2 border-purple rounded w-full py-2 px-4 text-purple-dark font-bold leading-tight focus:outline-none focus:bg-light focus:border-spotify" id="artists" type="text" onChange={handleChange}/>
                </div>
                {genre !== "" && (
                <table className="md:w-1/2 m-auto mt-10 font-bold">
                    {genres.map(genre => (
                        <tr key={genre.id}>
                            <td>{genre.name}</td>
                            <td className="cursor-pointer">Ajouter</td>
                        </tr>
                    ))}
                </table>
                )}
            </form>
        </article>
        </>
    )
}

export default ShowGenres;