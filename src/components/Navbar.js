import { useState } from "react";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      }

    return(
        <>
        <div className="flex justify-between border-b border-purple pt-4 pb-4">
            <span className="font-extrabold text-[1.5rem] ml-4 w-1/2 uppercase">Recotify</span>
            <nav className="mr-4 w-1/3">
                <ul className="flex justify-between font-bold text-spotify">
                    <a href="/recommendations"><li>Recommandations</li></a>
                    <a href="/profile"><li>Profil</li></a>
                    <li onClick={toggleDropdown} className="cursor-pointer">Compte</li>
                    {isOpen && (
                        <ul className="absolute top-[70px] right-[80px] border-b border-r border-l border-purple pr-2 pl-2">
                            <a href="/"><li className="border-b border-purple pt-2 pb-2">Paramètres</li></a>
                            <li className="cursor-pointer pt-2 pb-2">Se déconnecter</li>
                        </ul>
                    )}
                    <a href="/login"><li>Se connecter</li></a>
                </ul>
            </nav>
        </div>
        </>
    )
}

export default Navbar;