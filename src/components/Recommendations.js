import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {

    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.email === null) {
            navigate("/login");
        }
    }, [user, navigate]);

    return(
        <>
        affichage des recommandations
        </>
    )
}

export default Recommendations;