import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/AdminLayout/Layout";
import ProfileForm from "./components/ProfileForm";

import AuthContext from "../../../store/authContext";

const Profile = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authCtx.isLogged) { navigate("/admin/login"); };
    
    return (
        <Layout>
            <div className="login-main">
                <div className="container-fluid">
                    <div className="row row-login">
                        <div className="col-lg-8 col-login-otr">
                            <ProfileForm />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Profile;