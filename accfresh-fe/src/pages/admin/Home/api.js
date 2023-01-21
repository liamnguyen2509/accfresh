import axios from "axios";
import { GetAdminHeaders } from "../../helpers";

export const GetLastedOrders = () => axios.get(`${process.env.REACT_APP_API_URL}/order?search=&page=1&pageSize=15`, GetAdminHeaders());
export const GetLastedPayments = () => axios.get(`${process.env.REACT_APP_API_URL}/payment?search=&page=1&pageSize=15`, GetAdminHeaders());
export const GetDangerousUsers = () => axios.get(`${process.env.REACT_APP_API_URL}/user/danger`, GetAdminHeaders());
export const GetLastedUsers = () => axios.get(`${process.env.REACT_APP_API_URL}/user?search=&page=1&pageSize=10`, GetAdminHeaders());