import axios from "axios";

export const GetPayments = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/payment/byUser`, { userId });

export const GetPayment = (paymentId) => { return axios.post(`${process.env.REACT_APP_API_URL}/payment/byCode`, { paymentId }); }

export const GetLastedPayment = () => axios.get(`${process.env.REACT_APP_API_URL}/payment/lasted`);

export const GetPaymentStatus = (paymentId) => axios.get(`${process.env.REACT_APP_API_URL}/payment/${paymentId}/status`);