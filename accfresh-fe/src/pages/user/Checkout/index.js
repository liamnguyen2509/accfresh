import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/Layout/Layout";
import ShoppingCart from "./components/ShoppingCart";
import OrderSummary from "./components/OrderSummary";

import AuthContext from "../../../store/authContext";

const Checkout = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authCtx.isLogged) { navigate("/login"); };
    }, []);

    return (
        <Layout>
            <div className="blog-detail-main" style={{ margin: "50px 0" }}>
                <div className="container-fluid">
                    <div className="row row-custom">
                        <div className="col-lg-9 col-detail-otr">
                            <ShoppingCart />
                        </div>
                        <div className="col-lg-3 col-sidebar-otr">
                            <OrderSummary />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Checkout;