import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/Layout/Layout";
import SignUpForm from "./components/SignUpForm";
import AuthContext from "../../../store/authContext";

const SignUp = (props) => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context.isLogged) { navigate("/"); };
    }, []);

    return (
        <Layout>
            <div className="signup-main">
                <div className="container-fluid">
                    < div className="row row-signup">
                        <div className="col-lg-8 col-signup-otr">
                            <SignUpForm />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    ); 
}

export default SignUp;