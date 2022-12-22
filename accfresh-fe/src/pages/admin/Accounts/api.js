import axios from "axios";

export const GetProducts = () => axios.get(`${process.env.REACT_APP_API_URL}/product`);
export const GetAccounts = (query, page) => axios.get(`${process.env.REACT_APP_API_URL}/account?query=${query}&page=${page}`);
export const ImportAccounts = (accounts) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/account/import`, accounts);
}