import axios from "axios";

export const GetAccounts = () => axios.get(`${process.env.REACT_APP_API_URL}/account`);