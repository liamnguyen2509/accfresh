import React from "react";
import { Link } from "react-router-dom";

import routes from '../../../src/pages/routes';

const Navigation = () => {
    return (
        <div className="navigation-otr">
            <ul className="navigation-inr">
                {
                    routes.map((route, index) => (
                        <li key={index} className={"navigation-li nav-li" + index}>
                            <Link to={route.path} className="nav-a heading-SB "> {route.name} </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Navigation;