import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = () => {
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.name !== null) {
            fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    email: user.email
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    // return alert('Vous êtes connecté')
                }
                fetch('http://localhost:8000/users', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.name,
                        picture: user.picture
                    })
                })
                return alert("Compte créé")
            })
            .catch(err => console.error(err))
        }
    })

    return(
        <>
        <Navbar />
        <Outlet />
        </>
    )
}

export default Layout;