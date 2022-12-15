import { lazy } from "react";

const adminOrder = {
    path: "/admin/orders",
    name: "Orders",
    exact: true,
    public: true,
    admin: true,
    component: lazy(() => import("."))
}

export default adminOrder;