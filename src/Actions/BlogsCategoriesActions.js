import axios from "axios";

export const FETCH_CATEGORY_BLOG_REQUEST = "FETCH_CATEGORY_BLOG_REQUEST";
export const FETCH_CATEGORY_BLOG_SUCCESS = "FETCH_CATEGORY_BLOG_SUCCESS";
export const FETCH_CATEGORY_BLOG_FAILURE = "FETCH_CATEGORY_BLOG_FAILURE";
export const SET_CURRENT_PAGE = "SET_CATEGORY_BLOG_CURRENT_PAGE";


import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from "../Config/index";

// Action creators
export const fetchCategoryBlogRequest = () => ({
  type: FETCH_CATEGORY_BLOG_REQUEST,
});

export const fetchCategoryBlogSuccess = (categories) => ({
  type: FETCH_CATEGORY_BLOG_SUCCESS,
  payload: categories,
});

export const fetchCategoryBlogFailure = (error) => ({
  type: FETCH_CATEGORY_BLOG_FAILURE,
  payload: error,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});


// Thunk action creator for fetching categories
export const fetchCategoryBlog = () => {
  return (dispatch) => {
    dispatch(fetchCategoryBlogRequest());
    axios
      .get(`${API_ENDPOINT}/${AdminConfig.routes.categoryBlog}`)
      .then((response) => {
        const categories = response.data.results; // Adjust if necessary
        dispatch(fetchCategoryBlogSuccess(categories));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchCategoryBlogFailure(errorMsg));
      });
  };
};

export const addCategoryBlog = (categoryBlog) => {
  return async (dispatch) => {
    dispatch(fetchCategoryBlogRequest());
    try {
      const response = await axios.post(`${API_ENDPOINT}/${AdminConfig.routes.categoryBlog}`, categoryBlog);
      dispatch(fetchCategoryBlogSuccess(response.data.data));
      dispatch(fetchCategoryBlog()); // Refresh the list
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Lỗi không xác định';
      dispatch(fetchCategoryBlogFailure(errorMsg));
      console.error("Error adding category blog:", errorMsg);
      throw new Error(errorMsg);
    }
  };
};

export const updateCategoryBlog = (id, data) => {
  return async (dispatch) => {
    dispatch(fetchCategoryBlogRequest());
    try {
      const response = await axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.categoryBlog}/${id}`, data);
      dispatch(fetchCategoryBlogSuccess(response.data.data));
      dispatch(fetchCategoryBlog()); // Refresh the list
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Lỗi không xác định';
      dispatch(fetchCategoryBlogFailure(errorMsg));
      console.error("Error updating category blog:", errorMsg);
      throw new Error(errorMsg);
    }
  };
};

export const deleteCategoryBlog = (id) => {
  return (dispatch) => {
    dispatch(fetchCategoryBlogRequest());
    axios
      .delete(`${API_ENDPOINT}/${AdminConfig.routes.categoryBlog}/${id}`)
      .then(() => {
        dispatch(fetchCategoryBlog());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchCategoryBlogFailure(errorMsg));
        throw error;
      });
  };
};
