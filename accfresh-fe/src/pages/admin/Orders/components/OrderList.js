import React, { useEffect, useState } from "react";
import Moment from 'moment';

import OrderItem from "./OrderItem";

import { GetOrders } from "../api";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetOrders()
        .then(res => setOrders(res.data.data))
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
                        <th>ORDER DATE</th>
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
                                buyer={order.buyer.email}
                                details={
                                    order.orderDetails.map(details => (
                                        `${details.product.name} | ${details.quantity} \n`
                                    ))
                                }
                                totalAmount={order.totalAmount.$numberDecimal}
                                orderDate={Moment(order.createdAt).format('d-M-yyyy')}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;