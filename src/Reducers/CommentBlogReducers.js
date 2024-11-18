import {
    FETCH_COMMENTBLOG_FAILURE,
    FETCH_COMMENTBLOG_REQUEST,
    FETCH_COMMENTBLOG_SUCCESS,
    SET_CURRENT_PAGE
} from '../Actions/CommentBlogActions';

const initialState = {
    currentPage: 1,
    pageSize: 10,
    allCommentBlogs: [],
    loading: false,
    commentBlog: [],
    error: '',
    totalCount: 0,
    totalPages: 0
};

const commentBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTBLOG_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FETCH_COMMENTBLOG_SUCCESS:
            const { results, totalCount, totalPages, currentPage } = action.payload;

            // Kiểm tra xem results có phải là mảng không trước khi gọi slice
            const commentBlogs = Array.isArray(results) ? results : [];

            return {
                ...state,
                loading: false,
                allCommentBlogs: commentBlogs, // Lưu tất cả các bình luận
                totalCount: totalCount,         // Tổng số bình luận
                totalPages: totalPages,         // Tổng số trang
                currentPage: currentPage,       // Trang hiện tại
                commentBlog: commentBlogs.slice(0, state.pageSize), // Dữ liệu cho trang hiện tại
            };

        case FETCH_COMMENTBLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case SET_CURRENT_PAGE:
            const start = (action.payload - 1) * state.pageSize;
            const end = start + state.pageSize;
            return {
                ...state,
                currentPage: action.payload,
                commentBlog: state.allCommentBlogs.slice(start, end), // Dữ liệu của trang hiện tại
            };

        default:
            return state;
    }
};

export default commentBlogReducer;
