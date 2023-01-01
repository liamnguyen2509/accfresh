import React, { useEffect, useRef, useState } from "react";

import AccountItem from "./AccountItem";
import ConfirmModal from "./ConfirmModal";
import classes from './Account.module.css';

import { GetAccounts, RemoveAccount } from "../api";
import { useNavigate } from "react-router-dom";

const AccountList = (props) => {
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPage] = useState(1);
    const currentPage = useRef(1);
    const [paging, setPaging] = useState({
        page: 1,
        pageSize: 20,
        isPrev: false,
        isNext: false
    });
    const [isRemove, setIsRemove] = useState(false);
    const [accountRemoving, setAccountRemoving] = useState();
    const [error, setError] = useState({});

    const onClickImportHandler = () => {
        navigate("/admin/accounts/import");
    }

    const onSearchHandler = (e) => {
        setSearchTerm(e.target.value);
        currentPage.current = 1;
        setPaging({ ...paging, page: currentPage.current });
    }

    const onPageChangeHandler = (e) => {
        console.log(e.target.value);
        console.log(totalPages);
        if (e.target.value === "0" || isNaN(e.target.value) || e.target.value > totalPages) {
            console.log("aaaaaa")
            setPaging({ ...paging, page: currentPage.current });
        } else {
            if (e.target.value !== "") {
                currentPage.current = e.target.value;
                if (currentPage.current === 1) {
                    setPaging({ ...paging, page: currentPage.current, isPrev: false });
                } else {
                    setPaging({ ...paging, page: currentPage.current });
                }
            }
        }
    } 

    const onPrevHandler = () => {
        if (currentPage.current <= 1) {
            setPaging({ ...paging, page: 1, isPrev: false, isNext: totalPages > 1 ? true : false });
        } else {
            currentPage.current--;
            setPaging({ ...paging, page: currentPage.current });
        }
    }

    const onNextHandler = () => {
        currentPage.current++;

        if (currentPage.current === totalPages) {
            setPaging({ ...paging, isPrev: true, isNext: false });
        } else {
            setPaging({ ...paging, page: currentPage.current, isPrev: true });
        }
    }

    const onConfirmRemoveHandler = (accountId) => {
        setIsRemove(true);
        const accountRemoving = accounts.find(account => account._id === accountId);
        setAccountRemoving({ id: accountId, content: accountRemoving.content });
    }

    const onCloseModalHandler = () => {
        setIsRemove(false);
    }

    const onRemoveHandler = () => {
        RemoveAccount(accountRemoving.id)
        .then(res => {
            if (res.data.type === "Success") setIsRemove(false);
        })
        .catch(err => { setError({ type: "Error", message: err.response.data.message }); })
    }

    useEffect(() => {
        GetAccounts(searchTerm, paging.page, paging.pageSize)
        .then(res => { 
            setAccounts(res.data.data.accounts);
            if (res.data.data.totalPages > 1) { 
                setPaging({ ...paging, isNext: true }); 
            };
            setTotalPage(res.data.data.totalPages);
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }, [isRemove, paging.page, searchTerm]);

    return (
        <>
            <div className="row actions">
                <div className="search" style={{ width: "50%" }}>
                    <div className="search-main right-space" style={{ display: "inline", marginRight: "10px" }}>
                        <input type="text" className="input heading-SB col-lg-6" placeholder="Search" onChange={onSearchHandler}/>
                    </div>
                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content" }} onClick={onClickImportHandler}> Import </button>
                </div>
                <div className="paging" style={{ width: "50%", display: "flex", justifyContent: "right" }}>
                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content", marginRight: "10px" }} 
                        onClick={onPrevHandler}
                        disabled={!paging.isPrev}>Prev</button>
                    <input type="text" className="input heading-SB" style={{ width: "10%", padding: "14px", textAlign: "center" }} 
                        value={paging.page} onChange={onPageChangeHandler} />
                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content", marginLeft: "10px" }} 
                        onClick={onNextHandler}
                        disabled={!paging.isNext}>Next</button>
                </div>
            </div>
            <div className={`col-detail-inr ${classes["account-content-panel"]}`}>
                <table className={`table ${classes["account-table"]}`}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>PRODUCT</th>
                            <th>CONTENT</th>
                            <th>IS SOLD</th>
                            <th>BUYER</th>
                            <th>IS ACTIVE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accounts.length > 0 &&
                            accounts.map((account, index) => (
                                <AccountItem 
                                    key={account._id}
                                    id={account._id}
                                    order={index + 1}
                                    product={account.product.name}
                                    content={account.content}
                                    isSold={account.isSold}
                                    buyer={""}
                                    isActive={account.isActive}
                                    onConfirm={onConfirmRemoveHandler}
                                />
                            ))
                        }
                    </tbody>
                </table>
                { isRemove && <ConfirmModal content={accountRemoving.content} onClose={onCloseModalHandler} onRemove={onRemoveHandler} /> }
            </div>
        </>
    );
}

export default AccountList;