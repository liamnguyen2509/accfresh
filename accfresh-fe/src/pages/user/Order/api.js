import axios from "axios";
import { GetUserHeaders } from "../../helpers";

export const GetOrders = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/order/byUser`, {userId}, GetUserHeaders());
export const GetAccountsByOrder = (orderDetailId) => axios.post(`${process.env.REACT_APP_API_URL}/account/byOrder`, {orderDetailId}, GetUserHeaders());