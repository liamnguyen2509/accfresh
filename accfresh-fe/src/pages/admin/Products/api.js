import axios from "axios";
import { GetAdminHeaders } from '../../helpers';

export const GetProducts = () => axios.get(`${process.env.REACT_APP_API_URL}/product`);
export const CreateProduct = (product) => axios.post(`${process.env.REACT_APP_API_URL}/product`, product, GetAdminHeaders());
export const EditProduct = (product) => axios.put(`${process.env.REACT_APP_API_URL}/product`, product, GetAdminHeaders());
export const RemoveProduct = (productId) => axios.post(`${process.env.REACT_APP_API_URL}/product/delete`, { productId }, GetAdminHeaders());