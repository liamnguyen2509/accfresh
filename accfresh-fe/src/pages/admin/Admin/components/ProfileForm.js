import React, { useEffect, useState } from "react";

import { GetInfo, UpdateBank } from "../api";

const ProfileForm = () => {
    const [bank, setBank] = useState({ name: "VietComBank", account: "" });
    const [message, setMessage] = useState({});

    useEffect(() => {
        GetInfo(localStorage.getItem("email"))
        .then(res => setBank({ name: res.data.data.bank, account: res.data.data.bankAccount }))
        .catch(err => setMessage({ type: "Error", message: err.response.message }));
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        UpdateBank(bank.name, bank.account)
        .then(res => setMessage({ type: "Success", message: "Update Bank information successfully." }))
        .catch(err => setMessage({ type: "Error", message: err.response.message }));
    }

    const messageStyle = {
        color: message.type === "Success" ? "green" : "orange",
        padding: "20px 0 0 0",
        fontWeight: "bold"
    }

    return (
        <div className="col-login-inr">
            <div className="content">
                <h4 className="text heading-h4">Bank Account</h4>
                <form className="form-main" method="post" onSubmit={onSubmitHandler}>
                    <div className="input-otr">
                        <input className="input heading-SB" type="text" placeholder="bank name" 
                            value={bank.name || ""}
                            onChange={e => setBank({ ...bank, name: e.target.value })}
                            required />
                    </div>
                    <div className="input-otr input-otr-2">
                        <input className="input heading-SB" type="text" placeholder="bank account" 
                            value={bank.account || ""}
                            onChange={e => setBank({ ...bank, account: e.target.value })}
                            required />
                    </div>
                    <div className="action">
                        <input className="button heading-SB" type="submit" value="Update" />
                    </div>
                </form>
                <p className="text heading-S" style={messageStyle}>{message && message.message}</p>
            </div>
        </div>
    );
}

export default ProfileForm;