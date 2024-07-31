import axios from "axios";

export const FETCH_BLOG_REQUEST = "FETCH_BLOG_REQUEST";
export const FETCH_BLOG_SUCCESS = "FETCH_BLOG_SUCCESS";
export const FETCH_BLOG_FAILURE = "FETCH_BLOG_FAILURE";


import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from "../Config/index";




export const fetchBlogRequest = () => ({
  type: FETCH_BLOG_REQUEST,
});

export const fetchBlogSuccess = (blog) => ({
  type: FETCH_BLOG_SUCCESS,
  payload: blog,
});

export const fetchBlogFailure = (error) => ({
  type: FETCH_BLOG_FAILURE,
  payload: error,
});

export const fetchBlog = () => {
  return (dispatch) => {
    dispatch(fetchBlogRequest());
    axios
      .get(`${API_ENDPOINT}/${AdminConfig.routes.blog}`)
      .then((response) => {
        const blog = response.data;
        dispatch(fetchBlogSuccess(blog));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchBlogFailure(errorMsg));
      });
  };
};

export const addBlog = (blog) => {
  return (dispatch) => {
    dispatch(fetchBlogRequest());
    axios
      .post(`${API_ENDPOINT}/${AdminConfig.routes.blog}`, blog)
      .then((response) => {
        dispatch(fetchBlogSuccess(response.data.data));
        dispatch(fetchBlog());
        dispatch(fetchCategoryBlogAction()); // Dispatching fetchCategoryBlogAction
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchBlogFailure(errorMsg));
      });
  };
};

export const updateBlog = (id, data) => {
  return (dispatch) => {
    dispatch(fetchBlogRequest());
    axios
      .patch(`${API_ENDPOINT}/${AdminConfig.routes.blog}/${id}`, data)
      .then((response) => {
        dispatch(fetchBlogSuccess(response.data.data));
        dispatch(fetchBlog());
      })
      .catch((error) => {
        dispatch(fetchBlogFailure(error.message));
      });
  };
};

export const deleteBlog = (id) => {
    return dispatch => {
        dispatch(fetchBlogRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.blog}/${id}`)
            .then(() => {
                // Sau khi xóa khách hàng, gọi lại fetchCustomer để làm mới danh sách
                dispatch(fetchBlog());
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchBlogFailure(errorMsg));
            });
    };
};