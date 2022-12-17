import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/AdminLayout/Layout";
import AccountList from "./components/AccountList";
import ImportForm from "./components/ImportForm";

import AuthContext from "../../../store/authContext";

const Accounts = (props) => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const [openImport, setOpenImport] = useState(false);

    const onOpenImportHandler = () => {
        setOpenImport(!openImport);
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
                        <div className="col-lg-12 col-signup-otr">
                            <button className="btn-primary-1 heading-SB" style={{ width: "fit-content" }} onClick={onOpenImportHandler}>{openImport ? "Back To List" : "Import"}</button>
                                {!openImport && <AccountList />}
                                {openImport && <ImportForm />}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Accounts;