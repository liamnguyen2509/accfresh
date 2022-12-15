import React, { useEffect, useState } from "react";

import Product from "./Product";

import { GetProducts } from '../api';

const FeatureSection = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetProducts()
        .then(res => setProducts(res.data.data.products))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, [products]);

    return (
        <div className="feature-main" style={{margin: "50px 0"}}>
            <div className="container-fluid">
                <div className="wrapper" style={{margin: "0 0 30px 0"}}>
                    <h2 className="heading heading-h2">Products</h2>
                </div>
                <div className="row row-custom">
                    {
                        
                        products.map(product => (
                            <Product 
                                key={product._id}
                                id={product._id}
                                name={product.name} 
                                image={product.image} 
                                price={product.price.$numberDecimal} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default FeatureSection;