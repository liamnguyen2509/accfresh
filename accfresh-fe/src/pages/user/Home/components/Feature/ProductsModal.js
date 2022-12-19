import React from "react";

import ProductItem from "./ProductItem";
import classes from './ProductsModal.module.css';

const ProductsModal = (props) => {
    const onCloseModalHandler = () => {
        props.onClose();
    }

    return (
        <div className={`${classes["products-modal"]} ${classes["products-modal-open"]}`}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <h4 className="heading-h4">Walmart</h4>
                    <i className="ri-close-line heading-h4" style={{ cursor: "pointer" }} onClick={onCloseModalHandler}></i>
                </div>
                {
                    props.products.length > 0 &&
                    props.products.map(product => (
                        <ProductItem 
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            image={product.image}
                            price={product.price.$numberDecimal}
                            stock={product.stock}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ProductsModal;