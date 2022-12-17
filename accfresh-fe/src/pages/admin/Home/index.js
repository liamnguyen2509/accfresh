import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/AdminLayout/Layout";

import AuthContext from "../../../store/authContext";

const Home = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authCtx.isLogged) { navigate("/admin/login"); };
        if (authCtx.isLogged && localStorage.getItem("isAdmin") === "0") { navigate("/"); };
    }, []);

    return (
        <Layout>

        </Layout>
    ); 
}

export default Home;