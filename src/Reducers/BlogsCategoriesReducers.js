import {
    FETCH_CATEGORY_BLOG_REQUEST,
    FETCH_CATEGORY_BLOG_SUCCESS,
    FETCH_CATEGORY_BLOG_FAILURE,
    SET_CURRENT_PAGE, // Nếu bạn có hành động SET_CURRENT_PAGE cho pagination
} from '../Actions/BlogsCategoriesActions';

const initialState = {
    loading: false,
    categories: [],
    allCategories: [], // Nếu cần lưu trữ tất cả các danh mục
    error: '',
    currentPage: 1,
    pageSize: 5,
};

const blogsCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
            };
        case FETCH_CATEGORY_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                allCategories: action.payload || [], // Lưu tất cả các danh mục
                error: '',
                categories: (action.payload || []).slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize),
            };
        case FETCH_CATEGORY_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                categories: [],
                error: action.payload,
            };
        case SET_CURRENT_PAGE:
            const start = (action.payload - 1) * state.pageSize;
            const end = start + state.pageSize;
            return {
                ...state,
                currentPage: action.payload,
                categories: state.allCategories.slice(start, end), // Chia dữ liệu cho trang hiện tại
            };
        default:
            return state;
    }
};

export default blogsCategoriesReducer;
