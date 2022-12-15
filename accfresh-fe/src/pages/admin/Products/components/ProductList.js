import React, { useEffect, useState } from "react";

import ProductItem from "./ProductItem";

import { GetProducts } from "../api";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetProducts()
        .then(res => setProducts(res.data.data.products))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, []);

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
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>STOCK</th>
                        <th>SOLD</th>
                        <th>PRICE</th>
                        <th>IMAGE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 &&
                        products.map((product, index) => (
                            <ProductItem 
                                key={product._id}
                                order={index + 1}
                                name={product.name}
                                description={product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description}
                                stock={product.stock}
                                sold={product.sold}
                                price={product.price.$numberDecimal}
                                image={product.image}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;