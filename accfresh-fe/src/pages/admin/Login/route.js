import { lazy } from "react";

const adminLogin = {
    path: "/admin/login",
    name: "Login",
    exact: true,
    public: true,
    admin: true,
    component: lazy(() => import("."))
}

export default adminLogin;