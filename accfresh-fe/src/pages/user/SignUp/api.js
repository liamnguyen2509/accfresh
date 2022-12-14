import axios from "axios";

export const RegisterUser = (user) => {
    const url = `${process.env.REACT_APP_API_URL}/user/signup`;
    return axios.post(url, user);
}
