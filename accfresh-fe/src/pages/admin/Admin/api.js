import axios from "axios";

export const GetInfo = (email) => axios.post(`${process.env.REACT_APP_API_URL}/admin`, { email });
export const UpdateBank = (name, account) => axios.post(`${process.env.REACT_APP_API_URL}/admin/bank`, { name, account });
