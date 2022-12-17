import { lazy } from "react";

const signUp = {
    path: "/sign-up",
    name: "SignUp",
    exact: true,
    public: true,
    component: lazy(() => import("."))
}

export default signUp;