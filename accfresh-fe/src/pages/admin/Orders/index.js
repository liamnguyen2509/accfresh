import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/AdminLayout/Layout";

import OrderList from "./components/OrderList";

import AuthContext from "../../../store/authContext";

const Orders = (props) => {
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
                            <OrderList />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Orders;