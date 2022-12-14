import React from "react";

const Profile = () => {
    return (
        <div className="profile-nav-main">
            <div className="profile-nav">
                <div className="img-otr">
                    <img className="nav-prof-img" src="../assets/img/avatar-nav.png" alt="Avatar" />
                </div>
                <p className="desc heading-SB">3.756 ETH</p>
            </div>
            <div className="profile-pop-otr">
                <div className="copy-icon-otr">
                    <p className="text heading-SB">13b9ebda035r178...</p>
                    <i className="ri-file-copy-line copy-icon"></i>
                </div>
                <div className="balance-otr">
                    <div className="img-etherem">
                        <img className="etherem" src="../assets/img/ethereum.png" alt="img" />
                    </div>
                    <div className="balance">
                        <p className="text heading-S">Balance</p>
                        <p className="price heading-L">3.756 ETH</p>
                    </div>
                </div>
                <ul className="link-profile-ul">
                    <li className="link-profile-li">
                        <a href="" class="link-profile-a heading-SB">My Item</a>
                    </li>
                    <li className="link-profile-li">
                        <a href="" class="link-profile-a heading-SB">Edit Profile</a>
                    </li>
                    <li className="link-profile-li">
                        <a href="" class="link-profile-a heading-SB">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;