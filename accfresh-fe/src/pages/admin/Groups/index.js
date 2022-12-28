import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/AdminLayout/Layout";
import GroupList from "./components/GroupList";
import NewGroupModal from "./components/NewGroupModal";

import AuthContext from "../../../store/authContext";

const Groups = (props) => {
    const [isAddNew, setIsAddNew] = useState(false);

    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const onNewGroupHandler = () => {
        setIsAddNew(true);
    }

    const onCloseModalHandler = () => {
        setIsAddNew(false);
    }

    useEffect(() => {
        if (!context.isLogged) { navigate("/admin/login"); };
        if (context.isLogged && localStorage.getItem("isAdmin") === "0") { navigate("/"); };
    }, []);
    
    return (
        <Layout>
            <div className="blog-detail-main" style={{ margin: "50px 0" }}>
                <div className="container-fluid">
                    <div className="row row-custom">
                        <div className="col-lg-12 col-detail-otr">
                            <div className="actions">
                                <button className="btn-primary-1 heading-SB" style={{ width: "fit-content" }} onClick={onNewGroupHandler}> New Group </button>
                            </div>
                            <GroupList reload={isAddNew} />
                            { isAddNew && <NewGroupModal onClose={onCloseModalHandler} /> }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Groups;