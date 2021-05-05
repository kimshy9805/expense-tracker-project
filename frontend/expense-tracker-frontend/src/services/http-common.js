import Axios from "axios";

export default Axios.create({
  baseURL: "http://localhost:8080/api/v1/expense-tracker",
  headers: {
    "Content-type": "application/json",
  },
});
