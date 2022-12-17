import { lazy } from "react";

const orders = {
    path: "/orders",
    name: "Order",
    exact: true,
    public: false,
    component: lazy(() => import("."))
}

export default orders;