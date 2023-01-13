import axios from "axios";
import { GetUserHeaders } from "../../helpers";

export const SubmitOrder = (order) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/order`, order, GetUserHeaders());
};

