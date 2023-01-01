import { lazy } from "react";

const adminUser = {
    path: "/admin/users",
    name: "Users",
    exact: true,
    public: true,
    admin: true,
    component: lazy(() => import("."))
}

export default adminUser;