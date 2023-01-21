import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/AdminLayout/Layout";
import LastedOrders from "./LastedOrders";
import LastedPayments from "./LastedPayments";
import DangerousUsers from "./DangerousUsers";
import LastedUsers from "./LastedUsers";

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
            <div className="single-creator-main" style={{ margin: "50px 0" }}>
                <div className="container-fluid">
                    <div className="row row-custom-otr">
                        <div className="col-lg-6 col-detail-otr">
                            <DangerousUsers />
                        </div>
                        <div className="col-lg-6 col-detail-otr">
                            <LastedUsers />
                        </div>
                    </div>
                    <div className="row row-custom-otr" style={{ marginTop: "15px" }}>
                        <div className="col-lg-6 col-detail-otr">
                            <LastedPayments />
                        </div>
                        <div className="col-lg-6 col-detail-otr">
                            <LastedOrders />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Home;