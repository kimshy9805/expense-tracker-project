import { createStore, combineReducers } from "redux";
import homePageReducer from "./containers/HomePage/reducers";

//after simple reducers
const reducers = combineReducers({
  homePage: homePageReducer,
});

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
