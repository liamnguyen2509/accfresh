import React from "react";

import Navigation from "./Navigation";
import SearchMain from "./SearchMain";
import Action from "./Action";

const NavbarMain = () => {
    return (
        <div className="navbar-main">
            <div className="container-fluid">
                <div className="wrapper">
                    <div className="logo-otr">
                        <a href="/" className="logo-a">
                            <img className="logo-img" src="assets/img/brand-logo.png" alt="brand-logo" />
                        </a>
                    </div>
                    <Navigation />
                    <SearchMain />
                    <Action />
                </div>
            </div>
        </div>
    );
}

export default NavbarMain;

