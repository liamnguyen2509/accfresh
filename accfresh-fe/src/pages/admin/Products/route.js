import { lazy } from "react";

const adminProduct = {
    path: "/admin/groups",
    name: "Groups",
    exact: true,
    public: true,
    admin: true,
    component: lazy(() => import("."))
}

export default adminProduct;