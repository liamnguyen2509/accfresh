import axios from "axios";

export const GetOrders = () => axios.get(`${process.env.REACT_APP_API_URL}/order`);