import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenReducer from "./reducers";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["token"],
};

//3. after simple reducers
const rootReducer = combineReducers({
    token: tokenReducer,
});

export default persistReducer(persistConfig, rootReducer);
