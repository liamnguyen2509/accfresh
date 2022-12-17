import React from "react";

const OrderItem = (props) => {
    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.buyer}</td>
            <td>{props.details}</td>
            <td>{props.totalAmount}$</td>
            <td>{props.orderDate}</td>
            <td>
            {/* <i className="ri-delete-bin-line" style={{ cursor: "pointer", color: "red", fontSize: "25px" }} onClick={onRemoveHandler}></i> */}
            </td>
        </tr>
    );
}

export default OrderItem;