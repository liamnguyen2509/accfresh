import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Deposite from '../../pages/user/Profile/components/DepositForm';

import AuthContext from "../../store/authContext";

const Action = () => {
    const context = useContext(AuthContext);
    const [openDeposit, setOpenDeposit] = useState(false);

    const onClickDepositHandler = () => {
        setOpenDeposit(!openDeposit);
    }

    return (
        <>
            <div className="action right-space">
                {!context.isLogged && <Link to={"/login"} className="btn-primary-1 heading-SB"> Login </Link>}
                {context.isLogged && <button className="btn-primary-1 heading-SB" onClick={onClickDepositHandler} > Deposit </button>}
            </div>
            {openDeposit && <Deposite />}
        </>
    );
}

export default Action;