import React from "react";

const AccountItem = (props) => {
    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.content} <i className="ri-file-copy-line" style={{ cursor: "pointer", fontSize: "25px" }} 
                                    onClick={() =>  navigator.clipboard.writeText(props.content)}></i></td>
            <td>{props.product}</td>
            <td>{props.orderDate}</td>
        </tr>
    );
}

export default AccountItem;