import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/actions";
import { deleteUser } from "../redux/actions";

const Settings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const user = useSelector(state => state.user);
    
    useEffect(() => {
        if (user.email === null) {
            navigate("/login");
        }
    }, [user, navigate]);
    
    const [userName, setUserName] = useState(user.name);
    const [userPicture, setPicture] = useState("no-image");

    const handleChange = (e) => {
        setUserName(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(file){
            setPicture(file);
        }
        else {
            setPicture("no-image");
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            ...user,
            name: userName,
            picture: userPicture
        }

        dispatch(updateUser(updatedUser));
        // dispatch(updateUser({name: userName, picture: userPicture}));
    }

    const deleteAccount = () => {
        dispatch(deleteUser(user.email));
        navigate("/");
    }

    return(
        <>
        <article className="mr-[200px] ml-[200px] mt-[50px] flex flex-col items-center">
        <h3 className="text-[2rem] font-bold mb-10">Modifier les informations de <span className="text-spotify underline">{user.name}</span></h3>
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
                        Nom d'utilisateur
                    </label>
                </div>
                <div className="md:w-1/3">
                    <input className="bg-purple-dark appearance-none border-2 border-purple rounded w-full py-2 px-4 text-ligth leading-tight focus:outline-none focus:bg-purple-dark focus:border-spotify" id="username" type="text" value={userName} onChange={handleChange}/>
                </div>
            </div>
            {
                user.picture !== null && (
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="actual-picture">
                                Photo Actuelle
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <img className="w-[50px} h-[50px]" src={user.picture} alt="user picture"></img>
                        </div>
                    </div>
                )
            }
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="new-picture">
                        Photo
                    </label>
                </div>
                <div className="md:w-1/3">
                    <input className="bg-purple-dark appearance-none border-2 border-purple rounded w-full py-2 px-4 text-light leading-tight focus:outline-none focus:bg-purple-dark focus:border-spotify" type="file" onChange={handleFileChange}/>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <button className="bg-spotify rounded-[36px] text-purple-dark py-4 px-16 text-2xl font-bold active:bg-purple active:text-white flex" type="submit">Mettre à jour</button>
                <div onClick={deleteAccount}className="bg-purple rounded-[36px] my-4 text-white py-4 px-16 text-2xl font-bold active:bg-spotify active:text-purple-dark flex" >Supprimer mon compte</div>
            </div>
            </form>
        </article>
        
        
        
        </>
    )
}

export default Settings;