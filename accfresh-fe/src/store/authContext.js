import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext({
    isLogged: false,
    username: "",
    authToken: "",
    isAdmin: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [authToken, setAuthToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUserLogged = localStorage.getItem("isLogged");
        if (storedUserLogged === "1") {
            setIsLogged(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("isLogged");
        setIsLogged(false);
    }

    const loginHandler = (username, authToken, isAdmin) => {
        localStorage.setItem("isLogged", "1");
        setIsLogged(true);
        setUsername(username);
        setAuthToken(authToken);
        setIsAdmin(isAdmin);
    }

    return (
        <AuthContext.Provider
            value={{
                isLogged: isLogged,
                username: username,
                authToken: authToken,
                isAdmin: isAdmin,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;