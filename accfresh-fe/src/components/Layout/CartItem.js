import React, { useContext } from "react";
import { Link } from "react-router-dom";

import CartContext from "../../store/cartContext";

const CartItem = (props) => {
    const cartCtx = useContext(CartContext);

    const onClickHandler = () => {
        cartCtx.removeItem(props.id);
    }

    return (
        <li className="notification-li">
            <div className="notification-a">
                <div className="img-otr" style={{ height: "50px", width: "50px" }}>
                    <img className="img img-fluid" src={props.image} alt="accfresh" />
                </div>
                <Link to={`/product/${props.id}`} className="content-otr">
                    <div className="content-otr">
                        <p className="name heading-SB">{props.name}</p>
                        <p className="price heading-S">quanity: {props.quantity}</p>
                    </div>
                </Link>
                <div style={{ padding: "10px", right: "10px", position: "absolute", cursor: "pointer" }} onClick={onClickHandler}>
                    <i className="ri-delete-bin-line copy-icon" style={{ color: "red", fontSize: "25px" }}></i>
                </div>
            </div>
        </li>
    );
}

export default CartItem;