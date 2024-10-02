export const FETCH_BLOG_REQUEST = "FETCH_BLOG_REQUEST";
export const FETCH_BLOG_SUCCESS = "FETCH_BLOG_SUCCESS";
export const FETCH_BLOG_FAILURE = "FETCH_BLOG_FAILURE";
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from "../Config/index";
import http from "../Utils/Http";

export const fetchBlogRequest = () => ({
  type: FETCH_BLOG_REQUEST,
});

export const fetchBlogSuccess = (results, totalCount, totalPages, currentPage) => ({
  type: FETCH_BLOG_SUCCESS,
  payload: {
    results,
    totalCount,
    totalPages,
    currentPage
}
});

export const fetchBlogFailure = (error) => ({
  type: FETCH_BLOG_FAILURE,
  payload: error,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page
});


export const fetchBlog = (name = '', page = 1, pageSize = 10) => {
  return (dispatch) => {
    dispatch(fetchBlogRequest());
    const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.blog}`);

    // Add search parameter if name is provided
    if (name) {
      url.searchParams.append('search', name);
    }
    // Add pagination parameters
    url.searchParams.append('page', page);
    url.searchParams.append('pageSize', pageSize);

    http.get(url.toString())
      .then((response) => {
        const { results, totalCount, totalPages, currentPage } = response.data;

        // Dispatch action to update data
        dispatch(fetchBlogSuccess(results, totalCount, totalPages, currentPage));
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
    http
      .post(`${API_ENDPOINT}/${AdminConfig.routes.blog}`, blog)
      .then((response) => {
        dispatch(fetchBlogSuccess(response.data.data));
        dispatch(fetchBlog());
        // dispatch(fetchCategoryBlogAction()); // Dispatching fetchCategoryBlogAction
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
    http
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
        http.delete(`${API_ENDPOINT}/${AdminConfig.routes.blog}/${id}`)
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

