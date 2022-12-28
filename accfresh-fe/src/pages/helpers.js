import axios from "axios";

export const GetUserHeaders = (extra = {}) => {
    return { headers: { authorization: localStorage.getItem("authToken"), ...extra } };
};

export const GetAdminHeaders = (extra = {}) => {
    let adminToken = "";
    if (localStorage.getItem("isAdmin") === "1") adminToken = localStorage.getItem("authToken");
    return { headers: { authorization: adminToken, ...extra } };
};

export const GetS3SignedRequest = (file) => axios.get(`${process.env.REACT_APP_API_URL}/aws/sign-s3?file-name=${file.name}&file-type=${file.type}`, GetAdminHeaders());
export const UploadToS3 = (file, URL) => axios.put(URL, file, { headers: { 'Content-Type': `${file.type}` } });