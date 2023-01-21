import React, { useEffect, useState } from "react";
import Moment from 'moment';

import { GetLastedOrders } from "./api";

import LastedOrderItem from "./LastedOrderItem";

const LastedOrders = (props) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState({});

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    useEffect(() => {
        GetLastedOrders()
        .then(res => setOrders(res.data.data.orders))
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }, []);

    return (
        <div className="col-detail-inr" style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "24px", padding: "48px 48px 36px 48px" }}>
            <table className="table" style={tableCartStyle}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>PRODUCT</th>
                        <th>AMOUNT</th>
                        <th>ORDER DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length > 0 &&
                        orders.map((order, index) => 
                            <LastedOrderItem
                                key={index}
                                id={order.id}
                                order={index + 1}
                                product={order.product}
                                totalAmount={parseFloat(order.amount.$numberDecimal).toFixed(2)}
                                orderDate={Moment(order.orderDate).format('D-MMM-yyyy')}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default LastedOrders;