import React from "react";
import { useNavigate } from "react-router-dom";

import { RegisterUser } from './api';

import Layout from "../../../components/Layout/Layout";
import SignUpForm from "./components/SignUpForm";

const SignUp = (props) => {
    const navigate = useNavigate();

    const onSubmitHandler = async (user) => {
        RegisterUser(user)
        .then(res => navigate("/login"))
        .catch(err => {
            return err.response.data.message;
        });
    }

    return (
        <Layout>
            <div className="signup-main">
                <div className="container-fluid">
                    < div className="row row-signup">
                        <div className="col-lg-8 col-signup-otr">
                            <SignUpForm onSubmit={onSubmitHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default SignUp;