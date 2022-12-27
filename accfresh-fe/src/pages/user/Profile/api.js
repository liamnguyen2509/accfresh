import axios from "axios";
import { GetUserHeaders } from "../../helpers";

export const GetReceiver = () => axios.get(`${process.env.REACT_APP_API_URL}/payment/receiver`);

export const GetRate = (send, sendCurrency, receive, receiveCurrency, amount) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/payment/rate`, 
    { 
        send, sendCurrency, receive, receiveCurrency, amount, amountOf: "send", fromAmount: "" 
    });
}

export const SendDeposit = (request) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/payment/deposit`, request);
}

export const TransferEvoucher = (request) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/payment/transferevoucher`, request);
}

export const GetBalance = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/user/balance`, { userId }, GetUserHeaders());
