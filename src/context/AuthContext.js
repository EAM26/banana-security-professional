import React, {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

async function getUserData(jwt_token, decoded_token, auth, setAuth, navigate) {

    try {
        const response = await axios.get(`http://localhost:3000/600/users/${decoded_token.sub}`, {headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt_token}`
        }
        })
        setAuth({
            ...auth,
            isAuth: true,
            user: {
                email: response.data.email,
                username: response.data.username,
            }
        });
        navigate('/profile');
    } catch (e) {
        console.error(e)
    }





}
function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null
    });
    const navigate = useNavigate();

    function login(jwt_token) {
        const decodedToken = jwt_decode(jwt_token)
        localStorage.setItem('token', jwt_token)


        void getUserData(jwt_token, decodedToken, auth, setAuth, navigate)

        console.log('Gebruiker is ingelogd!');
        // navigate('/profile');

    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        setAuth({
            ...auth,
            isAuth: false,
            user: null
        });
        navigate('/');
    }

    const contextData = {
        isAuth: auth.isAuth, user: auth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;