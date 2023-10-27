import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUser } from "../redux/actions";

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [userName, setUserName] = useState(user.name);
    const [userPicture, setPicture] = useState(user.picture);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    useEffect(() => {
        if(isSubmit){
            fetch('http://localhost:8000/users/', {
                method: 'PUT',
                headers: {
                    "Authorization": user.jwt,
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify({
                    name: userName,
                    picture : userPicture
                })
            })
        }
    },[isSubmit, user.jwt, userName, userPicture]);

    useEffect(() => {
        if(isDelete){ 
            fetch(`http://localhost:8000/users/`, {
                method: 'DELETE',
                headers: {
                    "Authorization": user.jwt,
                },
            });
            dispatch(logout());
            navigate('/')
        }
    },[dispatch, isDelete, navigate, user.jwt])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        dispatch(updateUser(userName, userPicture));
    };

    const deleteAccount = () => {
        setIsDelete(true);
       
    };

    return(
        <>
        <article className="mr-[200px] ml-[200px] mt-[50px] flex flex-col items-center">
        <h3 className="text-[2rem] font-bold mb-10">Modifier les informations de <span className="text-spotify underline">{user.name}</span></h3>
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
                        Nom d'utilisateur:
                    </label>
                </div>
                <div className="md:w-1/3">
                    <input className="bg-purple-dark appearance-none border-2 border-purple rounded w-full py-2 px-4 text-ligth leading-tight focus:outline-none focus:bg-purple-dark focus:border-spotify" id="username" type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
                </div>
            </div>
            {
                user.picture !== null && (
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="actual-picture">
                                Photo Actuelle:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <img className="w-[50px} h-[50px]" src={user.picture} alt="your pp"></img>
                        </div>
                    </div>
                )
            }
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="new-picture">
                        Photo URL:
                    </label>
                </div>
                <div className="md:w-1/3">
                    <input className="bg-purple-dark appearance-none border-2 border-purple rounded w-full py-2 px-4 text-light leading-tight focus:outline-none focus:bg-purple-dark focus:border-spotify" type="url" onChange={e => setPicture(e.target.value)} value={userPicture}/>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <button className="bg-spotify rounded-[36px] text-purple-dark py-4 px-16 text-2xl font-bold active:bg-purple active:text-white flex" type="submit">Mettre à jour</button>
                <div onClick={deleteAccount} className="cursor-pointer bg-purple rounded-[36px] my-4 text-white py-4 px-16 text-2xl font-bold active:bg-spotify active:text-purple-dark flex" >Supprimer mon compte</div>
            </div>
            </form>
        </article>
        
        
        
        </>
    )
}

export default Settings;