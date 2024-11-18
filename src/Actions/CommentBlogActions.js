// Action Types
export const FETCH_COMMENTBLOG_REQUEST = 'FETCH_COMMENTBLOG_REQUEST';
export const FETCH_COMMENTBLOG_SUCCESS = 'FETCH_COMMENTBLOG_SUCCESS';
export const FETCH_COMMENTBLOG_FAILURE = 'FETCH_COMMENTBLOG_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';
import http from "../Utils/Http";

// Action Creators
// Action Creators
export const fetchCommentBlogRequest = () => ({
    type: FETCH_COMMENTBLOG_REQUEST
});

export const fetchCommentBlogSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_COMMENTBLOG_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchCommentBlogFailure = (error) => ({
    type: FETCH_COMMENTBLOG_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});


export const fetchCommentBlog = (blog_id, page = 1, pageSize = 10) => {
    return (dispatch) => {
        // Dispatch action yêu cầu dữ liệu
        dispatch(fetchCommentBlogRequest());

        // Tạo URL cho API với các tham số phân trang và blog_id
        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.commentBlog}/blog/${blog_id}`);
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        // Gọi API
        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;

                // Dispatch action để cập nhật dữ liệu vào state
                dispatch(fetchCommentBlogSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                // Lỗi trong khi gọi API
                const errorMsg = error.response?.data?.message || error.message;
                dispatch(fetchCommentBlogFailure(errorMsg));
            });
    };
};





// Add comment
export const addCommentBlog = (commentblog) => {
    return dispatch => {
        dispatch(fetchCommentBlogRequest());
        http.post(`${API_ENDPOINT}/${AdminConfig.routes.commentBlog}`, commentblog)
            .then((response) => {
                dispatch(fetchCommentBlogSuccess(response.data.data));
                dispatch(fetchCommentBlog(commentblog.blog_id)); // Refresh the comment list
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCommentBlogFailure(errorMsg));
            });
    };
};

// Update comment
export const updateCommentBlog = (id, data) => {
    return dispatch => {
        dispatch(fetchCommentBlogRequest());
        http.patch(`${API_ENDPOINT}/${AdminConfig.routes.commentBlog}/${id}`, data)
            .then(() => {
                dispatch(fetchCommentBlog(data.blog_id)); // Refresh comment list
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || error.message;
                dispatch(fetchCommentBlogFailure(errorMsg));
            });
    };
};

// Delete comment
export const deleteCommentBlog = (id, blogId) => {
    return dispatch => {
        dispatch(fetchCommentBlogRequest()); // Dispatch hành động lấy bình luận
        http.delete(`${API_ENDPOINT}/${AdminConfig.routes.commentBlog}/${id}`)
            .then(() => {
                console.log("Check blog id: ", blogId)
                dispatch(fetchCommentBlog(blogId)); // Cập nhật danh sách bình luận
            })
            .catch((error) => {
                const errorMsg = error.response?.data?.message || error.message;
                dispatch(fetchCommentBlogFailure(errorMsg)); // Dispatch thất bại nếu có lỗi
            });
    };
};
