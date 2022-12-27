export const GetUserHeaders = (extra = {}) => {
    return { headers: { authorization: localStorage.getItem("authToken"), ...extra } };
  };
  