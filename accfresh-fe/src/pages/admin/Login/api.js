import axios from "axios";

export const AuthenticateAdmin = (email, password) => {
    const url = `${process.env.REACT_APP_API_URL}/admin/authenticate`;
    return axios.post(url, { email, password });
}
