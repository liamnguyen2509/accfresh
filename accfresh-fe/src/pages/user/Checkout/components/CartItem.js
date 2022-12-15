import React, { useContext } from "react";

import CartContext from "../../../../store/cartContext";

const CartItem = (props) => {
    const cartCtx = useContext(CartContext);

    const onAddItemHandler = () => {
        const newCartItem = {
            id: props.id,
            name: props.name,
            image: props.image,
            price: props.price,
            quantity: 1
        }
        cartCtx.addItem(newCartItem);
    }

    const onSubtractItemHandler = (id) => {
        cartCtx.subtractItem(id);
    }

    const onChangeQuantityHandler = (e) => {
        const newQuantity = isNaN(e.target.value) ? props.quantity : e.target.value;
        const cartItem = {
            id: props.id,
            name: props.name,
            image: props.image,
            price: props.price,
            quantity: parseInt(newQuantity)
        }
        cartCtx.updateItem(cartItem);
    }

    const onRemoveHandler = () => {
        cartCtx.removeItem(props.id);
    }

    return (
        <tr style={{ verticalAlign: "middle" }}>
            <td>
                <div style={{ height: "50px", width: "50px" }}>
                    <img className="img img-fluid" src={props.image} alt="accfresh" />
                </div>
            </td>
            <td>{props.name}</td>
            <td>
                <div className="input-otr" style={{ width: "50%" }}>
                    <i className="ri-subtract-line" style={{ cursor: "pointer", fontSize: "25px", verticalAlign: "middle" }} onClick={onSubtractItemHandler.bind(null, props.id)}></i>
                    <input style={{ width: "50%", lineHeight: "inherit", padding: "14px 24px 14px 24px", textAlign: "center" }} className="input heading-SB" type="text" 
                        value={props.quantity} 
                        onChange={onChangeQuantityHandler}
                        required 
                    />
                    <i className="ri-add-line" style={{ cursor: "pointer", fontSize: "25px", verticalAlign: "middle" }} onClick={onAddItemHandler}></i>
                </div>
            </td>
            <td>${props.price}</td>
            <td style={{ fontWeight: 700 }}>${(props.quantity * props.price).toFixed(2)}</td>
            <td><i className="ri-delete-bin-line" style={{ cursor: "pointer", color: "red", fontSize: "25px" }} onClick={onRemoveHandler}></i></td>
        </tr>
    );
}

export default CartItem;