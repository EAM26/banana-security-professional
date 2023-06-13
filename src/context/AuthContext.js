import React, {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null
    });
    const navigate = useNavigate();

    function login() {
        console.log('Gebruiker is ingelogd!');
        setAuth({
            ...auth,
            isAuth: true,
            user: null
        });
        navigate('/profile');
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
        isAuth: auth,
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