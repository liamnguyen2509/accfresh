import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from './css/DepositOptions.module.css';

const DepositOptions = (props) => {
    const [isOpenOptions, setIsOpenOptions] = useState(false);

    const onClickHandler = () => {
        setIsOpenOptions(!isOpenOptions);
    }

    const onClickOptionHandler = (e) => {
        setIsOpenOptions(false);
        props.onOpenDeposit(e.target.attributes.value.nodeValue);
    }

    const depositDropdownClasses = isOpenOptions
        ? `${classes["deposit-pop-otr"]} ${classes["deposit-pop-open"]}` : classes["deposit-pop-otr"];

    return (
        <div className={classes["deposit-nav-main"]}>
            <button className="btn-primary-1 heading-SB" onClick={onClickHandler}> Deposit </button>
            <div className={depositDropdownClasses}>
                <ul className="deposit-ul">
                    <li className={classes["deposit-li"]}>
                        <img className={classes.img} src="/assets/img/perfect-money-icon.png" alt="perfectmoney" style={{ padding: "6px 0" }} />
                        <Link className={`${classes["link-deposit"]} heading-SB`} onClick={onClickOptionHandler} value="PerfectMoney"> Perfect Money </Link>
                    </li>
                    <li className={classes["deposit-li"]}>
                        <img className={classes.img} src="/assets/img/perfect-money-icon.png" alt="perfectmoney" style={{ padding: "6px 0" }} />
                        <Link className={`${classes["link-deposit"]} heading-SB`} onClick={onClickOptionHandler} value="PerfectMoneyVoucher"> Perfect Money Voucher </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default DepositOptions;