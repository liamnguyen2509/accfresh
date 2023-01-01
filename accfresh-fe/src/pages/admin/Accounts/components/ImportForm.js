import React, { useEffect, useState } from "react";

import Layout from "../../../../components/AdminLayout/Layout";
import classes from './Account.module.css';

import { GetProducts, ImportAccounts } from "../api";
import { useNavigate } from "react-router-dom";

const ImportForm = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isSelectProduct, setInSelectProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ value: "", text: "Select Product" });
    const [dataLines, setDataLines] = useState("");
    const [lineImported, setLineImported] = useState(0);
    const [error, setError] = useState({});

    const onClickBackHandler = () => {
        navigate("/admin/accounts");
    }

    const onSelectProductHandler = () => {
        setInSelectProduct(!isSelectProduct);
    }

    const onSelectedHandler = (e) => {
        setInSelectProduct(false);
        setSelectedProduct({value : e.target.attributes['rel'].value, text: e.target.outerText});
    }

    const onDataChangeHandler = (e) => {
        setDataLines(e.target.value);
        setLineImported(0);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        var accounts = dataLines.split('\n').map(line => ({
            line: line.trim(),
            productId: selectedProduct.value
        }));

        ImportAccounts (accounts)
        .then(res => setLineImported(res.data.data.total))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }

    useEffect(() => {
        GetProducts()
        .then(res => setProducts(res.data.data.products.map(product => ({ value: product._id, text: product.name }))))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, []);

    return (
        <Layout>
            <div className="blog-detail-main" style={{ margin: "50px 0" }}>
                <div className="container-fluid">
                    <div className="row row-custom">
                        <div className="col-lg-12 col-signup-otr">
                            <div className="row actions">
                                <div className="search" style={{ width: "50%" }}>
                                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content" }} onClick={onClickBackHandler}> Back To List </button>
                                </div>
                            </div>
                            <div className={`col-signup-inr ${classes["account-content-panel"]} ${classes["account-form-content"]}`}>
                                <div className="content col-lg-7" style={{ textAlign: "center" }}>
                                    <h4 className="text heading-h4" style={{ color: "#fff" }}>Import Accounts</h4>
                                    <form className="form-main" method="post" onSubmit={onSubmitHandler}>
                                        <div className={classes["select-main"]}>
                                            <div className={classes.select}>
                                                <div className={`${isSelectProduct ? "active" : ""} ${classes["select-styled"]}`} onClick={onSelectProductHandler}>{selectedProduct.text}</div>
                                                <ul className={classes["select-options"]} style={{ display: `${isSelectProduct ? "block" : "none"}` }}>
                                                    <li className={classes.li} rel="hide">Select Product</li>
                                                    {
                                                        products.length > 0 &&
                                                        products.map(product => (<li key={product.value} className={classes.li} value={selectedProduct.value} rel={product.value} onClick={onSelectedHandler}>{product.text}</li>))
                                                    }
                                                </ul>
                                            </div>
                                            <p className={`${classes["line-count"]} heading-S`}>
                                                Having <span className={classes["counter-lines"]}>{dataLines.length <= 0 ? 0 : dataLines.split('\n').length}</span> lines pasted. 
                                                And <span className={classes["counter-import"]}>{lineImported}</span> imported.
                                            </p>
                                        </div>
                                        <div className="input-otr">
                                            <textarea className={`${classes.textarea} input heading-SB`} placeholder="Account lines" 
                                                value={dataLines} 
                                                onChange={onDataChangeHandler}
                                                required></textarea>
                                        </div>
                                        <div className={classes.action}>
                                            <input className={`${classes.button} heading-SB`} type="submit" value="Import" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ImportForm;