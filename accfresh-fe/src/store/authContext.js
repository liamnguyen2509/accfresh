import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext({
    isLogged: false,
    username: "",
    authToken: "",
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [authToken, setAuthToken] = useState("");

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

    const loginHandler = (username, authToken) => {
        localStorage.setItem("isLogged", "1");
        setIsLogged(true);
        setUsername(username);
        setAuthToken(authToken);
    }

    return (
        <AuthContext.Provider
            value={{
                isLogged: isLogged,
                username: username,
                authToken: authToken,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;