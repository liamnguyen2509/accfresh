import axios from "axios";
import { GetUserHeaders, GetAdminHeaders } from "../../helpers";

export const GetProducts = () => axios.get(`${process.env.REACT_APP_API_URL}/product`);
export const GetAccounts = (search, page, pageSize) => axios.get(`${process.env.REACT_APP_API_URL}/account?search=${search}&page=${page}&pageSize=${pageSize}`, GetAdminHeaders());
export const ImportAccounts = (accounts) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/account/import`, accounts, GetAdminHeaders());
}
export const RemoveAccount = (accountId) => axios.post(`${process.env.REACT_APP_API_URL}/account/delete`, { accountId }, GetAdminHeaders());