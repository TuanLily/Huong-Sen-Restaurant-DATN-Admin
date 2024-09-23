import { combineReducers } from "redux";
import customerReducer from "./CustomerReducers";
import productReducer from "./ProductReducers";
import productCategoryReducer from "./ProductCategoryDeducers";
import roleReducer from "./RoleReducers";
import permissionsReducer from "./PermissionsReducers";
import blogsCategoriesReducer from "./BlogsCategoriesReducers";
import blogReducer from "./BlogReducers";
import promotionReducer from "./PromotionsReducers";
import employeeReducer from "./EmployeeReducers";
import tablesReducer from "./TablesReducers";
import authReducer from "./AuthReducers";
import commentBlogReducer from "./CommentBlogReducers";
import userReducer from "./UserReducers";
import UserChatsReducer from "./UserChatsReducer";
import getQuyenHanReducer from "./GetQuyenHanReducers";
import RolePermissionsReducer from "./RolePermissionsReducers";
import Reservations_t_AdminReducer from "./Reservations_t_AdminReducers";

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
    promotion: promotionReducer,
    employee: employeeReducer,
    tables: tablesReducer,
    auth: authReducer,
    commentBlog: commentBlogReducer,
    users: userReducer,
    userChats: UserChatsReducer,
    getQuyenHan: getQuyenHanReducer,
    rolePermissions: RolePermissionsReducer,
    reservations_Admin: Reservations_t_AdminReducer
});

export default rootReducer;