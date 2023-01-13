import React, { useEffect, useRef, useState } from "react";
import Moment from 'moment';

import OrderItem from "./OrderItem";

import { GetOrders } from "../api";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const currentPage = useRef(1);
    const [paging, setPaging] = useState({
        page: 1,
        pageSize: 20,
        totalRecords: 0,
        totalPages: 1,
        isPrev: false,
        isNext: false
    });
    const [error, setError] = useState({});

    const onSearchHandler = (e) => {
        setSearchTerm(e.target.value);
        currentPage.current = 1;
        setPaging({ ...paging, page: currentPage.current });
    }

    const onPageChangeHandler = (e) => {
        if (e.target.value === "0" || isNaN(e.target.value) || e.target.value > paging.totalPages) {
            setPaging({ ...paging, page: currentPage.current });
        } else {
            if (e.target.value !== "") {
                currentPage.current = e.target.value;
                const canPrev = currentPage.current === 1 ? false : true;
                const canNext = currentPage.current >= paging.totalPages ? false : true;
                setPaging({ ...paging, page: currentPage.current, isPrev: canPrev, isNext: canNext });
            }
        }
    } 

    const onPrevHandler = () => {
        if (currentPage.current <= 1) currentPage.current = 1; 
        
        currentPage.current--;
        const canPrev = currentPage.current === 1 ? false : true;
        setPaging({ ...paging, page: currentPage.current, isPrev: canPrev, isNext: true });
    }

    const onNextHandler = () => {
        currentPage.current++;
        console.log(paging.totalPages);
        const canNext = currentPage.current === paging.totalPages ? false : true;
        setPaging({ ...paging, page: currentPage.current, isPrev: true, isNext: canNext });
    }

    useEffect(() => {
        GetOrders(searchTerm, paging.page, paging.pageSize)
        .then(async res => {
            setOrders(res.data.data.orders);

            if (res.data.data.totalPages > 1) { 
                const canNext = res.data.data.totalRecords <= paging.pageSize 
                            || res.data.data.endRecord < paging.pageSize
                            || res.data.data.totalRecords === res.data.data.endRecord ? false : true;
                setPaging({ ...paging, 
                    startRecord: res.data.data.startRecord,
                    endRecord: res.data.data.endRecord,
                    totalPages: res.data.data.totalPages, 
                    totalRecords: res.data.data.totalRecords, 
                    isNext: canNext }); 
            };
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
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
                    <p className="heading-SB" style={{ marginRight: "15px", padding: "14px 0px 14px 24px", color: "#FFF" }}>Records: {paging.startRecord} - {paging.endRecord} / {paging.totalRecords} | Page:</p>
                    <input type="text" className="input heading-SB" style={{ width: "10%", padding: "14px", textAlign: "center", marginRight: "10px" }} 
                        value={paging.page} onChange={onPageChangeHandler} />
                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content", marginRight: "10px" }} 
                        onClick={onPrevHandler}
                        disabled={!paging.isPrev}>Prev</button>
                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content" }} 
                        onClick={onNextHandler}
                        disabled={!paging.isNext}>Next</button>
                </div>
            </div>
            <div className="col-detail-inr" style={{ marginTop: "15px" }}>
                <table className="table" style={tableCartStyle}>
                    <thead>
                        <tr>
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
                            orders.map((order, index) => {
                                return (
                                    <OrderItem 
                                        key={index}
                                        id={order.id}
                                        buyer={order.buyer}
                                        orderDetailId={order.orderDetailId}
                                        product={order.product}
                                        quantity={order.quantity}
                                        totalAmount={parseFloat(order.amount.$numberDecimal).toFixed(2)}
                                        orderDate={Moment(order.orderDate).format('D-MMM-yyyy h:mm A')}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default OrderList;