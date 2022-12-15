import { useContext } from "react";
import AuthContext from "../../store/authContext";

export const GetUserHeaders = () => {
    const authCtx = useContext(AuthContext);
    
    // console.log(user);
    return { headers: { authorization: authCtx.authToken } };
};