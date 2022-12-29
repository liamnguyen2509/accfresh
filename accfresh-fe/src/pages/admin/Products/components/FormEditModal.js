import React, { useEffect, useState } from "react";

import classes from './Form.module.css';

import { EditProduct } from "../api";
import { GetS3SignedRequest, UploadToS3 } from "../../../helpers";

const FormEditModal = (props) => {
    const [product, setProduct] = useState({
        id: props.id,
        name: props.name,
        description: props.description,
        image: props.image,
        stock: props.stock,
        sold: props.sold,
        price: props.price
    });
    const [previewImage, setPreviewImage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [signedUrl, setSignedUrl] = useState("");
    const [error, setError] = useState({});

    const onCloseModalHandler = () => {
        props.onClose();
        setPreviewImage("");
    }

    const onImageSelectedHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
            setProduct({ ...product, image: e.target.files[0].name });

            // show preview image
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setPreviewImage(reader.result);
            }
            
            // get s3 url to upload
            GetS3SignedRequest(e.target.files[0])
            .then(res => setSignedUrl(res.data.data))
            .catch(err => {
                setError({ type: "Error", message: err });
            });
        }
    }

    const onNameChangeHandler = (e) => {
        setProduct({ ...product, name: e.target.value });
    }

    const onDescriptionChangeHandler = (e) => {
        setProduct({ ...product, description: e.target.value });
    }

    const onStockChangeHandler = (e) => {
        setProduct({ ...product, stock: e.target.value });
    }

    const onSoldChangeHandler = (e) => {
        setProduct({ ...product, sold: e.target.value });
    }

    const onPriceChangeHandler = (e) => {
        setProduct({ ...product, price: e.target.value });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // upload image to S3
        if (selectedImage) {
            UploadToS3(selectedImage, signedUrl)
            .catch(err => {
                setError({ type: "Error", message: err.message });
            });
        }
        
        // edit product in DB
        EditProduct(product)
        .then(res => props.onClose())
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }

    useEffect(() => {
        setPreviewImage(props.image);
    }, [props]);

    return (
        <div className={`${classes["form-modal"]} ${classes["form-modal-open"]}`}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <h4 className="heading-h4">Edit {product.name}</h4>
                    <i className="ri-close-line heading-h4" style={{ cursor: "pointer" }} onClick={onCloseModalHandler}></i>
                </div>
                <form className={classes["form-main"]} method="post" onSubmit={onSubmitHandler}>
                    <div className={classes["input-otr"]}>
                        <input className="input heading-SB" type="text" placeholder="Product Name" value={product.name} onChange={onNameChangeHandler} required />
                    </div>
                    <div className={classes["input-otr"]}>
                        <textarea className={`input heading-SB`} placeholder="Description" 
                                value={product.description} 
                                onChange={onDescriptionChangeHandler}
                                required></textarea>
                    </div>
                    <div className={classes["input-otr"]}>
                        <div className={classes["upload-area"]}>
                            <div className={classes["drop-zoon"]}>
                                {!previewImage && <p className={`${classes.desc} heading-SB`}>PNG, GIF, WEBP, JPG</p>}
                                {!previewImage && <p className="btn-primary-1 heading-SB" style={{ width: "fit-content", margin: "0 auto", cursor: "pointer" }}>browse</p>}
                                <div className="img-main">
                                    {previewImage && <img src={previewImage} alt={product.name} className={classes["preview-image"]} draggable="true" />}
                                </div>
                                <input type="file" className={classes["file-input"]} accept="image/*" onChange={onImageSelectedHandler} />
                            </div>
                        </div>
                    </div>
                    <div className={classes["input-main"]}>
                        <div className={classes["input-otr"]} style={{ width: "30.33%" }}>
                            <h5 className="heading-input heading-SB">Stock</h5>
                            <input className="input heading-SB" type="text" placeholder="Stock" value={product.stock} onChange={onStockChangeHandler} required />
                        </div>
                        <div className={classes["input-otr"]} style={{ width: "30.33%" }}>
                            <h5 className="heading-input heading-SB">Sold</h5>
                            <input className="input heading-SB" type="text" placeholder="Sold" value={product.sold} onChange={onSoldChangeHandler} required />
                        </div>
                        <div className={classes["input-otr"]} style={{ width: "30.33%" }}>
                            <h5 className="heading-input heading-SB">Price</h5>
                            <input className="input heading-SB" type="text" placeholder="Price" value={product.price} onChange={onPriceChangeHandler} required />
                        </div>
                    </div>
                    <div className={classes.action}>
                        <button className="btn-primary-2 heading-SB" onClick={onCloseModalHandler}> Cancel </button>
                        <button className="btn-primary-1 heading-SB" type="submit"> Submit </button>
                    </div>
                </form>
                <p className="text heading-S" style={{ color: "orange", padding: "20px 0 0 0", textAlign: "center" }}>{error && error.message}</p>
            </div>
        </div>
    );
}

export default FormEditModal;