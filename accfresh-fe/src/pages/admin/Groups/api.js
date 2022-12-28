import axios from "axios";
import { GetAdminHeaders } from '../../helpers';

export const GetGroups = () => axios.get(`${process.env.REACT_APP_API_URL}/group`);
export const CreateGroup = (group) => axios.post(`${process.env.REACT_APP_API_URL}/group`, group, GetAdminHeaders());
export const EditGroup = (group) => axios.put(`${process.env.REACT_APP_API_URL}/group`, group, GetAdminHeaders());
export const RemoveGroup = (groupId) => axios.post(`${process.env.REACT_APP_API_URL}/group/delete`, { groupId }, GetAdminHeaders());