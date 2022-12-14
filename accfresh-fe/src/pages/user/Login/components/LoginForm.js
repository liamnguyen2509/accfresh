import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    return (
        <div className="col-login-inr">
            <div className="content">
                <h4 className="text heading-h4">Login To AccFresh</h4>
                <form className="form-main" method="post">
                    <div className="input-otr">
                        <input className="input heading-SB" type="text" name="email" placeholder="email@domain.com" required />
                    </div>
                    <div className="input-otr input-otr-2">
                        <input className="input heading-SB" type="password" name="password" placeholder="password" required />
                    </div>
                    <div className="check-main">
                        <div className="check">
                            <label>
                                <span className="check-inner">
                                    <input type="checkbox" className="input-check opacity-0 absolute" />
                                    <svg className="fill-current" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#019DEA"/><path d="m10.334 14.643 7.66-7.66 1.179 1.178L10.333 17 5.03 11.697l1.179-1.179 4.125 4.125Z" fill="#fff"/></svg>
                                </span>
                                <span className="select-none heading-S">Remember Me</span>
                            </label>
                        </div>
                        <Link to={"/forgot-password"} className="forget heading-SB"> Forgot Password? </Link>
                    </div>
                    <div className="action">
                        <input className="button heading-SB" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;