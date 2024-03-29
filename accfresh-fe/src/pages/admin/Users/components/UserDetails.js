import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from 'moment';

import Layout from "../../../../components/AdminLayout/Layout";
import UserPayments from "./UserPayments";
import BalanceModal from "./ChangeBalanceModal";
import ChangePasswordModal from "./ChangePasswordModal";

import { GetUser, UpdateBalance, UpdatePassword } from "../api";
import UserOrders from "./UserOrders";

const UserDetails = () => {
    const [user, setUser] = useState({});
    const [isUpdateBalance, setIsUpdateBalance] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [error, setError] = useState({});
    const { userId } = useParams();

    const onEditBalanceHandler = () => {
        setIsUpdateBalance(true);
    }

    const onCloseUpdateBalanceHandler = () => {
        setIsUpdateBalance(false);
    }

    const onChangePasswordHandler = () => {
        setIsChangePassword(true);
    }

    const onClosePasswordHandler = () => {
        setIsChangePassword(false);
    }

    const onUpdateBalanceHandler = (newBalance) => {
        UpdateBalance(userId, newBalance)
        .then(res => {
            setUser({ ...user, balance: res.data.data.$numberDecimal });
            setIsUpdateBalance(false);
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }

    const onUpdatePasswordHandler = (newPassword) => {
        UpdatePassword(userId, newPassword)
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }

    useEffect(() => {
        GetUser(userId)
        .then(res => setUser({
            email: res.data.data.email,
            walletId: res.data.data.wallet._id,
            balance: res.data.data.wallet.balance.$numberDecimal,
            createdDate: Moment(res.data.data.createdAt).format('D-MMM-yyyy')
        }))
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }, []);

    return (
        <Layout>
            <div className="single-creator-main" style={{ margin: "50px 0" }}>
                <div className="container-fluid">
                    <div className="row row-custom-otr">
                        <div className="col-lg-3 col-creator-otr">
                            <div className="col-creator-inr">
                                <div className="img-otr">
                                    <img className="avatar" src="/assets/img/default-user.png" alt="avatar" />
                                </div>
                                <div className="information">
                                    <h4 className="name heading-h4">{user.email}</h4>
                                    <div className="copy-icon-otr">
                                        <p className="text heading-M">${user.balance}</p>
                                        <i className="ri-edit-box-line copy-icon" onClick={onEditBalanceHandler}></i>
                                    </div>
                                    <div className="action">
                                        <button className="btn-primary-1 heading-SB" style={{ width: "100%" }} onClick={onChangePasswordHandler}>Change Password</button>
                                    </div>
                                    <p className="member heading-S">Member since {user.createdDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-detail-otr">
                            <UserPayments userId={userId} />
                        </div>
                    </div>
                    <div className="row row-custom-otr">
                        <div className="col-lg-12 col-detail-otr">
                            <UserOrders userId={userId} />
                        </div>
                    </div>
                </div>
            </div>
            { isUpdateBalance && <BalanceModal balance={user.balance} onClose={onCloseUpdateBalanceHandler} onUpdate={onUpdateBalanceHandler} /> }
            { isChangePassword && <ChangePasswordModal onClose={onClosePasswordHandler} onUpdate={onUpdatePasswordHandler} /> }
        </Layout>
    );
}

export default UserDetails;