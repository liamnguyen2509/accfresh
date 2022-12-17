import { lazy } from "react";

const contact = {
    path: "/contact",
    name: "Contact",
    exact: true,
    public: true,
    order: 3,
    component: lazy(() => import("."))
}

export default contact;