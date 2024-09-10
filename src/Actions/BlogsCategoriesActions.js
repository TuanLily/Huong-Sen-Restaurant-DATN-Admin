
export const FETCH_CATEGORY_BLOG_REQUEST = "FETCH_CATEGORY_BLOG_REQUEST";
export const FETCH_CATEGORY_BLOG_SUCCESS = "FETCH_CATEGORY_BLOG_SUCCESS";
export const FETCH_CATEGORY_BLOG_FAILURE = "FETCH_CATEGORY_BLOG_FAILURE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from "../Config/index";
import http from "../Utils/Http";

// Action creators
export const fetchCategoryBlogRequest = () => ({
    type: FETCH_CATEGORY_BLOG_REQUEST,
});

export const fetchCategoryBlogSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_CATEGORY_BLOG_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchCategoryBlogFailure = (error) => ({
    type: FETCH_CATEGORY_BLOG_FAILURE,
    payload: error,
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});

// Thunk action creator for fetching category blogs
export const fetchCategoryBlog = (name = '', page = 1, pageSize = 5) => {
    return (dispatch) => {
        dispatch(fetchCategoryBlogRequest());

        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.categoryBlog}`);

        // Add search parameter if provided
        if (name) {
            url.searchParams.append('search', name);
        }
        // Add pagination parameters
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;

                // Dispatch action to update the state with the fetched data
                dispatch(fetchCategoryBlogSuccess(results, totalCount, totalPages, currentPage));
                console.log(response.data);
                
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCategoryBlogFailure(errorMsg));
            });
    };
};

// Thunk action creator for adding a category blog
export const addCategoryBlog = (categoryBlog) => {
    return (dispatch) => {
        dispatch(fetchCategoryBlogRequest());
        http.post(`${API_ENDPOINT}/${AdminConfig.routes.categoryBlog}`, categoryBlog)
            .then((response) => {
                dispatch(fetchCategoryBlogSuccess(response.data.data));
                dispatch(fetchCategoryBlog()); // Refresh the list after adding
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCategoryBlogFailure(errorMsg));
            });
    };
};

// Thunk action creator for updating a category blog
export const updateCategoryBlog = (id, data) => {
    return (dispatch) => {
        dispatch(fetchCategoryBlogRequest());
        http.patch(`${API_ENDPOINT}/${AdminConfig.routes.categoryBlog}/${id}`, data)
            .then((response) => {
                dispatch(fetchCategoryBlogSuccess(response.data.data));
                dispatch(fetchCategoryBlog()); // Refresh the list after updating
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCategoryBlogFailure(errorMsg));
            });
    };
};

// Thunk action creator for soft deleting a category blog
export const deleteCategoryBlog = (id) => {
    return (dispatch) => {
        dispatch(fetchCategoryBlogRequest());

        // Endpoint cho việc xóa tạm
        const url = `${API_ENDPOINT}/${AdminConfig.routes.categoryBlog}/${id}`;

        http.delete(url)
            .then(() => {
                // Sau khi xóa tạm, gọi lại fetchCategoryBlog để làm mới danh sách
                dispatch(fetchCategoryBlog()); 
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCategoryBlogFailure(errorMsg));
            });
    };
};

