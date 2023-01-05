import React, { useEffect, useState } from "react";
import Moment from 'moment';

import OrderItem from "./OrderItem";

import { GetOrders } from "../api";

const ProductList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetOrders(localStorage.getItem("uid"))
        .then(async res => setOrders(res.data.data))
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
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
                        <th>ORDER ID</th>
                        <th>PRODUCT</th>
                        <th>QUANTITY</th>
                        <th>AMOUNT</th>
                        <th>ORDER DATE</th>
                        <th style={{ width: "20%" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length > 0 &&
                        orders.map((order, index) => (
                            <OrderItem 
                                key={index}
                                id={order.id}
                                order={index + 1}
                                orderDetailId={order.orderDetailId}
                                product={order.product}
                                quantity={order.quantity}
                                totalAmount={parseFloat(order.amount.$numberDecimal).toFixed(2)}
                                orderDate={Moment(order.orderDate).format('D-MMM-yyyy h:mm A')}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;