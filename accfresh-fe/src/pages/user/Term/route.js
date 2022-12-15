import { lazy } from "react";

const terms = {
    path: "/terms",
    name: "Terms",
    exact: true,
    public: true,
    component: lazy(() => import("."))
}

export default terms;