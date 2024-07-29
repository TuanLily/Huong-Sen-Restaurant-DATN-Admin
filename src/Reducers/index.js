import { combineReducers } from "redux";
import customerReducer from "./CustomerReducers";
import productReducer from "./ProductReducers";
import productCategoryReducer from "./ProductCategoryDeducers";

const rootReducer = combineReducers({
    customer: customerReducer,
    product: productReducer,
    product_category: productCategoryReducer,
});

export default rootReducer;