import { lazy } from "react";

const profile = {
    path: "/profile",
    name: "Profile",
    exact: true,
    public: false,
    component: lazy(() => import("."))
}

export default profile;