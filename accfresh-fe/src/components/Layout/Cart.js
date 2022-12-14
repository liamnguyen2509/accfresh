import React from "react";

const Cart = () => {
    return (
        <div className="notification-main right-space">
            <div className="icon-notification-otr">
                <i className="ri-shopping-cart-2-line notification-icon"></i>
                <span className="dot"></span>
            </div>
            <div className="notification-drop">
                <div className="Heading-otr">
                    <p className="heading heading-LB">Shopping Cart</p>
                </div>
                <ul className="notification-ul">
                    <li className="notification-li">
                        <a href="#" className="notification-a">
                            <div className="img-otr">
                                <img className="img img-fluid" src="../assets/img/cover-img1.png" alt="artwork" />
                            </div>
                            <div className="content-otr">
                                <p className="name heading-SB">Abstract Art</p>
                                <p className="price heading-S">New bid: 1.21 ETH</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Cart;