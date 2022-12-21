import React, { useEffect, useState } from "react";
import Moment from 'moment';

import PaymentItem from "./PaymentItem";

import { GetPayments } from "../api";

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetPayments()
        .then(res => setPayments(res.data.data))
        .catch(err => {
            setError({ type: "Error", message: err });
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
                        <th>ID</th>
                        <th>AMOUNT</th>
                        <th>PAYER</th>
                        <th>PAYEE</th>
                        <th>MEMO CODE</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.length > 0 &&
                        payments.map((payment, index) => (
                            <PaymentItem 
                                key={payment._id}
                                order={index + 1}
                                id={payment.paymentId}
                                amount={payment.paymentAmount}
                                unit={payment.paymentUnit}
                                payer={payment.user.email}
                                payee={payment.payeeName}
                                memo={payment.suggestedMemo}
                                status={payment.status}
                                payDate={Moment(payment.createdAt).format('d-M-yyyy')}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PaymentList;