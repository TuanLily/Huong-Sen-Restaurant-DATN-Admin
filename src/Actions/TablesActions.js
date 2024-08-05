import axios from "axios";

export const FETCH_TABLE_REQUEST = "FETCH_TABLE_REQUEST";
export const FETCH_TABLE_SUCCESS = "FETCH_TABLE_SUCCESS";
export const FETCH_TABLE_FAILURE = "FETCH_TABLE_FAILURE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from "../Config/index";

// Action creators
export const fetchTableRequest = () => ({
  type: FETCH_TABLE_REQUEST,
});

export const fetchTableSuccess = (tables) => ({
  type: FETCH_TABLE_SUCCESS,
  payload: tables,
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
export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchTableRequest());
    axios
      .get(`${API_ENDPOINT}/${AdminConfig.routes.table}`)
      .then((response) => {
        const tables = response.data.results;
        dispatch(fetchTableSuccess(tables));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTableFailure(errorMsg));
      });
  };
};

export const addTable = (table) => {
  return async (dispatch) => {
    dispatch(fetchTableRequest());
    try {
      const response = await axios.post(`${API_ENDPOINT}/${AdminConfig.routes.table}`, table);
      dispatch(fetchTableSuccess(response.data.data));
      dispatch(fetchTables());
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Lỗi không xác định';
      dispatch(fetchTableFailure(errorMsg));
      console.error("Error adding table:", errorMsg); // Log the error to the console
      throw new Error(errorMsg);
    }
  };
};

export const updateTable = (id, data) => {
  return async (dispatch) => {
    dispatch(fetchTableRequest());
    try {
      const response = await axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.table}/${id}`, data);
      dispatch(fetchTableSuccess(response.data.data));
      dispatch(fetchTables());
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Lỗi không xác định';
      dispatch(fetchTableFailure(errorMsg));
      throw new Error(errorMsg);
    }
  };
};

export const deleteTable = (id) => {
  return (dispatch) => {
    dispatch(fetchTableRequest());
    axios
      .delete(`${API_ENDPOINT}/${AdminConfig.routes.table}/${id}`)
      .then(() => {
        dispatch(fetchTables());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTableFailure(errorMsg));
        throw error;
      });
  };
};
