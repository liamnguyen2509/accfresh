import React, { useContext } from "react";

import CartItem from "./CartItem";

import CartContext from "../../../../store/cartContext";

const ShoppingCart = () => {
    const cartCtx = useContext(CartContext);

    const onRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    return (
        <div className="col-detail-inr">
            <table className="table" style={tableCartStyle}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>PRODUCT</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th>TOTAL</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartCtx.items.length > 0 &&
                        cartCtx.items.map(item => (
                            <CartItem 
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                                quantity={item.quantity}
                                onRemove={onRemoveHandler.bind(null, item.id)}
                            />
                        ))
                    }
                </tbody>
            </table>
            {cartCtx.items.length <= 0 && <p className="text heading-S" style={{ color: "#fff", textAlign: "center", padding: "20px 0 0 0" }}>There are no item in your cart</p>}
        </div>
    );
}

export default ShoppingCart;