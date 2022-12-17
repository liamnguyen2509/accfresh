import { lazy } from "react";

const adminPayment = {
    path: "/admin/payments",
    name: "Payments",
    exact: true,
    public: true,
    admin: true,
    component: lazy(() => import("."))
}

export default adminPayment;