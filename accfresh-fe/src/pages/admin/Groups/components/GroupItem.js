import React from "react";

const GroupItem = (props) => {

    const onRemoveHandler = () => {
        props.onConfirm(props.id);
    }

    const onEditHandler = () => {
        props.onEdit(props.id);
    }

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.name}</td>
            <td>
                <div style={{ height: "50px", width: "50px" }}>
                    <img className="img img-fluid" src={props.image} alt={props.name} />
                </div>
            </td>
            <td>
                <i className="ri-edit-box-line" style={{ cursor: "pointer", fontSize: "25px", marginRight: "10px" }} onClick={onEditHandler}></i>
                <i className="ri-delete-bin-line" style={{ cursor: "pointer", color: "red", fontSize: "25px" }} onClick={onRemoveHandler}></i>
            </td>
        </tr>
    );
}

export default GroupItem;