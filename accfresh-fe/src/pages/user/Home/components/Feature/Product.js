import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import CartContext from '../../../../../store/cartContext';
import AuthContext from "../../../../../store/authContext";

const Product = (props) => {
    const cartCtx = useContext(CartContext);
    const authCtx = useContext(AuthContext);
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
        <div className="col-lg-2 col-otr">
            <div className="col-inr box-4">
                <div className="cover-img-otr">
                    <Link to={`/product/${props.id}`}>
                        <img className="cover-img" src={props.image} alt={props.name} />
                    </Link>
                    {
                        authCtx.isLogged  &&
                        <span className="heart-icon-otr2 add-to-cart" style={{ backgroundColor: "#192843" }} onClick={onAddToCartHandler}>
                            <i className="ri-shopping-cart-2-line heart-icon2"></i>
                        </span>
                    }
                </div>
                <Link to={`/product/${props.id}`} className="art-name heading-MB-Mon">{props.name}</Link>
                {
                    authCtx.isLogged &&
                    <div className="action">
                        <button className="btn-primary-2 heading-SB" style={{ textAlign: "center", width: "100%" }} onClick={onClickBuyHandler}>
                            <span style={{ marginRight: "10px" }}>Buy Now:</span> ${props.price} 
                        </button>
                    </div>
                }

                {
                    !authCtx.isLogged &&
                    <div className="bid-main">
                        <p className="bid heading-S">Buy at: </p>
                        <p className="Price heading-SB">${props.price}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Product;