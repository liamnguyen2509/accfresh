import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SubmitOrder } from "../api";
import CartContext from "../../../../store/cartContext";

const OrderSummary = () => {
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();

    const [error, setError] = useState({});

    const onPurchaseHandler = () => {
        SubmitOrder({
            buyerEmail: localStorage.getItem("email"),
            totalAmount: cartCtx.totalAmount.toFixed(2),
            items: cartCtx.items
        })
        .then(res => res.data.data ? navigate("/orders") : "")
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }

    return (
        <div className="col-sidebar-inr" style={{ paddingLeft: "0" }}>
            <div className="category-otr">
                <h4 className="heading heading-h4">Purchase</h4>
                <ul className="caretory-ul">
                    {
                        cartCtx.items.length > 0 &&
                        cartCtx.items.map(item => (
                            <li key={item.id} className="caretory-li">
                                <div className="caretory-a">
                                    <p className="name heading-M" style={{ color: "#fff" }}>{item.name}</p>
                                    <p className="name heading-M" style={{ color: "#fff" }}>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))
                    }
                    <li key={"total"} className="caretory-li">
                        <div className="caretory-a" style={{ border: "none" }}>
                            <p className="name heading-M" style={{ color: "#fff" }}>Total</p>
                            <p className="name heading-M" style={{ color: "#019dea", fontSize: "25px", fontWeight: "800" }}>${cartCtx.totalAmount.toFixed(2)}</p>
                        </div>
                    </li>
                </ul>
                {cartCtx.items.length > 0 && <button className="btn-primary-1 heading-SB" style={{ textAlign: "center", width: "100%" }} onClick={onPurchaseHandler}> Make Purchase </button>}
                <p className="text heading-S" style={{ color: "orange", padding: "20px 0 0 0" }}>{error && error.message}</p>
            </div>
        </div>
    );
}

export default OrderSummary;