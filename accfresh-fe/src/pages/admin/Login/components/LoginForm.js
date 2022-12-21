import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthenticateAdmin } from '../api';
import AuthContext from "../../../../store/authContext";

const LoginForm = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();

        AuthenticateAdmin(email, password)
        .then(res => {
            const email = res.data.data.admin.email;
            const authToken = res.data.data.admin.authToken;
            context.onLogin(0, email, 0, authToken, true);

            navigate("/admin");
            return true;
        })
        .catch(err => {
            setError({ type: "Error", message: err });
        });
    }

    return (
        <div className="col-login-inr">
            <div className="content">
                <h4 className="text heading-h4">Login To Portal</h4>
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