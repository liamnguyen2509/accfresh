import React, { useContext } from "react";
import { Link } from "react-router-dom";

import routes from '../../pages/routes';
import AuthContext from "../../store/authContext";

const AdminNavigation = () => {
    const context = useContext(AuthContext);

    return (
        <div className="navigation-otr">
            <ul className="navigation-inr">
                {
                    routes.filter(route => route.public === true && route.admin === true).map((route, index) => { 
                        if (route.name === "Login") {
                            if (!context.isLogged) {
                                return (
                                    <li key={index} className={"navigation-li nav-li" + index}>
                                        <Link to={route.path} className="nav-a heading-SB "> {route.name} </Link>
                                    </li>
                                );
                            }
                        } else {
                            return (
                                <li key={index} className={"navigation-li nav-li" + index}>
                                    <Link to={route.path} className="nav-a heading-SB "> {route.name} </Link>
                                </li>
                            );
                        }
                        return true;
                    })
                }
            </ul>
        </div>
    );
}

export default AdminNavigation;