import React from "react";
import { Link } from "react-router-dom";

const DontHaveAccount = () => {
    return (
        <div className="col-login-inr" style={{padding: "20px 0", marginTop: 24}}>
            <div className="content">
                <span className="text heading-S white">Don't have an account? 
                <Link to={"/sign-up"} className="forget heading-SB" style={{display: "inline"}}> Create one </Link> now</span>
            </div>
        </div>
    );
}

export default DontHaveAccount;