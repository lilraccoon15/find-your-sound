import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowRecs from "./ShowRecs";
import ShowArtists from "./ShowArtists";
import ShowGenres from "./ShowGenres";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [showRecs, setShowRecs] = useState(true);
    const [showArtists, setShowArtists] = useState(false);
    const [showGenres, setShowGenres] = useState(false);

    const navigate = useNavigate();

    const user = useSelector(state => state.user) ;

    useEffect(() => {
        if (user.email === null) {
            navigate("/login");
        }
    }, [user, navigate]);

    const toggleRecs = () => {
        setShowRecs(true);
        setShowArtists(false);
        setShowGenres(false);
    }

    const toggleArtists = () => {
        setShowArtists(true);
        setShowRecs(false);
        setShowGenres(false);
    }

    const toggleGenres = () => {
        setShowGenres(true);
        setShowRecs(false);
        setShowArtists(false);
    }

    return(
        <>
        <article className="mr-[200px] ml-[200px] mt-[50px] flex">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                <img className="w-full h-full object-cover"src={user.picture} alt="user"></img>
            </div>
            <div className="ml-[50px]">
                <h3 className="text-[2rem] mt-12 font-bold">{user.name}</h3>
                <p className="italic font-light text-1xl">{user.artists.length} artistes favoris - {user.genres.length} genres favoris</p>
            </div>
        </article>

        <article className="mr-[200px] ml-[200px] mt-[50px]">
            <ul className="flex justify-between">
                <li onClick={toggleRecs} className="font-bold cursor-pointer border-2 text-white border-spotify rounded-[36px] my-5 ml-5 text-purple-dark py-4 px-10 text-1xl font-bold">Recommandations</li>
                <li onClick={toggleArtists} className="font-bold cursor-pointer border-2 text-white border-purple rounded-[36px] my-5 ml-5 text-purple-dark py-4 px-10 text-1xl font-bold">Mes artistes</li>
                <li onClick={toggleGenres} className="font-bold cursor-pointer border-2 text-white border-purple rounded-[36px] my-5 ml-5 text-purple-dark py-4 px-10 text-1xl font-bold">Mes genres</li>
            </ul>
        </article>

        {
            showRecs && (
                <ShowRecs />
            )
        }
        {
            showArtists && (
                <ShowArtists />
            )
        }
        {
            showGenres && (
                <ShowGenres />
            )
        }
        </>
    )
}

export default Profile;