import axios from "axios";

export const SubmitOrder = (order) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/order`, order);
};

