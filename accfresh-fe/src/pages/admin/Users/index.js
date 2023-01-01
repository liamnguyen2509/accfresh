import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/AdminLayout/Layout";

import UserList from "./components/UserList";

import AuthContext from "../../../store/authContext";

const Users = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!context.isLogged) { navigate("/admin/login"); };
        if (context.isLogged && localStorage.getItem("isAdmin") === "0") { navigate("/"); };
    }, []);
    
    return (
        <Layout>
            <div className="blog-detail-main" style={{ margin: "50px 0" }}>
                <div className="container-fluid">
                    <div className="row row-custom">
                        <div className="col-lg-12 col-detail-otr">
                            <UserList />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Users;