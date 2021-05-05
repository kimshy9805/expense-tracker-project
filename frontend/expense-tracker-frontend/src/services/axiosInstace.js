import axios from "axios";
import store from "./store";

// import { createSelector } from "reselect";
// import store from "store";
// import { makeSelectTokens } from "./selectors";
// import { useSelector, useDispatch } from "react-redux";

// const stateSelector = createSelector(makeSelectTokens, (token) => ({
//   token,
// }));

// const { token } = useSelector(stateSelector);

const BASE_URL = "http://localhost:8080/api/v1/expense-tracker";

let token = JSON.parse(localStorage.getItem("auth"));
const state = store.getState();
console.log(state);
// //use this instance.
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

axiosInstance.interceptors.request.use(
  (request) => {
    if (token) {
      request.headers["Authorization"] =
        "Bearer " +
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraW1zaHk1ODQwQG5hdmVyLmNvbSIsImV4cCI6MTYxOTc0Mzc4NiwiaWF0IjoxNjE5NzA3Nzg2fQ.Z5NZo6mYnZlIoZrUtpljPKiplLcFrZxdYwlP4SjH7O4";
    }
    return request;
  },
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

export default axiosInstance;

// // (request) => {
// //   if (jwtToken) {
// //     console.log(jwtToken);
// //     request.headers["Authorization"] =
// //       "Bearer " +
// //       "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraW1zaHk1ODQwQG5hdmVyLmNvbSIsImV4cCI6MTYxOTY1NzMyNSwiaWF0IjoxNjE5NjIxMzI1fQ.yhaA_55ynuzJ1vYJyyKbQNDTvuUEzElYzhNu-pZMUvc";

// //     console.log(request);
// //   }
// //   return request;
// // },

// // export default axiosInstance;
