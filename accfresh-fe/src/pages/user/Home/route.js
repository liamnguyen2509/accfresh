import { lazy } from "react";

const home = {
    path: "/",
    name: "Home",
    exact: true,
    public: true,
    component: lazy(() => import("."))
}

export default home;