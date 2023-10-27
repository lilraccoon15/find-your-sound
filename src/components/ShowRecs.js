import { Trash } from "@phosphor-icons/react/dist/ssr";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecommendation } from "../redux/actions";
import { useEffect, useState } from "react";

const ShowRecs = () => {

    const user = useSelector(state => state.user);
    const [isDelete, setIsDelete] = useState(false);
    const [recommendation, setRecommendation] = useState(null);
    const dispatch = useDispatch();

    console.log(user);

    const handleDelete = (recommendation, index) => {
        setRecommendation(recommendation);
        dispatch(deleteRecommendation(index));
        setIsDelete(true);
    }

    useEffect(() => {
        if(isDelete){
            fetch(`http://localhost:8000/recommendations/`, {
                method: 'DELETE',
                headers: {
                    "Authorization": user.jwt,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recommendation: recommendation
                })
            });
            setIsDelete(false);
        }
    }, [recommendation, isDelete, user.jwt])

    return(
        <>
        <article className="mr-[200px] ml-[200px] mt-[50px]">
            <table className="w-full m-auto mt-10 font-bold">
                <thead>
                    <tr className="border-b border-purple font-bold">
                        <td>Titre</td>
                        <td>Artiste</td>
                        <td>Album</td>
                        <td>Retirer</td>
                    </tr>
                </thead>
                {
                    user && user.recommendations && user.recommendations.length > 0 && (
                    <tbody>
                        {user.recommendations.map((recommendation, index) => (
                            <tr key={index}>
                                <td>{recommendation.name}</td>
                                <td>{recommendation.artist}</td>
                                <td>{recommendation.album}</td>
                                <td className="cursor-pointer" onClick={() => handleDelete(recommendation, index)}><Trash size={20} fill="#E9E2ED"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    )
                }
            </table>
        </article>
        </>
    )
}

export default ShowRecs;