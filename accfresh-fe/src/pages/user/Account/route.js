import { lazy } from "react";

const accounts = {
    path: "/accounts",
    name: "Account",
    exact: true,
    public: false,
    component: lazy(() => import("."))
}

export default accounts;