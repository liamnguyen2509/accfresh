import React, { useEffect, useState } from "react";

import ProductItem from "./ProductItem";
import ConfirmModal from "./ConfirmModal";
import FormEditModal from "./FormEditModal";

import { GetProducts, RemoveProduct } from "../api";

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [isRemove, setIsRemove] = useState(false);
    const [productRemoving, setProductRemoving] = useState();
    const [productEditing, setProductEditing] = useState();
    const [error, setError] = useState({});

    const onConfirmRemoveHandler = (productId) => {
        setIsRemove(true);
        const productRemoving = products.find(product => product._id === productId);
        setProductRemoving({ id: productId, name: productRemoving.name });
    }

    const onCloseModalHandler = () => {
        setIsRemove(false);
    }

    const onRemoveHandler = () => {
        RemoveProduct(productRemoving.id)
        .then(res => {
            if (res.data.type === "Success") setIsRemove(false);
        })
        .catch(err => { setError({ type: "Error", message: err.response.data.message }); })
    }

    const onEditHandler = (productId) => {
        const productEditing = products.find(product => product._id === productId);
        setProductEditing({ 
            id: productId, 
            name: productEditing.name, 
            image: productEditing.image, 
            description: productEditing.description,
            stock: productEditing.stock,
            sold: productEditing.sold,
            price: productEditing.price.$numberDecimal
        });
    }

    const onCloseEditModalHandler = () => {
        setProductEditing(null);
    }

    useEffect(() => {
        GetProducts()
        .then(res => setProducts(res.data.data.products))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, [isRemove, productEditing, props.reload]);

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    return (
        <div className="col-detail-inr" style={{ marginTop: "15px" }}>
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
                                id={product._id}
                                order={index + 1}
                                name={product.name}
                                description={product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description}
                                stock={product.stock}
                                sold={product.sold}
                                price={product.price.$numberDecimal}
                                image={`${process.env.REACT_APP_IMAGE_BASE_URL}${product.image}`}
                                onConfirm={onConfirmRemoveHandler}
                                onEdit={onEditHandler}
                            />
                        ))
                    }
                </tbody>
            </table>
            { isRemove && <ConfirmModal name={productRemoving.name} onClose={onCloseModalHandler} onRemove={onRemoveHandler} /> }
            { productEditing && 
                <FormEditModal 
                    id={productEditing.id} 
                    name={productEditing.name} 
                    image={`${process.env.REACT_APP_IMAGE_BASE_URL}${productEditing.image}`} 
                    description={productEditing.description}
                    stock={productEditing.stock}
                    sold={productEditing.sold}
                    price={productEditing.price}
                    onClose={onCloseEditModalHandler} /> }
        </div>
    );
}

export default ProductList;