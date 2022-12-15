import { lazy } from "react";

const adminHome = {
    path: "/admin",
    name: "Home",
    exact: true,
    public: false,
    admin: true,
    component: lazy(() => import("."))
}

export default adminHome;