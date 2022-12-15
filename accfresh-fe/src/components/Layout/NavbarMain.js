import React, { useContext } from "react";

import Navigation from "./Navigation";
import SearchMain from "./SearchMain";
import Action from "./Action";
import Cart from "./Cart";
import Profile from "./Profile";

import AuthContext from "../../store/authContext";

const NavbarMain = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div className="navbar-main-2">
            <div className="container-fluid">
                <div className="wrapper">
                    <div className="logo-otr">
                        <a href="/" className="logo-a">
                            <img className="logo-img" src="assets/img/brand-logo.png" alt="brand-logo" />
                        </a>
                    </div>
                    <Navigation />
                    <div className="action-nav">
                        <SearchMain />
                        <Action />
                        <Cart />
                        {authCtx.isLogged && <Profile />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavbarMain;

