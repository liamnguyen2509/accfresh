import { lazy } from "react";

const contact = {
    path: "/contact",
    name: "Contact",
    exact: true,
    public: true,
    component: lazy(() => import("."))
}

export default contact;