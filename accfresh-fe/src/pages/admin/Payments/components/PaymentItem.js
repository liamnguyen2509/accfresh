import React from "react";

const PaymentItem = (props) => {
    const onRemoveHandler = () => {
        props.onConfirm(props.id);
    }
    
    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.id}</td>
            <td>{props.type === 5 ? "Perfect Money e-Voucher" : "Perfect Money"}</td>
            <td>{props.amount} {props.unit}</td>
            <td>{props.payer}</td>
            <td>{props.memo}</td>
            <td>{!props.status ? "" : props.status === "pending"
                    ? <span style={{ color: "orange", fontWeight: "bold" }}>{props.status.toUpperCase()}</span> 
                    : props.status === "delete" 
                    ? <span style={{ color: "red", fontWeight: "bold" }}>{props.status.toUpperCase()}</span>
                    : <span style={{ color: "green", fontWeight: "bold" }}>{props.status.toUpperCase()}</span>
                }</td>
            <td>{props.payDate}</td>
            <td><i className="ri-delete-bin-line" style={{ cursor: "pointer", color: "red", fontSize: "25px" }} onClick={onRemoveHandler}></i></td>
        </tr>
    );
}

export default PaymentItem;