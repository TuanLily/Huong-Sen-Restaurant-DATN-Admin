import {
    FETCH_BLOG_FAILURE,
    FETCH_BLOG_REQUEST,
    FETCH_BLOG_SUCCESS,
    SET_CURRENT_PAGE
} from '../Actions/BlogActions';

const initialState = {
    allBlogs: [],
    blog: [],
    currentPage: 1,
    pageSize: 5,
    loading: false,
    error: '',
    totalCount: 0, // Tổng số khách hàng
    totalPages: 0 // Tổng số trang
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                allBlogs: action.payload.results,
                totalCount: action.payload.totalCount,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                // Correctly apply slice to the results array
                blog: action.payload.results.slice(0, state.pageSize),
                error: ''
            };
        case FETCH_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                blog: [],
                allBlogs: [],
                error: action.payload
            };
        case SET_CURRENT_PAGE:
            const start = (action.payload - 1) * state.pageSize;
            const end = start + state.pageSize;
            return {
                ...state,
                currentPage: action.payload,
                blog: state.allBlogs.slice(start, end)
            };
        default:
            return state;
    }
};

export default blogReducer;
