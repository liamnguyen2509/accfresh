import axios from "axios";

export const GetProducts = () => axios.get(`${process.env.REACT_APP_API_URL}/product`);
export const GetGroups = () => axios.get(`${process.env.REACT_APP_API_URL}/group`);

