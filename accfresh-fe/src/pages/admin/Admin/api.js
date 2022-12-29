import axios from "axios";
import { GetAdminHeaders } from '../../helpers';

export const GetInfo = (uid) => axios.post(`${process.env.REACT_APP_API_URL}/admin`, { uid }, GetAdminHeaders());
export const UpdateBank = (uid, name, account) => axios.post(`${process.env.REACT_APP_API_URL}/admin/bank`, { uid, name, account }, GetAdminHeaders());
