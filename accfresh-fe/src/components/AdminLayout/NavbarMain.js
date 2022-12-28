import React, { useContext } from "react";

import Navigation from "./Navigation";
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
                            <img className="logo-img" src={"/assets/img/brand-logo.png"} alt="brand-logo" />
                        </a>
                    </div>
                    {authCtx.isLogged && <Navigation />}
                    <div className="action-nav">
                        {authCtx.isLogged && <Profile />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavbarMain;

