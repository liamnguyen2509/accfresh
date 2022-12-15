import React from "react";

import NavbarMain from "./NavbarMain";
import Copyright from "./Copyright";

const Layout = ({ children }) => {
    return (
        <>
            <NavbarMain />
                {children}
            <Copyright />
        </>
    );
}

export default Layout;