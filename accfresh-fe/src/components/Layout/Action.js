import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Deposite from '../../pages/user/Profile/components/DepositForm';
import DepositOptions from "./DepositOptions";

import AuthContext from "../../store/authContext";

const Action = () => {
    const context = useContext(AuthContext);
    const [openDeposit, setOpenDeposit] = useState(false);
    const [depositOption, setDepositOption] = useState("PM");

    const onClickDepositHandler = (option) => {
        setOpenDeposit(true);
        setDepositOption(option);
    }

    const onCloseModalHandler = () => {
        setOpenDeposit(false);
    }

    return (
        <>
            <div className="action right-space">
                {!context.isLogged && <Link to={"/login"} className="btn-primary-1 heading-SB"> Login </Link>}
                {context.isLogged && <DepositOptions onOpenDeposit={onClickDepositHandler}/>}
            </div>
            {openDeposit && <Deposite option={depositOption} onCloseModal={onCloseModalHandler} />}
        </>
    );
}

export default Action;