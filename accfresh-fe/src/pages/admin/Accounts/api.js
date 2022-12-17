import axios from "axios";

export const GetProducts = () => axios.get(`${process.env.REACT_APP_API_URL}/product`);
export const GetAccounts = () => axios.get(`${process.env.REACT_APP_API_URL}/account`);
export const ImportAccounts = (accounts) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/account/import`, accounts);
}