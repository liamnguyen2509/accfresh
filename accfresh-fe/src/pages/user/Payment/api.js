import axios from "axios";

export const GetPayments = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/payment/byUser`, { userId });

export const GetPayment = (userId, paymentId) => { return axios.post(`${process.env.REACT_APP_API_URL}/payment/byCode`, { userId, paymentId }); }

export const GetLastedPayment = () => axios.get(`${process.env.REACT_APP_API_URL}/payment/lasted`);

export const GetPaymentStatus = (paymentId) => axios.get(`${process.env.REACT_APP_API_URL}/payment/${paymentId}/status`);
