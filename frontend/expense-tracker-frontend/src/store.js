import { createStore, combineReducers } from "redux";
import homePageReducer from "./containers/HomePage/reducers";
import tokenReducer from "./services/reducers";

//3. after simple reducers
const reducers = combineReducers({
  homePage: homePageReducer,
  token: tokenReducer,
});

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
