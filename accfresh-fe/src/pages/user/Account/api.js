import axios from "axios";
import { GetUserHeaders } from "../../helpers";

export const GetAccounts = (userId) => axios.post(`${process.env.REACT_APP_API_URL}/account/byUser`, {userId}, GetUserHeaders());