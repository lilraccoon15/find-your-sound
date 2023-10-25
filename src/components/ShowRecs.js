const ShowRecs = () => {

    return(
        <>
        <article className="mr-[200px] ml-[200px] mt-[50px]">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-purple font-bold">
                        <td>Titre</td>
                        <td>Artiste</td>
                        <td>Album</td>
                        <td>Durée</td>
                        <td>Retirer</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </article>
        </>
    )
}

export default ShowRecs;