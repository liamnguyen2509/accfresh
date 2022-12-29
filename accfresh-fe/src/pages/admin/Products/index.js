import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/AdminLayout/Layout";
import ProductList from "./components/ProductList";
import FormCreateModal from "./components/FormCreateModal";

import AuthContext from "../../../store/authContext";

const Products = (props) => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [isAddNew, setIsAddNew] = useState(false);

    const onNewGroupHandler = () => {
        setIsAddNew(true);
    }

    const onCloseModalHandler = () => {
        setIsAddNew(false);
    }

    useEffect(() => {
        if (!context.isLogged) { navigate("/admin/login"); };
        if (context.isLogged && localStorage.getItem("isAdmin") === "0") { navigate("/"); };
    }, []);
    
    return (
        <Layout>
            <div className="blog-detail-main" style={{ margin: "50px 0" }}>
                <div className="container-fluid">
                    <div className="row row-custom">
                        <div className="col-lg-12 col-detail-otr">
                            <div className="actions">
                                <button className="btn-primary-1 heading-SB" style={{ width: "fit-content" }} onClick={onNewGroupHandler}> New Product </button>
                            </div>
                            <ProductList reload={isAddNew} />
                            { isAddNew && <FormCreateModal onClose={onCloseModalHandler} /> }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Products;