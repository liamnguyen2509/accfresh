import axios from "axios";
import { GetAdminHeaders } from "../../helpers";

export const GetPayments = (search, page, pageSize) => axios.get(`${process.env.REACT_APP_API_URL}/payment?search=${search}&page=${page}&pageSize=${pageSize}`, GetAdminHeaders());
export const RemovePayment = (paymentId) => axios.post(`${process.env.REACT_APP_API_URL}/payment/delete`, { paymentId }, GetAdminHeaders());