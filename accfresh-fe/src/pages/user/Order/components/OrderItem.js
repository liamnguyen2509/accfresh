import React from "react";

const OrderItem = (props) => {
    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.description}</td>
            <td>{props.totalAmount}$</td>
            <td>{props.orderDate}</td>
        </tr>
    );
}

export default OrderItem;