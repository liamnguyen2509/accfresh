import React from "react";

const ProductItem = (props) => {

    const onRemoveHandler = () => {
        props.onRemove();
    }

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>{props.order}</td>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.stock}</td>
            <td>{props.sold}</td>
            <td>${props.price}</td>
            <td>
                <div style={{ height: "50px", width: "50px" }}>
                    <img className="img img-fluid" src={props.image} alt="accfresh" />
                </div>
            </td>
            <td><i className="ri-delete-bin-line" style={{ cursor: "pointer", color: "red", fontSize: "25px" }} onClick={onRemoveHandler}></i></td>
        </tr>
    );
}

export default ProductItem;