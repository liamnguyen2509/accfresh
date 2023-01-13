import React, { useState } from "react";

import { GetAccountsByOrder } from "../api";

const OrderItem = (props) => {
    const [error, setError] = useState({});

    const onDownloadHandler = () => {
        GetAccountsByOrder(props.orderDetailId)
        .then(res => {
            const accounts = res.data.data.map(account => account.content)
            const file = new Blob(accounts.map(account => `${account} \n`), {type: 'text/plain'});
            const fileURL = window.URL.createObjectURL(file);
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = `${props.orderDetailId}-${props.buyer}-${props.orderDate}.txt`;
            alink.click();
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.id.slice(-6).toUpperCase()}</td>
            <td>{props.buyer}</td>
            <td>{props.product}</td>
            <td>{props.quantity}</td>
            <td>{props.totalAmount}$</td>
            <td>{props.orderDate}</td>
            <td>
                <i className="ri-download-line" style={{ cursor: "pointer", fontSize: "20px", marginRight: "10px" }} onClick={onDownloadHandler}></i>
            </td>
        </tr>
    );
}

export default OrderItem;