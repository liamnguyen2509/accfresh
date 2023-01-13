import React from "react";

const AccountItem = (props) => {

    const onRemoveHandler = () => {
        props.onConfirm(props.id);
    }

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.product}</td>
            <td>{props.content}</td>
            <td>{props.isSold ? <span style={{ color: "green", fontWeight: "bold" }}>SOLD</span> : ""}</td>
            <td>{props.buyer}</td>
            <td>{props.isActive && !props.isSold
                    ? <span style={{ color: "green", fontWeight: "bold" }}>ACTIVE</span> 
                    : <span style={{ color: "red", fontWeight: "bold" }}>IN ACTIVE</span>
                }</td>
            <td><i className="ri-delete-bin-line" style={{ cursor: "pointer", color: "red", fontSize: "25px" }} onClick={onRemoveHandler}></i></td>
        </tr>
    );
}

export default AccountItem;