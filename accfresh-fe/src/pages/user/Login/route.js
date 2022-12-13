import { lazy } from "react";

const login = {
    path: "/login",
    name: "Login",
    exact: true,
    public: true,
    component: lazy(() => import("."))
}

export default login;