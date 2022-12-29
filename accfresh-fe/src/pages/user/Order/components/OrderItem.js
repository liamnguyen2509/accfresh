import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GetAccountsByOrder } from "../api";

const OrderItem = (props) => {
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onDownloadHandler = () => {
        GetAccountsByOrder(props.orderDetailId)
        .then(res => {
            const accounts = res.data.data.map(account => account.content)
            const file = new Blob(accounts.map(account => `${account} \n`), {type: 'text/plain'});
            const fileURL = window.URL.createObjectURL(file);
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = `${props.product}-${props.orderDate}.txt`;
            alink.click();
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }

    const onSeeMoreHandler = () => {
        navigate(`/orders/${props.orderDetailId}`);
    }

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.id.substring(0, 6).toUpperCase()}</td>
            <td>{props.product}</td>
            <td>{props.quantity}</td>
            <td>{props.totalAmount}$</td>
            <td>{props.orderDate}</td>
            <td>
                <button className={`btn-primary-1 heading-SB`} style={{ marginRight: "5px" }} onClick={onSeeMoreHandler}> See More </button>
                <button className={`btn-primary-1 heading-SB`} onClick={onDownloadHandler}> Download </button>
            </td>
        </tr>
    );
}

export default OrderItem;