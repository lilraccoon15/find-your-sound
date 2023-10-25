import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    
    const logOut = () => {

    }

    const user = useSelector(state => state.user);

    return(
        <>
        <div className="flex justify-between items-center border-b border-purple py-4 px-8 w-screen ">
            <span className="font-extrabold text-[1.5rem] uppercase"><NavLink to="/">Recotify</NavLink></span>
            <nav className="w-[22rem] me-20">
                <ul className="flex justify-between font-bold text-spotify">
                    {user.email !== null ? (
                    <>
                        <NavLink to="/recommendations"><li className="hover:border-b-[0.15rem] hover:border-spotify">Recommandations</li></NavLink>
                        <NavLink to="/profile"><li className="hover:border-b-[0.15rem] hover:border-spotify">Profil</li></NavLink>
                        <li onClick={() => toggleDropdown()} className="cursor-pointer">Compte</li>
                        {isOpen && (
                            <ul onMouseLeave={() => toggleDropdown()}  className="absolute top-[70px] right-[80px] border-b border-r border-l border-purple translate-x-9 px-4 py-4 rounded-2xl -translate-y-5 bg-purple-dark">
                                <NavLink to="/settings"><li className="my-4 text-white">Paramètres</li></NavLink>
                                <div className="w-full h-[0.05rem] bg-purple"></div>
                                <li onClick={logOut} className="cursor-pointer my-4 text-white">Se déconnecter</li>
                            </ul>
                        )}
                    </>
                    ) : <NavLink to="/login"><li>Se connecter</li></NavLink> }
                </ul>
            </nav>
        </div>
        </>
    )
}

export default Navbar;