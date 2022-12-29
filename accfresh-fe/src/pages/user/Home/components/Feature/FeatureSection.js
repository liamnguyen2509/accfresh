import React, { useEffect, useState } from "react";

import Group from "./Group";
import ProductsModal from "./ProductsModal";

import { GetGroups, GetProductsByGroup } from '../../api';

const FeatureSection = () => {
    const [groups, setGroups] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState({});

    const onGroupClickHandler = (groupId) => {
        GetProductsByGroup(groupId)
        .then(res => setProducts(res.data.data.filter(product => product.isActive === true)))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });;
    }

    const onCloseModalHandler = () => {
        setProducts([]);
    }

    useEffect(() => {
        GetGroups()
        .then(res => setGroups(res.data.data.filter(group => group.isActive === true)))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, []);

    return (
        <div className="feature-main" style={{margin: "50px 0"}}>
            <div className="container-fluid">
                <div className="wrapper" style={{margin: "0 0 30px 0"}}>
                    <h2 className="heading heading-h2">Products</h2>
                </div>
                <div className="row row-custom">
                    {
                        groups.map(group => (
                            <Group 
                                key={group.id}
                                id={group.id}
                                name={group.name} 
                                image={`${process.env.REACT_APP_IMAGE_BASE_URL}${group.image}`} 
                                stock={group.stock} 
                                price={group.price.$numberDecimal} 
                                onClick={onGroupClickHandler} />
                        ))
                    }
                    {products.length > 0 && <ProductsModal products={products} onClose={onCloseModalHandler} />}
                </div>
            </div>
        </div>
    );
}

export default FeatureSection;