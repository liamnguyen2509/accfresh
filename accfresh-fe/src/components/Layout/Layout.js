import React from "react";

import Spinner from "./Spinner";
import NavbarMain from "./NavbarMain";
import useScript from '../../hooks/useScript';
import Copyright from "./Copyright";

const Layout = ({ children }) => {
    useScript();
    return (
        <>
        {/* <Spinner /> */}
            <NavbarMain />
            {children}
            <Copyright />
        </>
    );
}

export default Layout;