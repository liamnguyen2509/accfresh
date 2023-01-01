import React from "react";

import classes from './ConfirmModal.module.css';

const ConfirmModal = (props) => {

    const onCloseModalHandler = () => {
        props.onClose();
    }

    const onRemoveHandler = () => {
        props.onRemove();
    }

    return(
        <div className={`${classes["confirm-modal"]} ${classes["confirm-modal-open"]}`}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <h4 className="heading-h4">Confirm</h4>
                    <i className="ri-close-line heading-h4" style={{ cursor: "pointer" }} onClick={onCloseModalHandler}></i>
                </div>
                <p className="heading-S">Account {props.content} will be deleted.</p>
                <p className="heading-S">Do you want to continue delete?</p>
            </div>
            <div className={classes.action}>
                <button className="btn-primary-2 heading-SB" onClick={onCloseModalHandler}> Cancel </button>
                <button className="btn-primary-1 heading-SB" onClick={onRemoveHandler}> Confirm </button>
            </div>
        </div>
    );
}

export default ConfirmModal;