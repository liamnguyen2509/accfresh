import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserItem = (props) => {
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onEditHandler = () => {
        navigate(`/admin/users/${props.id}`)
    }

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>${props.balance}</td>
            <td>{props.createdDate}</td>
            <td>
                <i className="ri-user-settings-line" style={{ cursor: "pointer", fontSize: "25px", marginRight: "10px" }} onClick={onEditHandler}></i>
            </td>
        </tr>
    );
}

export default UserItem;