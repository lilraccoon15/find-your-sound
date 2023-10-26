import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Homepage = () => {

    const user = useSelector(state => state.user);

    return(
        <>
            <article className="flex flex-col items-center">
                <h1 className="font-black text-[5rem]">RECOTIFY</h1>
                <p className="italic font-light my-8 text-3xl">Dis-nous ce que tu aimes et on te dira quoi écouter</p>
                <div className="my-6">
                    <h2 className="font-extrabold text-[7rem] text-purple -translate-x-32">Etape 1</h2>
                    <p className="text-[2rem] mt-12 w-[33rem] font-bold">Connectes ton compte Spotify</p>
                </div>
                <div className="my-6">
                    <h2 className="font-extrabold text-[7rem] text-purple -translate-x-32">Etape 2</h2>
                    <p className="text-[2rem] mt-12 w-[33rem] font-bold">Dis-nous quels sont tes genres et artistes préférés</p>
                </div>
                <div className="my-6">
                    <h2 className="font-extrabold text-[7rem] text-purple -translate-x-32">Etape 3</h2>
                    <p className="text-[2rem] mt-12 w-[33rem] font-bold">Découvres nos recommandations</p>
                </div>
                
                { user.email === null && (
                <NavLink to ="/login"><button className="bg-spotify rounded-[36px] my-32 text-purple-dark py-4 px-16 text-2xl font-bold active:bg-purple active:text-white border border-spotify" >Se connecter</button></NavLink>
                )}

            </article>
        </>
    )
}

export default Homepage;