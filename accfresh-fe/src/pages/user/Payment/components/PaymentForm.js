import React, { useContext, useEffect, useState } from "react";

import Layout from "../../../../components/Layout/Layout";
import classes from './Payment.module.css';

import { GetPayment } from "../api";
import { GetBalance } from "../../Profile/api";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../../store/authContext";

const PaymentForm = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const { paymentId } = useParams();
    const [error, setError] = useState({});
    const [payment, setPayment] = useState({
        paymentId: "",
        payeeAccount: "U9674906",
        payeeName: "AccFresh",
        suggestedMemo: "",
        paymentUnit: "USD",
        paymentAmount: 0,
        status: "completed"
    });

    if (!authCtx.isLogged) { navigate("/login"); };

    useEffect(() => {
        const loadPayment = () => {
            GetPayment(localStorage.getItem("uid"), paymentId)
            .then(res => { 
                setPayment({
                    ...payment,
                    paymentId: res.data.data.paymentId,
                    paymentAmount: res.data.data.paymentAmount,
                    suggestedMemo: res.data.data.suggestedMemo,
                    status: res.data.data.status,
                    isDeposit: res.data.data.isDeposit,
                    paymentType: res.data.data.paymentType,
                    activationNumber: res.data.data.activationNumber,
                    activationCode: res.data.data.activationCode
                });
    
                GetBalance(localStorage.getItem("uid"))
                .then(res => localStorage.setItem("balance", res.data.data.$numberDecimal))
                .catch(err => {
                    setError({ type: "Error", message: err.response.message });
                }); 
            })
            .catch(err => {
                setError({ type: "Error", message: err.response.message });
            });
        }
         
        loadPayment();

        const interval = setInterval(() => {
            loadPayment();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Layout>
            <div className="login-main" style={{ margin: "50px 0" }}>
                <div className="container-fluid">
                    <div className="row row-login">
                        <div className="col-lg-9 col-login-otr">
                            <div className="col-login-inr">
                                <div className="content">
                                    <h4 className="text heading-h4">Payment Information</h4>
                                    <form className="form-main" method="post" action={payment.status === "pending" ? "https://perfectmoney.com/api/step1.asp" : ""}>
                                        {
                                            payment.paymentType === 5 && 
                                            <div className="btn-main">
                                                <div className={classes["info-btn"]}>
                                                    <p className={`${classes.label} heading-S`}>Activation Number</p>
                                                    <p className={`${classes.value} heading-SB`}>{payment.activationNumber}</p>
                                                </div>
                                                <div className={classes["info-btn"]}>
                                                    <p className={`${classes.label} heading-S`}>Activation Code</p>
                                                    <p className={`${classes.value} heading-SB`}>{payment.activationCode}</p>
                                                </div>
                                            </div>
                                        }
                                        <div className="btn-main">
                                            <div className={classes["info-btn"]}>
                                                <p className={`${classes.label} heading-S`}>Amount</p>
                                                <p className={`${classes.value} heading-SB`}>{payment.paymentAmount} {payment.paymentUnit}</p>
                                            </div>
                                            <div className={classes["info-btn"]}>
                                                <p className={`${classes.label} heading-S`}>Status</p>
                                                {(payment.status === "pending" || payment.status === "sending") && <p className={`${classes.pending} heading-SB`}>{payment.status}</p>}
                                                {payment.status === "done" && <p className={`${classes.completed} heading-SB`}>{payment.status}</p>}
                                                {payment.status === "delete" && <p className={`${classes.delete} heading-SB`}>{payment.status}</p>}
                                            </div>
                                        </div>
                                        <div className="btn-main">
                                            <div className={classes["info-btn"]}>
                                                <p className={`${classes.label} heading-S`}>Payment to</p>
                                                <p className={`${classes.value} heading-SB`}>{payment.payeeAccount} ({payment.payeeName})</p>
                                            </div>
                                            <div className={classes["info-btn"]}>
                                                <p className={`${classes.label} heading-S`}>Account type</p>
                                                <p className={`${classes.completed} heading-SB`}>Verified</p>
                                            </div>
                                        </div>
                                        <input type="hidden" name="STATUS_URL" value={`${process.env.REACT_APP_BASE_URL}/payments/${payment.paymentId}`} />
                                        <input type="hidden" name="PAYMENT_URL" value={`${process.env.REACT_APP_BASE_URL}/payments/${payment.paymentId}`} />
                                        <input type="hidden" name="PAYMENT_URL_METHOD" value="GET" />
                                        <input type="hidden" name="NOPAYMENT_URL" value={process.env.REACT_APP_BASE_URL} />
                                        <input type="hidden" name="NOPAYMENT_URL_METHOD" value="GET" />
                                        <input type="hidden" name="PAYMENT_ID" value={payment.paymentId} />
                                        <input type="hidden" name="PAYEE_ACCOUNT" value={payment.payeeAccount} />
                                        <input type="hidden" name="PAYEE_NAME" value={payment.payeeName} />
                                        <input type="hidden" name="SUGGESTED_MEMO" value={payment.suggestedMemo} />
                                        <input type="hidden" name="PAYMENT_UNITS" value={payment.paymentUnit} />
                                        <input type="hidden" name="PAYMENT_AMOUNT" value={payment.paymentAmount} />
                                        <div className="action">
                                            {payment.status === "pending" && payment.paymentType !== 5 && <input className="button heading-SB" style={{ backgroundColor: "green" }} type="submit" value="Continue Payment" />}
                                            {payment.status === "sending" && <input className="button heading-SB" style={{ backgroundColor: "unset", width: "100%", border: "none", color: "green" }} type="button" value="Waiting for payment sending..." disabled/>}
                                            {payment.status === "done" && payment.isDeposit && <input className="btn-primary-2 heading-SB" style={{ backgroundColor: "unset", width: "100%", border: "none" }} type="button" value="Payment Deposited to wallet" disabled/>}
                                            {payment.status === "delete" && <input className="button heading-SB" style={{ backgroundColor: "unset", width: "100%", border: "none", color: "red" }} type="button" value="Payment Cancelled" disabled/>}
                                        </div>
                                    </form>
                                    <p className="text heading-S" style={{ color: "orange", padding: "20px 0 0 0" }}>{error && error.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PaymentForm;