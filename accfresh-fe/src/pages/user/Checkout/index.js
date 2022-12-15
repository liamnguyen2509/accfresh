import React from "react";

import Layout from "../../../components/Layout/Layout";
import ShoppingCart from "./components/ShoppingCart";
import OrderSummary from "./components/OrderSummary";

const Checkout = (props) => {
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