import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector(state => state.user) ;
    return(
        <>
        <h1>PROFIL DE :</h1>
        <p>{user.name}</p>
        </>
    )
}

export default Profile;