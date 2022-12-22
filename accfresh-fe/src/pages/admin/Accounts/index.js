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
    const [accountQuery, setAccountQuery] = useState("");
    const [page, setPage] = useState(1);
    const [isPrev, setIsPrev] = useState(false);
    const [isNext, setIsNext] = useState(true);

    const onOpenImportHandler = () => {
        setOpenImport(!openImport);
    }

    const onSearchHandler = (e) => {
        setAccountQuery(e.target.value);
    }

    const onPageChangeHandler = (e) => {
        if (e.target.value === "0") {
            setPage(1);
        } else {
            setPage(e.target.value);
        }
        setPageState(page);
    }

    const onNextHandler = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        setPageState(nextPage)
    }

    const onPreviousHandler = () => {
        const previousPage = page === 1 ? 1 : page - 1;
        setPage(previousPage);
        setPageState(previousPage)
    }

    const onLastPageHandler = (isLastedPage) => {
        setPage(page === 1 ? 1 : page - 1);
        setIsNext(!isLastedPage);
    }

    const setPageState = (page) => {
        if (page > 1) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
            setIsNext(true);
        }
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
                            <div className="row actions">
                                <div className="search" style={{ width: "50%" }}>
                                    {!openImport && (
                                        <div className="search-main right-space" style={{ display: "inline", marginRight: "10px" }}>
                                            <input type="text" className="input heading-SB col-lg-6" placeholder="Search" onChange={onSearchHandler}/>
                                        </div>)}
                                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content" }} onClick={onOpenImportHandler}>{openImport ? "Back To List" : "Import"}</button>
                                </div>
                                <div className="paging" style={{ width: "50%", display: "flex", justifyContent: "right" }}>
                                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content", marginRight: "10px" }} 
                                        disabled={!isPrev}
                                        onClick={onPreviousHandler}>Prev</button>
                                    <input type="text" className="input heading-SB" style={{ width: "10%", padding: "14px", textAlign: "center" }} 
                                        value={page} 
                                        onChange={onPageChangeHandler} />
                                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content", marginLeft: "10px" }} 
                                        onClick={onNextHandler} 
                                        disabled={!isNext}>Next</button>
                                </div>
                            </div>
                                {!openImport && <AccountList query={accountQuery} page={page} onLastPage={onLastPageHandler} />}
                                {openImport && <ImportForm />}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Accounts;