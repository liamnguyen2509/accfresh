import axios from "axios";
import { GetUserHeaders, GetAdminHeaders } from "../../helpers";

export const GetUsers = (search, page, pageSize) => axios.get(`${process.env.REACT_APP_API_URL}/user?search=${search}&page=${page}&pageSize=${pageSize}`, GetAdminHeaders());
export const GetUser = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/user/byId`, { userId }, GetAdminHeaders());
export const GetUserOrders = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/order/byUser`, { userId, limit: 10 }, GetUserHeaders());
export const GetUserPayments = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/payment/byUser`, { userId, limit: 15 }, GetUserHeaders());
export const RemoveUser = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/user/delete`, { userId }, GetAdminHeaders());
export const UpdateBalance = (userId, balance) => axios.put(`${process.env.REACT_APP_API_URL}/user/balance`, { userId, balance }, GetAdminHeaders());
export const UpdatePassword = (userId, password) => axios.put(`${process.env.REACT_APP_API_URL}/user/password`, { userId, password }, GetAdminHeaders());