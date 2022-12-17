import React, { useEffect, useState } from "react";
import Moment from 'moment';

import OrderItem from "./OrderItem";

import { GetOrders } from "../api";

const ProductList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetOrders(localStorage.getItem("uid"))
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
                        <th>DETAILS</th>
                        <th>AMOUNT</th>
                        <th>ORDER DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length > 0 &&
                        orders.map((order, index) => (
                            <OrderItem 
                                key={order._id}
                                order={index + 1}
                                details={
                                    order.orderDetails.map(details => (
                                        `${details.product.name} | ${details.quantity} \n`
                                    ))
                                }
                                totalAmount={order.totalAmount.$numberDecimal}
                                orderDate={Moment(order.createdAt).format('d-MMM-yyyy')}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;