import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthenticateUser } from '../api';
import AuthContext from "../../../../store/authContext";

const LoginForm = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();

        AuthenticateUser(email, password)
        .then(res => {
            console.log(res);
            const userId = res.data.data.user._id;
            const email = res.data.data.user.email;
            const walletBalance = res.data.data.user.wallet.balance.$numberDecimal;
            const authToken = res.data.data.user.authToken;
            context.onLogin(userId, email, walletBalance, authToken, false);

            navigate("/");
            return true;
        })
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }

    return (
        <div className="col-login-inr">
            <div className="content">
                <h4 className="text heading-h4">Login To AccFresh</h4>
                <form className="form-main" method="post" onSubmit={onSubmitHandler}>
                    <div className="input-otr">
                        <input className="input heading-SB" type="email" placeholder="email@domain.com" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className="input-otr input-otr-2">
                        <input className="input heading-SB" type="password" placeholder="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required />
                    </div>
                    <div className="check-main">
                        <div className="check">
                            {/* <label>
                                <span className="check-inner">
                                    <input type="checkbox" className="input-check opacity-0 absolute" />
                                    <svg className="fill-current" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#019DEA"/><path d="m10.334 14.643 7.66-7.66 1.179 1.178L10.333 17 5.03 11.697l1.179-1.179 4.125 4.125Z" fill="#fff"/></svg>
                                </span>
                                <span className="select-none heading-S">Remember Me</span>
                            </label> */}
                        </div>
                        <Link to={"/forgot-password"} className="forget heading-SB"> Forgot Password? </Link>
                    </div>
                    <div className="action">
                        <input className="button heading-SB" type="submit" value="Login" />
                    </div>
                </form>
                <p className="text heading-S" style={{ color: "orange", padding: "20px 0 0 0" }}>{error && error.message}</p>
            </div>
        </div>
    );
}

export default LoginForm;