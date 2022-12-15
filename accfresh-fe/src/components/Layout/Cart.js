import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

import CartContext from "../../store/cartContext";

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const onClickHandler = () => {
        setIsOpen(!isOpen);
    }

    const onRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const onClearHandler = () => {
        cartCtx.clearCart();
    }

    const onCheckoutHandler = () => {
        navigate("/checkout");
    }

    const cartDropdownClasses = isOpen
        ? "notification-drop notification-drop-open" : "notification-drop";

    return (
        <div className="notification-main right-space">
            <div className="icon-notification-otr" onClick={onClickHandler}>
                <i className="ri-shopping-cart-2-line notification-icon"></i>
                {cartCtx.items.length > 0 && <span className="dot"></span>}
            </div>
            <div className={cartDropdownClasses} style={{ padding: "24px 0px 32px 15px", width: "450px" }}>
                <div className="Heading-otr">
                    <p className="heading heading-LB">Shopping Cart</p>
                </div>
                <ul className="notification-ul" style={{ margin: "0 0 24px 0" }}>
                    {
                        cartCtx.items.length <= 0 
                        ? <p className="heading-S" style={{ color: "#FFFFFF" }}>Your cart is empty.</p>
                        : cartCtx.items.map(item => (
                            <CartItem 
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                quantity={item.quantity}
                                onRemove={onRemoveHandler.bind(null, item.id)}
                            />
                        ))
                    }
                </ul>
                {
                    cartCtx.items.length > 0 && 
                    <div className="action">
                        <button className="btn-primary-2 heading-SB" onClick={onClearHandler}>Clear</button>
                        <button className="btn-primary-1 heading-SB" style={{ right: "15px", position: "absolute" }} onClick={onCheckoutHandler}>Checkout</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Cart;