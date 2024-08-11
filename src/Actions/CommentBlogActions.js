import axios from "axios";

export const FETCH_COMMENTBLOG_REQUEST = 'FETCH_COMMENTBLOG_REQUEST';
export const FETCH_COMMENTBLOG_SUCCESS = 'FETCH_COMMENTBLOG_SUCCESS';
export const FETCH_COMMENTBLOG_FAILURE = 'FETCH_COMMENTBLOG_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

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

export const fetchCommentBlogFailure = error => ({
    type: FETCH_COMMENTBLOG_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchCommentBlog = (content = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchCommentBlogRequest());

        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.CommentBlog}`);
        
        if (content) {
            url.searchParams.append('search', content);
        }
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        axios.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;
                dispatch(fetchCommentBlogSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || error.message;
                dispatch(fetchCommentBlogFailure(errorMsg));
            });
    };
};

// Add Permissions Action
export const addCommentBlog = (commentblog) => {
    return dispatch => {
        dispatch(fetchCommentBlogRequest());
        axios.post(`${API_ENDPOINT}/${AdminConfig.routes.CommentBlog}`, commentblog)
            .then((response) => {
                // Sau khi thêm san pham mới, gọi lại fetchProduct để làm mới danh sách
                dispatch(fetchCommentBlogSuccess(response.data.data));
                dispatch(fetchCommentBlog());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCommentBlogFailure(errorMsg));
            });
    };
};


// Update Permissions Action
export const updateCommentBlog = (id, data) => {
    return dispatch => {
        dispatch(fetchCommentBlogRequest());
        axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.CommentBlog}/${id}`, data)
            .then(() => {
                dispatch(fetchCommentBlog());
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || error.message;
                dispatch(fetchCommentBlogFailure(errorMsg));
            });
    };
};

// Delete Permissions Action
export const deleteCommentBlog = (id) => {
    return dispatch => {
        dispatch(fetchCommentBlogRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.CommentBlog}/${id}`)
            .then(() => {
                dispatch(fetchCommentBlog()); // Refresh the permissions list
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || error.message;
                dispatch(fetchCommentBlogFailure(errorMsg));
            });
    };
};

