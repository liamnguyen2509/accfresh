import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserItem = (props) => {
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onEditHandler = () => {
        navigate(`/admin/users/${props.id}`)
    }

    const onRemoveHandler = () => {
        props.onConfirm(props.id);
    }

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>${props.balance}</td>
            <td>{props.createdDate}</td>
            <td>
                <i className="ri-user-settings-line" style={{ cursor: "pointer", fontSize: "25px", marginRight: "10px" }} onClick={onEditHandler}></i>
                <i className="ri-delete-bin-line" style={{ cursor: "pointer", color: "red", fontSize: "25px" }} onClick={onRemoveHandler}></i>
            </td>
        </tr>
    );
}

export default UserItem;