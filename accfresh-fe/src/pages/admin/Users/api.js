import axios from "axios";
import { GetUserHeaders, GetAdminHeaders } from "../../helpers";

export const GetUsers = (search, page, pageSize) => axios.get(`${process.env.REACT_APP_API_URL}/user?search=${search}&page=${page}&pageSize=${pageSize}`, GetAdminHeaders());