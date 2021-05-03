import { createStore, combineReducers } from "redux";
import tokenReducer from "./services/reducers";

//3. after simple reducers
const reducers = combineReducers({
  token: tokenReducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
