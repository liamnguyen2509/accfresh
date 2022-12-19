import axios from "axios";

export const GetProductsByGroup = (groupId) => { return axios.post(`${process.env.REACT_APP_API_URL}/product/byGroup`, { groupId }); };
export const GetGroups = () => axios.get(`${process.env.REACT_APP_API_URL}/group`);

