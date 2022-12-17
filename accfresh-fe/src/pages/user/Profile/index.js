import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/Layout/Layout";

import AuthContext from "../../../store/authContext";

const Profile = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!context.isLogged) { navigate("/login"); };
    }, []);
    
    return (
        <Layout>
            
        </Layout>
    ); 
}

export default Profile;