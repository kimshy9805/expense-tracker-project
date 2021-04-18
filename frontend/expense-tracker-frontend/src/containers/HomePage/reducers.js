import { ActionTypes } from "./constants";

//1. start with initial state
const defaultState = {
  expenses: [],
};

//2. make actual reducer with two arguments (state and action)
//always use switch
/**
 * @param {{ type: any; payload: any; }} action
 */
export default function homePageReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_EXPENSES:
      //here action.payload는 users인데 state를 copy하고 ...state -> 그 안에 users: action.payload형식으로.
      //users = action.payload action을 받는다.
      return { ...state, expenses: action.payload };
    case ActionTypes.SET_PRODUCT:
      return { ...state, product: action.payload };
    case ActionTypes.ADJUST_QTY:
      return {};
    default:
      return state;
  }
}
