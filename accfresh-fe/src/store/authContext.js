import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext({
    isLogged: false,
    onLogout: () => {},
    onLogin: (userId, email, balance, authToken, isAdmin) => {}
});

export const AuthContextProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const storedUserLogged = localStorage.getItem("isLogged");
        if (storedUserLogged === "1") {
            setIsLogged(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("isLogged");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("uid");
        localStorage.removeItem("email");
        localStorage.removeItem("balance");
        localStorage.removeItem("authToken");
        setIsLogged(false);
    }

    const loginHandler = (userId, email, balance, authToken, isAdmin) => {
        localStorage.setItem("isLogged", "1");
        localStorage.setItem("isAdmin", isAdmin ? "1" : "0");
        localStorage.setItem("uid", userId);
        localStorage.setItem("email", email);
        localStorage.setItem("balance", balance);
        localStorage.setItem("authToken", authToken);
        
        setIsLogged(true);

        console.log(email);
    }

    return (
        <AuthContext.Provider
            value={{
                isLogged: isLogged,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;