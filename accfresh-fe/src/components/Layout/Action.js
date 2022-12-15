import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/authContext";

const Action = () => {
    const context = useContext(AuthContext);

    return (
        <div className="action right-space">
            {!context.isLogged && <Link to={"/login"} className="btn-primary-1 heading-SB"> Login </Link>}
            {context.isLogged && <Link to={"/connect-pm"} className="btn-primary-1 heading-SB"> Connect PM </Link>}
        </div>
    );
}

export default Action;