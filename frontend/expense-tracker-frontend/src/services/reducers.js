import { ActionTypes } from "./constants";

const initialState = {
  token: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
