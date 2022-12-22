import { lazy } from "react";

const adminProfile = {
    path: "/admin/profile",
    name: "Profile",
    exact: true,
    public: true,
    admin: true,
    component: lazy(() => import("."))
}

export default adminProfile;