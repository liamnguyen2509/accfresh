import axios from "axios";

export const GetPayments = () => axios.get(`${process.env.REACT_APP_API_URL}/payment`);