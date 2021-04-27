import axios from "axios";

const axiosApiInstance = axios.create();
export const jwtToken = localStorage.getItem("user");

axios.interceptors.request.use(
  (request) => {
    if (jwtToken) {
      console.log(jwtToken);
      request.headers["Authorization"] = "Bearer " + jwtToken;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
