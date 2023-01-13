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
    const currentPage = useRef(1);
    const [paging, setPaging] = useState({
        page: 1,
        pageSize: 20,
        totalRecords: 0,
        totalPages: 1,
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
        if (e.target.value === "0" || isNaN(e.target.value) || e.target.value > paging.totalPages) {
            setPaging({ ...paging, page: currentPage.current });
        } else {
            if (e.target.value !== "") {
                currentPage.current = e.target.value;
                const canPrev = currentPage.current === 1 ? false : true;
                const canNext = currentPage.current >= paging.totalPages ? false : true;
                setPaging({ ...paging, page: currentPage.current, isPrev: canPrev, isNext: canNext });
            }
        }
    } 

    const onPrevHandler = () => {
        if (currentPage.current <= 1) currentPage.current = 1; 
        
        currentPage.current--;
        const canPrev = currentPage.current === 1 ? false : true;
        setPaging({ ...paging, page: currentPage.current, isPrev: canPrev, isNext: true });
    }

    const onNextHandler = () => {
        currentPage.current++;
        console.log(paging.totalPages);
        const canNext = currentPage.current === paging.totalPages ? false : true;
        setPaging({ ...paging, page: currentPage.current, isPrev: true, isNext: canNext });
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
                const canNext = res.data.data.totalRecords <= paging.pageSize 
                            || res.data.data.endRecord < paging.pageSize
                            || res.data.data.totalRecords === res.data.data.endRecord ? false : true;
                setPaging({ ...paging, 
                    startRecord: res.data.data.startRecord,
                    endRecord: res.data.data.endRecord,
                    totalPages: res.data.data.totalPages, 
                    totalRecords: res.data.data.totalRecords, 
                    isNext: canNext });  
            };
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
                    <p className="heading-SB" style={{ marginRight: "15px", padding: "14px 0px 14px 24px", color: "#FFF" }}>Records: {paging.startRecord} - {paging.endRecord} / {paging.totalRecords} | Page:</p>
                    <input type="text" className="input heading-SB" style={{ width: "10%", padding: "14px", textAlign: "center", marginRight: "10px" }} 
                        value={paging.page} onChange={onPageChangeHandler} />
                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content", marginRight: "10px" }} 
                        onClick={onPrevHandler}
                        disabled={!paging.isPrev}>Prev</button>
                    <button className="btn-primary-1 heading-SB" style={{ width: "fit-content" }} 
                        onClick={onNextHandler}
                        disabled={!paging.isNext}>Next</button>
                </div>
            </div>
            <div className={`col-detail-inr ${classes["account-content-panel"]}`}>
                <table className={`table ${classes["account-table"]}`}>
                    <thead>
                        <tr>
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
                            accounts.map((account, index) => {
                                return (
                                    <AccountItem 
                                        key={account._id}
                                        id={account._id}
                                        product={account.product.name}
                                        content={account.content}
                                        isSold={account.isSold}
                                        buyer={""}
                                        isActive={account.isActive}
                                        onConfirm={onConfirmRemoveHandler}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
                { isRemove && <ConfirmModal content={accountRemoving.content} onClose={onCloseModalHandler} onRemove={onRemoveHandler} /> }
            </div>
        </>
    );
}

export default AccountList;