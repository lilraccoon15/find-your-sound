import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/actions";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { hash } = useLocation();
    const [data, setData] = useState(null);
    const accessToken = hash.slice(14).split('&')[0]
    const url = 'https://accounts.spotify.com/authorize?response_type=token&client_id=' + encodeURIComponent(process.env.REACT_APP_CLIENT_ID)
        +'&scope=' + encodeURIComponent('user-read-private user-read-email')
        +'&redirect_uri=' + encodeURIComponent('http://localhost:3000/login')
        +'&state=' + encodeURIComponent('JBNDzndqnzIUDfNZDbfez5qe4648');
    console.log(url);
    useEffect(() => {
        if (accessToken){
      fetch('https://api.spotify.com/v1/me',{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => response.json())
      .then(data => setData(data) )
      .catch(err => console.error(err.message))
    }
    });

    useEffect(() => {
        if(data !== null) {
            if (data.images && data.images[1] && data.images[1].url !== undefined) {
                dispatch(login(data.display_name, data.email, data.images[1].url , accessToken));
            } else {
                dispatch(login(data.display_name, data.email, "no_image" , accessToken));
            }
            return navigate('/profile');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, data])
    
    return(
        <>
            <article className="flex flex-col items-center">
                <h3 className="text-[2rem] mt-12 font-bold">J'ai un compte Spotify</h3>
                <a href={url} className="bg-spotify rounded-[36px] my-32 text-purple-dark py-4 px-16 text-2xl font-bold active:bg-purple active:text-white flex" >Se connecter via Spotify</a>

                <p className="italic font-light my-8 text-3xl">Tu n'as pas de compte Spotify ? <a href="https://www.spotify.com/fr/signup" className="text-purple font-bold active:text-spotify">Créez-en un !</a></p>
            </article>
        </>
    )
}

export default Login;