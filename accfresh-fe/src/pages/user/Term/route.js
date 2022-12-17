import { lazy } from "react";

const terms = {
    path: "/terms",
    name: "Terms",
    exact: true,
    public: true,
    order: 2,
    component: lazy(() => import("."))
}

export default terms;