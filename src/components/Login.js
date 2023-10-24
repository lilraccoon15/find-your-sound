
const Login = () => {
    return(
        <>
            <article className="flex flex-col items-center">
                <h3 className="text-[2rem] mt-12 font-bold">J'ai un compte Spotify</h3>
                <button className="bg-spotify rounded-[36px] my-32 text-purple-dark py-4 px-16 text-2xl font-bold active:bg-purple active:text-white flex" >Se connecter via Spotify</button>

                <p className="italic font-light my-8 text-3xl">Tu n'as pas de compte Spotify ? <a href="https://www.spotify.com/fr/signup" className="text-purple font-bold active:text-spotify">Créez-en un !</a></p>
            </article>
        </>
    )
}

export default Login;