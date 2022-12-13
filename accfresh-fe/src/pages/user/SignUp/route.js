import { lazy } from "react";

const signUp = {
    path: "/sign-up",
    name: "Sign Up",
    exact: true,
    public: true,
    component: lazy(() => import("."))
}

export default signUp;