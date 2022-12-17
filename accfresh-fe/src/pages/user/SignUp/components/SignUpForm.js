import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RegisterUser } from '../api';

const SignUpForm = (props) => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError({ type: "Error", message: "Password not match." });
        } else {
            setError({});
           
            const newUser = {
                username,
                email,
                password
            };

            RegisterUser(newUser)
            .then(res => navigate("/login"))
            .catch(err => {
                setError({ type: "Error", message: err.response.data.message });
            });
        }
    }

    return (
        <div className="col-signup-inr">
            <div className="content">
                <div className="col-form-inr">
                    <h4 className="text heading-h4">Sign Up</h4>
                    <form className="form-main" method="post" onSubmit={onSubmitHandler}>
                        <div className="input-otr">
                            <input className="input heading-SB" type="text" placeholder="username"
                                value={username}
                                onChange={e => setUserName(e.target.value)}
                                required />
                        </div>
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
                        <div className="input-otr input-otr-2">
                            <input className="input heading-SB" type="password" placeholder="confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required />
                        </div>
                        <div className="action">
                            <input className="button heading-SB" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className="text heading-S" style={{ color: "orange", padding: "20px 0 0 0" }}>{error && error.message}</p>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;