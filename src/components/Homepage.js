
const Homepage = () => {
    return(
        <>
            <article className="flex flex-col items-center">
                <h1 className="font-bold text-[5rem]">RECOTIFY</h1>
                <p className="italic font-light">Dis-nous ce que tu aimes et on te dira quoi écouter</p>
                <h2 className="font-extrabold text-[9rem] text-purple -translate-x-32">Etape 1</h2>
                <h2 className="font-extrabold text-[9rem] text-purple -translate-x-32">Etape 2</h2>
                <h2 className="font-extrabold text-[9rem] text-purple -translate-x-32">Etape 3</h2>
                <button className="bg-spotify rounded-[36px] text-purple-dark p-4 font-bold" >Se connecter</button>
            </article>
        </>
    )
}

export default Homepage;