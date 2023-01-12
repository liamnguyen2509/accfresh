import React, { useState } from "react";

import classes from './Modal.module.css';

const BalanceModal = (props) => {
    const [balance, setBalance] = useState(props.balance);

    const onCloseModalHandler = () => {
        props.onClose();
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.onUpdate(balance);
    }

    const onBalanceChangeHandler = (e) => {
        setBalance(e.target.value);
    }

    return(
        <div className={`${classes["balance-modal"]} ${classes["modal-open"]}`}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <h4 className="heading-h4">Balance</h4>
                    <i className="ri-close-line heading-h4" style={{ cursor: "pointer" }} onClick={onCloseModalHandler}></i>
                </div>
                <form className={classes["form-main"]} method="post" onSubmit={onSubmitHandler}>
                    <div className={classes["input-otr"]}>
                        <input className="input heading-SB" type="text" value={balance} onChange={onBalanceChangeHandler} required />
                    </div>
                    <div className={classes.action}>
                        <button className="btn-primary-2 heading-SB" onClick={onCloseModalHandler}> Cancel </button>
                        <button className="btn-primary-1 heading-SB" type="submit"> Update </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BalanceModal;