import React, { useEffect, useState } from "react";

import AccountItem from "./AccountItem";
import classes from './Account.module.css';

import { GetAccounts } from "../api";

const AccountList = (props) => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetAccounts(props.query, props.page)
        .then(res => { 
            if (res.data.data.accounts.length > 0) {
                setAccounts(res.data.data.accounts) 
            } else {
                props.onLastPage(true);
            }
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }, [props.query, props.page]);

    return (
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
                                order={index + 1}
                                product={account.product.name}
                                content={account.content}
                                isSold={account.isSold}
                                buyer={""}
                                isActive={account.isActive}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AccountList;