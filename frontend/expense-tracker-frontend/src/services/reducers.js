import { ActionTypes } from "./constants";

const initialState = {
  token: "",
  account: { email: "", password: "" },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case ActionTypes.SET_ACCOUNT:
      return { ...state, account: action.payload };
    default:
      return state;
  }
}
