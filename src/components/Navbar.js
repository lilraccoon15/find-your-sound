import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    
    const logOut = () => {

    }

    return(
        <>
        <div className="flex justify-between border-b border-purple pt-4 pb-4">
            <span className="font-extrabold text-[1.5rem] ml-4 w-1/2 uppercase"><NavLink to="/">Recotify</NavLink></span>
            <nav className="mr-4 w-1/3">
                <ul className="flex justify-between font-bold text-spotify">
                    <NavLink to="/recommendations"><li>Recommandations</li></NavLink>
                    <NavLink to="/profile"><li>Profil</li></NavLink>
                    <li onClick={toggleDropdown} className="cursor-pointer">Compte</li>
                    {isOpen && (
                        <ul className="absolute top-[70px] right-[80px] border-b border-r border-l border-purple pr-2 pl-2">
                            <NavLink to="/settings"><li className="border-b border-purple pt-2 pb-2">Paramètres</li></NavLink>
                            <li onClick={logOut} className="cursor-pointer pt-2 pb-2">Se déconnecter</li>
                        </ul>
                    )}
                    <NavLink to="/login"><li>Se connecter</li></NavLink>
                </ul>
            </nav>
        </div>
        </>
    )
}

export default Navbar;