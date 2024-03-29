import { lazy } from "react";

const login = {
    path: "/login",
    name: "Login",
    exact: true,
    public: false,
    component: lazy(() => import("."))
}

export default login;