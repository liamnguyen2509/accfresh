import React, { useEffect, useState } from "react";

import { GetPayment } from "../api";
import { GetBalance } from "../../Profile/api";

const PaymentItem = (props) => {
    const [status, setStatus] = useState(props.status);
    const [isDisableRecheck, setIsDisableRecheck] = useState(false);
    const [error, setError] = useState({});

    const onClickRecheckHandler = () => {
        setIsDisableRecheck(true);

        GetPayment(localStorage.getItem("uid"), props.id)
        .then(res => {
            setStatus(res.data.data.status);

            GetBalance(localStorage.getItem("uid"))
            .then(res => localStorage.setItem("balance", res.data.data.$numberDecimal))
            .catch(err => {
                setError({ type: "Error", message: err.response.message });
            }); 

            //window.location.reload();
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }

    useEffect(() => {

    }, [props.status]);

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.id}</td>
            <td>{props.type === 5 ? "Perfect Money Evoucher" : "Perfect Money"}</td>
            <td>{props.amount} {props.unit}</td>
            <td>{!status ? "" : status === "pending"
                    ? <span style={{ color: "orange", fontWeight: "bold" }}>{status.toUpperCase()}</span> 
                    : status === "delete" 
                    ? <span style={{ color: "red", fontWeight: "bold" }}>{status.toUpperCase()}</span>
                    : <span style={{ color: "green", fontWeight: "bold" }}>{status.toUpperCase()}</span>
                }</td>
            <td>{props.payDate}</td>
            <td>
                {props.status !== 'done' && props.status !== 'delete' &&
                <button className={`btn-primary-1 heading-SB`} style={{ marginRight: "5px", padding: "5px 10px 5px 10px" }} onClick={onClickRecheckHandler} disabled={isDisableRecheck}> Re-Check Status </button>}
            </td>
        </tr>
    );
}

export default PaymentItem;