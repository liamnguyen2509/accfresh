import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from './ProductItem.module.css';

import CartContext from '../../../../../store/cartContext';

const ProductItem = (props) => {
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();

    const onAddToCartHandler = () => {
        const newCartItem = {
            id: props.id,
            name: props.name,
            image: props.image,
            price: props.price,
            quantity: 1
        }
        cartCtx.addItem(newCartItem);
    }

    const onClickBuyHandler = () => {
        const newCartItem = {
            id: props.id,
            name: props.name,
            image: props.image,
            price: props.price,
            quantity: 1
        }
        cartCtx.addItem(newCartItem);
        navigate("/checkout");
    }

    return (
        <div className={classes["product-main"]}>
            <div className={classes.product}>
                <img className={classes.image} src={props.image} alt={props.name} style={{ padding: "6px 0" }} />
                <div className={classes.info}>
                    <p className="heading-SB">{props.name}</p>
                    <p><span style={{ color: "orange" }}>${props.price}</span> | <span style={{ color: "green" }}>{props.stock}</span> in stock</p>
                </div>
                <div className={classes.actions}>
                    <span className={classes["add-to-cart"]}>
                        <i className={`ri-shopping-cart-2-line ${classes["add-to-cart-icon"]}`} onClick={onAddToCartHandler}></i>
                    </span>
                    <button className={`btn-primary-1 heading-SB ${classes["buy-now"]}`} onClick={onClickBuyHandler}> Buy Now </button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;