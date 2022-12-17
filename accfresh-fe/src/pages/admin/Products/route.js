import { lazy } from "react";

const adminProduct = {
    path: "/admin/products",
    name: "Products",
    exact: true,
    public: true,
    admin: true,
    component: lazy(() => import("."))
}

export default adminProduct;