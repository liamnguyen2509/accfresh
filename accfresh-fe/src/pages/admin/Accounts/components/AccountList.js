import React, { useEffect, useState } from "react";

import AccountItem from "./AccountItem";

import { GetAccounts } from "../api";

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetAccounts()
        .then(res => setAccounts(res.data.data.accounts))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, []);


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
                        <th>GROUP</th>
                        <th>CONTENT</th>
                        <th>SOLD</th>
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
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AccountList;