import { lazy } from "react";

const paymentsRoutes = {
    path: "/payments",
    name: "Payment",
    exact: true,
    public: false,
    component: lazy(() => import("."))
}

export default paymentsRoutes;