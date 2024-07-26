import { combineReducers } from "redux";
import customerReducer from "./CustomerReducers";

const rootReducer = combineReducers({
    customer: customerReducer,
});

export default rootReducer;