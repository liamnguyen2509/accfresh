import axios from "axios";
import { GetUserHeaders } from "../../helpers";

export const GetPayments = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/payment/byUser`, { userId }, GetUserHeaders());

export const GetPayment = (userId, paymentId) => { return axios.post(`${process.env.REACT_APP_API_URL}/payment/byCode`, { userId, paymentId }); }

export const GetLastedPayment = () => axios.get(`${process.env.REACT_APP_API_URL}/payment/lasted`);

