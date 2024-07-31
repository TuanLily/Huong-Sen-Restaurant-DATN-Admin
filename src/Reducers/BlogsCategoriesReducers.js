import {
    FETCH_CATEGORY_BLOG_REQUEST,
    FETCH_CATEGORY_BLOG_SUCCESS,
    FETCH_CATEGORY_BLOG_FAILURE
} from '../Actions/BlogsCategoriesActions';

const initialState = {
    loading: false,
    categories: [], // Đổi tên từ `customer` thành `categories`S
    error: ''
};

const blogsCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_CATEGORY_BLOG_SUCCESS:
            return {
                loading: false,
                categories: Array.isArray(action.payload) ? action.payload : [], // Đổi tên từ `customer` thành `categories`
                error: ''
            };
        case FETCH_CATEGORY_BLOG_FAILURE:
            return {
                loading: false,
                categories: [], // Đổi tên từ `customer` thành `categories`
                error: action.payload
            };
        default:
            return state;
    }
};

export default blogsCategoriesReducer;
