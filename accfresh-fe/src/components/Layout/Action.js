import React from "react";
import { Link } from "react-router-dom";

const Action = () => {
    return (
        <div className="action">
            <Link to={"/login"} className="btn-primary-1 heading-SB right-space"> Login </Link>
            <a href="./Pages/Connect-Wallet.html" className="btn-primary-2 heading-SB btn-wallet">Connect PM</a>
        </div>
    );
}

export default Action;