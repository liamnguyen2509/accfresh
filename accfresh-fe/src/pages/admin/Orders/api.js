import axios from "axios";
import { GetUserHeaders, GetAdminHeaders } from "../../helpers";

export const GetOrders = (search, page, pageSize) => axios.get(`${process.env.REACT_APP_API_URL}/order?search=${search}&page=${page}&pageSize=${pageSize}`, GetAdminHeaders());
export const GetAccountsByOrder = (orderDetailId) => axios.post(`${process.env.REACT_APP_API_URL}/account/byOrder`, {orderDetailId}, GetUserHeaders());