import { lazy } from "react";

const adminAccount = {
    path: "/admin/accounts",
    name: "Accounts",
    exact: true,
    public: true,
    admin: true,
    component: lazy(() => import("."))
}

export default adminAccount;