import { createSelector } from "reselect";

//reducer를 받는듯?
//왜냐면 selector 결국엔 어떤 reducer 를쓸껀지 고르는거니깐

const tokenState = (state) => state.token;

export const makeSelectTokens = createSelector(
  tokenState,
  //token -> reducer. 
  (token) => token.token
);
