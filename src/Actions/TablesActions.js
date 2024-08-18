
export const FETCH_TABLE_REQUEST = "FETCH_TABLE_REQUEST";
export const FETCH_TABLE_SUCCESS = "FETCH_TABLE_SUCCESS";
export const FETCH_TABLE_FAILURE = "FETCH_TABLE_FAILURE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from "../Config/index";
import http from "../Utils/Http";

// Action creators
export const fetchTableRequest = () => ({
  type: FETCH_TABLE_REQUEST,
});

export const fetchTableSuccess = (
  results,
  totalCount,
  totalPages,
  currentPage
) => ({
  type: FETCH_TABLE_SUCCESS,
  payload: {
    results,
    totalCount,
    totalPages,
    currentPage,
  },
});

export const fetchTableFailure = (error) => ({
  type: FETCH_TABLE_FAILURE,
  payload: error,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

// Thunk action creator for fetching tables
export const fetchTables = (number = "", page = 1, pageSize = 5) => {
  return (dispatch) => {
    dispatch(fetchTableRequest());

    const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.table}`);
    if (number) {
      url.searchParams.append("search", number);
    }

    // Thêm tham số phân trang
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);

    http.get(url.toString())
      .then((response) => {
        const { results, totalCount, totalPages, currentPage } = response.data;
        dispatch(
          fetchTableSuccess(results, totalCount, totalPages, currentPage)
        );
        console.log(response.data);
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || error.message || "Lỗi không xác định";
        dispatch(fetchTableFailure(errorMsg));
      });
  };
};

export const addTable = (table) => {
  return async (dispatch) => {
    dispatch(fetchTableRequest());
    try {
      const response = await http.post(
        `${API_ENDPOINT}/${AdminConfig.routes.table}`,
        table
      );
      dispatch(fetchTables()); // Tải lại danh sách bàn sau khi thêm mới
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Lỗi không xác định";
      dispatch(fetchTableFailure(errorMsg));
      console.error("Lỗi khi thêm bàn:", errorMsg);
      throw new Error(errorMsg);
    }
  };
};

export const updateTable = (id, data) => {
  return async (dispatch) => {
    dispatch(fetchTableRequest());
    try {
      const response = await http.patch(
        `${API_ENDPOINT}/${AdminConfig.routes.table}/${id}`,
        data
      );
      dispatch(fetchTables()); // Tải lại danh sách bàn sau khi cập nhật
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Lỗi không xác định";
      dispatch(fetchTableFailure(errorMsg));
      console.error("Lỗi khi cập nhật bàn:", errorMsg);
      throw new Error(errorMsg);
    }
  };
};


export const deleteTable = (id) => {
  return async (dispatch) => {
    dispatch(fetchTableRequest());
    try {
      await http.delete(`${API_ENDPOINT}/${AdminConfig.routes.table}/${id}`);
      dispatch(fetchTables()); // Tải lại danh sách bàn sau khi xóa
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Đã xảy ra lỗi trong quá trình xóa bàn";
      dispatch(fetchTableFailure(errorMsg));
      throw error;
    }
  };
};
