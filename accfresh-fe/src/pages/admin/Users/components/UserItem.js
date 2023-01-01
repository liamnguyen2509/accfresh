import React, { useState } from "react";

const UserItem = (props) => {
    const [error, setError] = useState({});

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>${props.balance}</td>
            <td>{props.createdDate}</td>
            <td>
            </td>
        </tr>
    );
}

export default UserItem;