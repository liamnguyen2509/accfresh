import React from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    return (
        <div className="col-signup-inr">
            <div className="content">
                <h4 className="text heading-h4">Sign Up</h4>
                <form className="form-main" method="post">
                    <div className="input-otr">
                        <input className="input heading-SB" type="email" placeholder="email@domain.com" required />
                    </div>
                    <div className="input-otr">
                        <input className="input heading-SB" type="text" placeholder="username" required />
                    </div>
                    <div className="input-otr input-otr-2">
                        <input className="input heading-SB" type="Password" placeholder="password" required />
                    </div>
                    <div className="input-otr input-otr-2">
                        <input className="input heading-SB" type="Password" placeholder="confirm password" required />
                    </div>
                    <div className="action">
                        <input className="button heading-SB" type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;