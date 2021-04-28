import { ActionTypes } from "./constants";

// 4. define what actions will be used

export const setToken = (token) => ({
  type: ActionTypes.SET_TOKEN,
  payload: token,
});
