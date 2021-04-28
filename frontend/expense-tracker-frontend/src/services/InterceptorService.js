import axios from "axios";
import { createSelector } from "reselect";
import store from "store";
import { makeSelectTokens } from "./selectors";
import { useSelector, useDispatch } from "react-redux";

const stateSelector = createSelector(makeSelectTokens, (token) => ({ token }));

const BASE_URL = "http://localhost:8080/api/v1/expense-tracker";

//axios interceptor에서는 function component가 안되는듯보임.

export const AxiosRedux = () => {
  const { token } = useSelector(stateSelector);
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // const jwtToken = localStorage.getItem("user");
  // const jwtToken = store.get("user");

  axiosInstance.interceptors.request.use(
    (request) => {
      if (token) {
        console.log(token);
        request.headers["Authorization"] = "Bearer " + token;
        console.log(request);
      }
      return request;
    },
    // (request) => {
    //   if (jwtToken) {
    //     console.log(jwtToken);
    //     request.headers["Authorization"] =
    //       "Bearer " +
    //       "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraW1zaHk1ODQwQG5hdmVyLmNvbSIsImV4cCI6MTYxOTY1NzMyNSwiaWF0IjoxNjE5NjIxMzI1fQ.yhaA_55ynuzJ1vYJyyKbQNDTvuUEzElYzhNu-pZMUvc";

    //     console.log(request);
    //   }
    //   return request;
    // },
    (error) => {
      if (!error.response) {
        return Promise.reject(error);
      }

      if (error.response.status === 403) {
        localStorage.removeItem("user");
        // window.location = "/auth/login";
      }

      if (error.response.status == 401) {
        localStorage.removeItem("users");
      }
    }
  );
}

// export default axiosInstance;
