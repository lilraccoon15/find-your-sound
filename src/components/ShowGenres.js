import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { deleteUserGenre, updateUserGenre } from "../redux/actions";


const ShowGenres = () => {

    const user = useSelector(state => state.user);
    const [genres, setGenres] = useState([]);
    const selectedGenresRef = useRef([]);
    const dispatch = useDispatch();


    useEffect(() => {
        const getGenres = async () => {

            try {
                const response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                },
            });
                setGenres(response.data.genres);

            } catch (error) {
                console.error('Erreur lors de la requête:', error);
            } 
        }
        getGenres();
    }, [user.token]);

    const addGenre = (genre) => {
        selectedGenresRef.current = [...selectedGenresRef.current, genre];
        console.log(selectedGenresRef.current.map(genre => genre))

        dispatch(updateUserGenre(genre));

        dispatch({
            type:'ADD_GENRES',
            payload: {
                ...user,
                genres: selectedGenresRef.current.map(genre => genre)
            },
        })
    }

    const deleteGenre = (genre) => {
        dispatch(deleteUserGenre(genre));

        dispatch({
            type:'DELETE_GENRE',
            payload: genre
        })   
    }

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
                                {/* <td className="cursor-pointer" onClick={() => deleteGenre(genre)}>Retirer</td> */}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>

        <form className="w-full bg-purple border-2 border-purple rounded mt-4 p-8 flex flex-col" >
                <div className="flex">
                    <span className="md:w-1/3 font-bold text-[1.3rem]">Ajoutes des genres</span>
                </div>
                {/* <div>
                {genres && genres.length > 0 && (
                    genres.map((genre, index) => (
                        <div className="cursor-pointer inline-block border-2 text-white border-spotify rounded-[36px] my-5 ml-5 text-purple-dark py-4 px-10 text-1xl font-bold active:bg-purple active:text-white" key={index} onClick={() => addGenre(genre)}>{genre}</div>
                        
                    ))
                )}
                </div> */}
            </form>
        </article>
        </>
    )
}

export default ShowGenres;