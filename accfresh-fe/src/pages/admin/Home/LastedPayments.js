import React, { useEffect, useState } from "react";
import Moment from 'moment';

import { GetLastedPayments } from "./api";

const LastedPayments = (props) => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState({});

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    useEffect(() => {
        GetLastedPayments()
        .then(res => setPayments(res.data.data.payments))
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
                        <th>TYPE</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.length > 0 &&
                        payments.map((payment, index) => 
                            <tr key={payment._id}>
                                <td>{index + 1}</td>   
                                <td>{payment.paymentId}</td>   
                                <td>{payment.paymentType === 5 ? "PM Voucher" : "Perfect Money"}</td>   
                                <td>{payment.paymentAmount}$</td>   
                                <td>{!payment.status ? "" : payment.status === "pending"
                                        ? <span style={{ color: "orange", fontWeight: "bold" }}>{payment.status.toUpperCase()}</span> 
                                        : payment.status === "delete" 
                                        ? <span style={{ color: "red", fontWeight: "bold" }}>{payment.status.toUpperCase()}</span>
                                        : <span style={{ color: "green", fontWeight: "bold" }}>{payment.status.toUpperCase()}</span>
                                    }</td>   
                                <td>{Moment(payment.createdAt).format('D-MMM-yyyy')}</td>   
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default LastedPayments;