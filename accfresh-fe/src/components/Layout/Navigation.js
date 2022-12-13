import React from "react";

const Navigation = () => {
    const pages = ["Home", "Contact", "Sing Up"];

    return (
        <div className="navigation-otr">
            <ul className="navigation-inr">
                {
                    pages.map((page, index) => (
                        <li key={index} className={"navigation-li nav-li" + index}>
                            <p className="nav-a heading-SB">{page}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Navigation;