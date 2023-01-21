import React from "react";

const LastedOrderItem = (props) => {
    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.id}</td>
            <td>{props.product}</td>
            <td>{props.totalAmount}$</td>
            <td>{props.orderDate}</td>
        </tr>
    );
}

export default LastedOrderItem;