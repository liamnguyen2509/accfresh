import React from "react";

import Layout from "../../../components/Layout/Layout";
import SignUpForm from "./components/SignUpForm";

const SignUp = (props) => {
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