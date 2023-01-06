import React, { useEffect, useRef, useState } from "react";
import Moment from 'moment';

import UserItem from "./UserItem";

import { GetUsers } from "../api";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPage] = useState(1);
    const currentPage = useRef(1);
    const orderingStartRow = useRef(0);
    const [paging, setPaging] = useState({
        page: 1,
        pageSize: 20,
        isPrev: false,
        isNext: false
    });
    const [error, setError] = useState({});

    const onSearchHandler = (e) => {
        setSearchTerm(e.target.value);
        currentPage.current = 1;
        setPaging({ ...paging, page: currentPage.current });
    }

    const onPageChangeHandler = (e) => {
        if (e.target.value === "0" || isNaN(e.target.value) || e.target.value > totalPages) {
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

    useEffect(() => {
        GetUsers(searchTerm, paging.page, paging.pageSize)
        .then(async res => {
            setUsers(res.data.data.users);

            if (res.data.data.totalPages > 1) { 
                setPaging({ ...paging, isNext: true }); 
            };
            setTotalPage(res.data.data.totalPages);
            orderingStartRow.current = currentPage.current === 1 ? 0 : (currentPage.current - 1) * paging.pageSize;
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, [paging.page, searchTerm]);

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    return (
        <>
            <div className="row actions">
                <div className="search" style={{ width: "50%" }}>
                    <div className="search-main right-space" style={{ display: "inline", marginRight: "10px" }}>
                        <input type="text" className="input heading-SB col-lg-6" placeholder="Search" onChange={onSearchHandler} />
                    </div>
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
            <div className="col-detail-inr" style={{ marginTop: "15px" }}>
                <table className="table" style={tableCartStyle}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>BALANCE</th>
                            <th>CREATED DATE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 &&
                            users.map((user, index) => {
                                orderingStartRow.current = orderingStartRow.current + 1;
                                return (
                                    <UserItem 
                                        key={user._id}
                                        id={user._id}
                                        order={orderingStartRow.current}
                                        username={user.username}
                                        email={user.email}
                                        balance={user.wallet.balance.$numberDecimal}
                                        createdDate={Moment(user.createdAt).format('D-MMM-yyyy h:mm A')}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserList;