import axios from "axios";

export const GetOrders = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/order/byUser`, {userId});
export const GetAccountsByOrder = (orderDetailId) => axios.post(`${process.env.REACT_APP_API_URL}/account/byOrder`, {orderDetailId});