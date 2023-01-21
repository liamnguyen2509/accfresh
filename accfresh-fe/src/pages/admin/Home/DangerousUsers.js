import React, { useEffect, useState } from "react";
import Moment from 'moment';

import { GetDangerousUsers } from "./api";

const DangerousUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState({});

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    useEffect(() => {
        GetDangerousUsers()
        .then(res => setUsers(res.data.data))
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }, []);

    return (
        <div className="col-detail-inr" style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "24px", padding: "48px 48px 36px 48px" }}>
            <table className="table" style={tableCartStyle}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>EMAIL</th>
                        <th>BALANCE</th>
                        <th>CREATED DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 &&
                        users.map((user, index) => 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>${user.wallet.balance.$numberDecimal}</td>
                                <td>{Moment(user.createdAt).format('D-MMM-yyyy h:mm A')}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default DangerousUsers;