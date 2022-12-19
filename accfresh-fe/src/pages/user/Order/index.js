import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../../components/Layout/Layout";
import OrderList from "./components/OrderList";

import AuthContext from "../../../store/authContext";

const Orders = (props) => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const { orderId } = useParams();

    console.log(orderId);

    useEffect(() => {
        if (!context.isLogged) { navigate("/login"); };
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