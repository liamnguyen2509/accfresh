import React, { useEffect, useState } from "react";
import Moment from 'moment';

import AccountItem from "./AccountItem";

import { GetAccounts } from "../api";

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetAccounts(localStorage.getItem("uid"))
        .then(res => setAccounts(res.data.data))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, []);

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    return (
        <div className="col-detail-inr">
            <table className="table" style={tableCartStyle}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>CONTENT</th>
                        <th>PRODUCT</th>
                        <th>ORDER DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.length > 0 &&
                        accounts.map((account, index) => (
                            <AccountItem 
                                key={account._id}
                                order={index + 1}
                                content={account.content}
                                product={account.product.name}
                                orderDate={Moment(account.updatedAt).format('d-MMM-yyyy')}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AccountList;