import { combineReducers } from "redux";
import customerReducer from "./CustomerReducers";
import productReducer from "./ProductReducers";
import productCategoryReducer from "./ProductCategoryDeducers";
import roleReducer from "./RoleReducers";
import permissionsReducer from "./PermissionsReducers";
import blogsCategoriesReducer from "./BlogsCategoriesReducers";
import blogReducer from "./BlogReducers";
import promotionReducer from "./PromotionsReducers";


const rootReducer = combineReducers({
    customer: customerReducer,
    product: productReducer,
    product_category: productCategoryReducer,
    customer: customerReducer,
    role: roleReducer,
    customer: customerReducer,
    permissions: permissionsReducer,
    customer: customerReducer,
    categories: blogsCategoriesReducer,
    customer: customerReducer,
    blog: blogReducer,
    promotion: promotionReducer
});

export default rootReducer;