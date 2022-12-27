import React from "react";

const PaymentItem = (props) => {
    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.id}</td>
            <td>{props.type === 5 ? "Perfect Money e-Voucher" : "Perfect Money"}</td>
            <td>{props.amount} {props.unit}</td>
            <td>{props.payer}</td>
            <td>{props.payee}</td>
            <td>{props.memo}</td>
            <td>{!props.status ? "" : props.status === "pending"
                    ? <span style={{ color: "orange", fontWeight: "bold" }}>{props.status.toUpperCase()}</span> 
                    : props.status === "delete" 
                    ? <span style={{ color: "red", fontWeight: "bold" }}>{props.status.toUpperCase()}</span>
                    : <span style={{ color: "green", fontWeight: "bold" }}>{props.status.toUpperCase()}</span>
                }</td>
            <td>{props.payDate}</td>
        </tr>
    );
}

export default PaymentItem;