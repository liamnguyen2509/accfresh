import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from './Deposit.module.css';

import { GetRate, GetReceiver, SendDeposit, TransferEvoucher } from '../api';
import AuthContext from "../../../../store/authContext";

const DepositForm = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");
    const [activationNumber, setActivationNumber] = useState("");
    const [activationCode, setActivationCode] = useState("");
    const [receiver, setReceiver] = useState();
    const [rate, setRate] = useState();
    const [payment, setPayment] = useState({
        paymentId: "",
        payeeAccount: "U9674906",
        payeeName: "AccFresh",
        suggestedMemo: "",
        paymentUnit: "USD",
        paymentAmount: 0
    });
    const [error, setError] = useState({});

    const getValidAmount = (amount) => {
        if (isNaN(amount)) {
            return 0;
        } else {
            while(amount.charAt(0) === '0')
            {
                amount = amount.substring(1);
            }
            return amount;
        }
    }

    const onAmountChangeHandler = (e) => {
        e.preventDefault();

        const validAmount = getValidAmount(e.target.value);
        setAmount(validAmount);

        GetRate(props.option, "USD", receiver.bank, "VND", e.target.value)
        .then(res => setRate(res.data.data))
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        }); 
    };

    const onActivationNumberChangeHandler = (e) => {
        setActivationNumber(e.target.value);
    }

    const onActivationCodeChangeHandler = (e) => {
        setActivationCode(e.target.value);
    }

    const onDepositHandler = (e) => {
        e.preventDefault();

        if (payment.paymentId) {
            if (payment.paymentType === 4) { // PM
                e.target.submit();
            } else { // PM Voucher
                TransferEvoucher({
                    paymentType: "pmvoucher",
                    paymentId: payment.paymentId,
                    activationNumber: activationNumber,
                    activationCode: activationCode
                })
                .then(res => navigate(`/payments/${payment.paymentId}`))
                .catch(err => {
                    setError({ type: "Error", message: err.response.message });
                }); 
            }
        } else {
            SendDeposit({
                amount: amount,
                rate: rate.rate,
                send: props.option === "PerfectMoney" ? 4 : 5,
                receive: 1,
                fromCurrency: 50,
                toCurrency: 51,
                receiverBank: receiver.bankAccount,
                phone: receiver.phone,
                receiveAmount: rate.amount,
                senderId: localStorage.getItem("uid")
            })
            .then(res => { 
                setPayment({
                    ...payment,
                    paymentId: res.data.data.paymentId,
                    paymentAmount: res.data.data.paymentAmount,
                    suggestedMemo: res.data.data.suggestedMemo,
                    paymentType: res.data.data.paymentType
                }); 
            })
            .catch(err => {
                setError({ type: "Error", message: err.response.message });
            }); 
        }
    };

    const onCloseModalHandler = () => {
        props.onCloseModal();
    }

    useEffect(() => {
        GetReceiver()
        .then(res => setReceiver(res.data.data.receiver))
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        }); 
    }, []);

    return (
        <div className={`${classes["deposit-modal"]} ${authCtx.isLogged ? classes["deposit-modal-open"] : ""}`}>
            <div className={classes.header}>
                <i className="ri-close-line heading-h4" style={{ cursor: "pointer" }} onClick={onCloseModalHandler}></i>
            </div>
            <div className={classes.content}>
                <h4 className={`${classes.text} heading-h4`}>Deposit to wallet</h4>
                <p className="desc heading-M" style={{ color: "#B7B7B7" }}>Currency transfer is USD. Rate 1:1</p>
                <div className={classes["btn-main"]}>
                    <div className={classes.btn}>
                        <img className={classes.icon} src="/assets/img/perfect-money-icon.png" alt="perfectmoney" style={{ padding: "6px 0" }} />
                        <p className={`${classes.text} heading-SB`}>{props.option === "PerfectMoney" ? "Perfect Money" : "Perfect Money Voucher"}</p>
                    </div>
                    <div className={classes.btn}>
                        <i className={`ri-wallet-fill ${classes.icon}`}></i>
                        <p className={`${classes.text} heading-SB`}>Account Balance</p>
                    </div>
                </div>
                <form className={classes["form-main"]} method="post" onSubmit={onDepositHandler} 
                    action={
                        payment.paymentId 
                        ? payment.paymentType === 4 ? "https://perfectmoney.com/api/step1.asp" : "" 
                        : ""}>
                    <div className={classes["input-main"]}>
                        <div className={classes["input-otr"]}>
                            <input className={`${classes.input} heading-SB`} type="text" placeholder="Amount" 
                                value={amount}
                                onChange={onAmountChangeHandler}
                                disabled={payment.paymentId ? true : false}
                                required 
                            />
                        </div>
                        <div className={classes["input-otr"]}>
                            <input className={`${classes.input} heading-SB`} type="text" value={amount} disabled />
                        </div>
                    </div>
                    { payment.paymentType === 5 &&  
                        <div className={classes["input-main"]}>
                            <div className={classes["input-otr"]}>
                                <input className={`${classes.input} heading-SB`} type="text" name="pm_number" placeholder="Activation Number" 
                                    value={activationNumber}
                                    onChange={onActivationNumberChangeHandler}
                                    required />
                            </div>
                            <div className={classes["input-otr"]}>
                                <input className={`${classes.input} heading-SB`} type="text" name="pm_code" placeholder="Activation Code" 
                                    value={activationCode}
                                    onChange={onActivationCodeChangeHandler}
                                    required />
                            </div>
                        </div>
                    }

                    { payment.paymentType === 4 &&
                        <>
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
                        </>
                    }
                    
                    <div className={classes["action-otr"]}>
                        {payment.paymentId && payment.paymentType === 5 && <input className={`${classes.button} btn-primary-1 heading-SB`} style={{ backgroundColor: "green" }} type="submit" value="Confirm E-Voucher" />}
                        {!payment.paymentId && <input className={`${classes.button} btn-primary-1 heading-SB`} type="submit" value="Request Pay" />}
                        {payment.paymentId && payment.paymentType === 4 && <input className={`${classes.button} btn-primary-1 heading-SB`} style={{ backgroundColor: "green" }} type="submit" value="Confirm Payment" />}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DepositForm;