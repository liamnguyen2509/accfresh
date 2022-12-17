import { lazy } from "react";

const home = {
    path: "/",
    name: "Home",
    exact: true,
    public: true,
    order: 1,
    component: lazy(() => import("."))
}

export default home;