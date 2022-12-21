import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { GetAccountsByOrder } from "../api";

import Layout from "../../../../components/Layout/Layout";

const OrderDetails = (props) => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState({});
    const { orderId } = useParams();
    const navigate = useNavigate();

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    useEffect(() => {
        GetAccountsByOrder(orderId)
        .then(res => setAccounts(res.data.data))
        .catch(err => {
            setError({ type: "Error", message: err.response.message });
        });
    }, []);

    return (
        <Layout>
            <div className="blog-detail-main" style={{ margin: "50px 0" }}>
                <div className="container-fluid">
                    <div className="row row-custom">
                        <div className="col-lg-12 col-detail-otr">
                            <button className="btn-primary-1 heading-SB" style={{ width: "fit-content" }} onClick={() => navigate("/orders")}>Back To List</button>
                            <div className="col-detail-inr" style={{ marginTop: "15px" }}>
                                <table className="table" style={tableCartStyle}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>PRODUCT</th>
                                            <th>INFORMATION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            accounts.length > 0 &&
                                            accounts.map((account, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{account.product.name}</td>
                                                    <td>{account.content} 
                                                        <i className="ri-file-copy-line" style={{ cursor: "pointer", fontSize: "25px" }} 
                                                            onClick={() =>  navigator.clipboard.writeText(account.content)}></i>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default OrderDetails;