import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/authContext";

const Profile = (props) => {
    const context = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const onClickHandler = () => {
        setIsOpen(!isOpen);
    }

    const profileDropdownClasses = isOpen
        ? "profile-pop-otr profile-pop-open" : "profile-pop-otr";

    return (
        <div className="profile-nav-main">
            <div className="profile-nav" onClick={onClickHandler}>
                <div className="img-otr">
                    <img className="nav-prof-img" src="/assets/img/wallet.png" alt="wallet" />
                </div>
                <p className="desc heading-SB" style={{ color: "green", fontWeight: "bold" }}>{localStorage.getItem("balance")} $</p>
            </div>
            <div className={profileDropdownClasses}>
                <div className="balance-otr">
                    <div className="img-etherem">
                        <img src="/assets/img/balance.png" alt="img" style={{ height: "50px" }} />
                    </div>
                    <div className="balance">
                        <p className="text heading-S">Balance</p>
                        <p className="price heading-L" style={{ color: "green", fontWeight: "bold" }}>{localStorage.getItem("balance")} $</p>
                    </div>
                </div>
                <ul className="link-profile-ul">
                    <li className="link-profile-li">
                        <Link to="/admin/profile" className="link-profile-a heading-SB"> Edit Profile </Link>
                    </li>
                    <li className="link-profile-li">
                        <Link to="/admin" className="link-profile-a heading-SB" onClick={context.onLogout}> Logout </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;