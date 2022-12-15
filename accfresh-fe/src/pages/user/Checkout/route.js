import { lazy } from "react";

const login = {
    path: "/checkout",
    name: "Checkout",
    exact: true,
    public: false,
    component: lazy(() => import("."))
}

export default login;