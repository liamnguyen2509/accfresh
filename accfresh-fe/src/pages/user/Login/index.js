import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/Layout/Layout";
import LoginForm from "./components/LoginForm";
import DontHaveAccount from "./components/DontHaveAccount";

import AuthContext from "../../../store/authContext";

const Login = (props) => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context.isLogged) { navigate("/"); };
    }, []);
    
    return (
        <Layout>
            <div className="login-main">
                <div className="container-fluid">
                    <div className="row row-login">
                        <div className="col-lg-8 col-login-otr">
                            <LoginForm />
                        </div>
                        <div className="col-lg-8 col-login-otr">
                            <DontHaveAccount />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default Login;