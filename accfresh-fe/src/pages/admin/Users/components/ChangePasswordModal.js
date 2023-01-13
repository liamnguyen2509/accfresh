import React, { useState } from "react";

import classes from './Modal.module.css';

const ChangePasswordModal = (props) => {
    const [password, setPassword] = useState('');

    const onCloseModalHandler = () => {
        props.onClose();
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.onUpdate(password);
    }

    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    return(
        <div className={`${classes["password-modal"]} ${classes["modal-open"]}`}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <h4 className="heading-h4">New Password</h4>
                    <i className="ri-close-line heading-h4" style={{ cursor: "pointer" }} onClick={onCloseModalHandler}></i>
                </div>
                <form className={classes["form-main"]} method="post" onSubmit={onSubmitHandler}>
                    <div className={classes["input-otr"]}>
                        <input className="input heading-SB" type="text" value={password} onChange={onPasswordChangeHandler} required />
                    </div>
                    <div className={classes.action}>
                        <button className="btn-primary-2 heading-SB" onClick={onCloseModalHandler}> Cancel </button>
                        <button className="btn-primary-1 heading-SB" type="submit"> Change </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordModal;