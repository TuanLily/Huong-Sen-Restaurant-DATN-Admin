import {
    FETCH_CATEGORY_BLOG_REQUEST,
    FETCH_CATEGORY_BLOG_SUCCESS,
    FETCH_CATEGORY_BLOG_FAILURE,
    SET_CURRENT_PAGE, // Nếu bạn có hành động SET_CURRENT_PAGE cho pagination
} from '../Actions/BlogsCategoriesActions';

const initialState = {
    loading: false,
    categories: [],
    allCategories: [], // Lưu trữ tất cả các danh mục
    error: '',
    currentPage: 1,
    pageSize: 5,
    totalCount: 0, // Tổng số danh mục blog
    totalPages: 0 // Tổng số trang
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
                allCategories: action.payload.results || [], // Lưu tất cả các danh mục
                totalCount: action.payload.totalCount,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                categories: action.payload.results.slice(0, state.pageSize), // Dữ liệu cho trang hiện tại
            };
        case FETCH_CATEGORY_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                categories: [],
                error: action.payload,
            };
        case SET_CURRENT_PAGE:
            // Tính chỉ mục bắt đầu và kết thúc cho dữ liệu của trang hiện tại
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
