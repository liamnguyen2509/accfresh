import React, { useEffect, useRef, useState } from "react";
import Moment from 'moment';

import OrderItem from "./OrderItem";

import { GetOrders } from "../api";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPage] = useState(1);
    const currentPage = useRef(1);
    const [paging, setPaging] = useState({
        page: 1,
        pageSize: 20,
        isPrev: false,
        isNext: false
    });
    const [error, setError] = useState({});

    const onSearchHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    const onPageChangeHandler = (e) => {
        if (e.target.value === "0" || isNaN(e.target.value) || e.target.value > totalPages) {
            setPaging({ ...paging, page: currentPage.current });
        } else {
            if (e.target.value !== "") {
                currentPage.current = e.target.value;
                setPaging({ ...paging, page: e.target.value });
            }
        }

        if (currentPage.current > 1) {
            setPaging({ ...paging, isPrev: true, isNext: true });
        } else {
            setPaging({ ...paging, isPrev: true, isNext: true });
        }
    } 

    const onPrevHandler = () => {
        currentPage.current--;
        setPaging({ ...paging, page: currentPage.current });

        if (currentPage.current === 1) {
            setPaging({ ...paging, isPrev: false, isNext: totalPages > 1 ? true : false });
        }
    }

    const onNextHandler = () => {
        currentPage.current++;
        setPaging({ ...paging, page: currentPage.current });

        if (currentPage.current === totalPages) {
            setPaging({ ...paging, isPrev: true, isNext: false });
        }
    }

    useEffect(() => {
        GetOrders(searchTerm, paging.page, paging.pageSize)
        .then(async res => {
            const orders = [];
            for await (const order of res.data.data.orders) {
                for await (const orderDetail of order.orderDetails) {
                    orders.push({
                        id: order._id,
                        buyer: order.buyer.email,
                        orderDetailId: orderDetail._id,
                        product: orderDetail.product.name,
                        quantity: orderDetail.quantity,
                        amount: orderDetail.amount.$numberDecimal,
                        orderDate: Moment(order.createdAt).format('D-MMM-yyyy h:mm A')
                    });
                }
            }
            setOrders(orders);

            if (res.data.data.totalPages > 1) { 
                setTotalPage(res.data.data.totalPages);
                setPaging({ ...paging, isNext: true }); 
            };
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, [paging.page, searchTerm]);

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    return (
        <>
            <div className="row actions">
                <div className="search" style={{ width: "50%" }}>
                    <div className="search-main right-space" style={{ display: "inline", marginRight: "10px" }}>
                        <input type="text" className="input heading-SB col-lg-6" placeholder="Search" onChange={onSearchHandler} />
                    </div>
                </div>
                <div className="paging" style={{ width: "50%", display: "flex", justifyContent: "right" }}>
                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content", marginRight: "10px" }} 
                        onClick={onPrevHandler}
                        disabled={!paging.isPrev}>Prev</button>
                    <input type="text" className="input heading-SB" style={{ width: "10%", padding: "14px", textAlign: "center" }} 
                        value={paging.page} onChange={onPageChangeHandler} />
                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content", marginLeft: "10px" }} 
                        onClick={onNextHandler}
                        disabled={!paging.isNext}>Next</button>
                </div>
            </div>
            <div className="col-detail-inr" style={{ marginTop: "15px" }}>
                <table className="table" style={tableCartStyle}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>BUYER</th>
                            <th>PRODUCT</th>
                            <th>QUANTITY</th>
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
                                    key={index}
                                    id={order.id}
                                    order={index + 1}
                                    buyer={order.buyer}
                                    orderDetailId={order.orderDetailId}
                                    product={order.product}
                                    quantity={order.quantity}
                                    totalAmount={parseFloat(order.amount).toFixed(2)}
                                    orderDate={order.orderDate}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default OrderList;