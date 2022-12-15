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
                <p className="desc heading-SB">0 $</p>
            </div>
            <div className={profileDropdownClasses}>
                <div className="copy-icon-otr">
                    <p className="text heading-SB">13b9ebda035r178...</p>
                    <i className="ri-file-copy-line copy-icon"></i>
                </div>
                <div className="balance-otr">
                    <div className="img-etherem">
                        <img src="/assets/img/perfect-money.png" alt="img" style={{ height: "50px" }} />
                    </div>
                    <div className="balance">
                        <p className="text heading-S">Balance</p>
                        <p className="price heading-L">0 $</p>
                    </div>
                </div>
                <ul className="link-profile-ul">
                    <li className="link-profile-li">
                        <Link to="/order-history" className="link-profile-a heading-SB"> My Orders </Link>
                    </li>
                    <li className="link-profile-li">
                        <Link to="/profile" className="link-profile-a heading-SB"> Edit Profile </Link>
                    </li>
                    <li className="link-profile-li">
                        <Link to="/" className="link-profile-a heading-SB" onClick={context.onLogout}> Logout </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;