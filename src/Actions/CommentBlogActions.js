export const FETCH_COMMENTBLOG_REQUEST = 'FETCH_COMMENTBLOG_REQUEST';
export const FETCH_COMMENTBLOG_SUCCESS = 'FETCH_COMMENTBLOG_SUCCESS';
export const FETCH_COMMENTBLOG_FAILURE = 'FETCH_COMMENTBLOG_FAILURE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';
import http from "../Utils/Http";

// Action Creators
export const fetchCommentBlogRequest = () => ({
    type: FETCH_COMMENTBLOG_REQUEST
});

export const fetchCommentBlogSuccess = (results) => ({
    type: FETCH_COMMENTBLOG_SUCCESS,
    payload: {
        results,
    }
});

export const fetchCommentBlogFailure = error => ({
    type: FETCH_COMMENTBLOG_FAILURE,
    payload: error
});

// Fetch comments by blog_id
export const fetchCommentBlog = (blog_id) => async (dispatch) => {
    console.log("Fetching comments");
    dispatch(fetchCommentBlogRequest());
    try {
        const response = await http.get(`${API_ENDPOINT}/${AdminConfig.routes.commentBlog}/blog/${blog_id}`);

        console.log('API Response:', response.data); // Log dữ liệu từ API
        const { results } = response.data;
        dispatch(fetchCommentBlogSuccess(results));
    } catch (error) {
        console.error('Error fetching comments:', error);
        const errorMsg = error.response?.data?.message || error.message;
        dispatch(fetchCommentBlogFailure(errorMsg));
    }
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
