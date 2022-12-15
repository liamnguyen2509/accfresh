import axios from "axios";

export const AuthenticateUser = (email, password) => {
    const url = `${process.env.REACT_APP_API_URL}/user/authenticate`;
    return axios.post(url, { email, password });
}
