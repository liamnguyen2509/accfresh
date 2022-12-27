import React from "react";

const PaymentItem = (props) => {

    const buttonStyle = {
        padding: "2px 5px 2px 5px",
        borderRadius: "5px",
        marginLeft: "10px"
    }

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.id}</td>
            <td>{props.type === 5 ? "Perfect Money Evoucher" : "Perfect Money"}</td>
            <td>{props.amount} {props.unit}</td>
            <td>{!props.status ? "" : props.status === "pending"
                    ? <span style={{ color: "orange", fontWeight: "bold" }}>{props.status.toUpperCase()}</span> 
                    : props.status === "delete" 
                    ? <span style={{ color: "red", fontWeight: "bold" }}>{props.status.toUpperCase()}</span>
                    : <span style={{ color: "green", fontWeight: "bold" }}>{props.status.toUpperCase()}</span>
                }</td>
            <td>{props.payDate}</td>
            {/* <td>
                {props.status === "pending" && <button className="btn-primary-1" style={buttonStyle}> Make Payment </button>}
            </td> */}
        </tr>
    );
}

export default PaymentItem;