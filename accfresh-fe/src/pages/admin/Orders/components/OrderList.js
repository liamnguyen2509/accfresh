import React, { useEffect, useState } from "react";

import OrderItem from "./OrderItem";

import { GetOrders } from "../api";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetOrders()
        .then(res => setOrders(res.data.data.orders))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, []);

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    return (
        <div className="col-detail-inr">
            <table className="table" style={tableCartStyle}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>BUYER</th>
                        <th>DETAILS</th>
                        <th>AMOUNT</th>
                        <th>PAID</th>
                        <th>STATUS</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length > 0 &&
                        orders.map((order, index) => (
                            <OrderItem 
                                key={order._id}
                                order={index + 1}
                                buyer={order.buyer}
                                details={order.details}
                                totalAmount={order.totalAmount}
                                piad={order.paid}
                                status={order.status}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;