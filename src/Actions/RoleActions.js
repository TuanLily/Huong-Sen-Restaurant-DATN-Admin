import axios from "axios";

export const FETCH_ROLE_REQUEST = 'FETCH_ROLE_REQUEST';
export const FETCH_ROLE_SUCCESS = 'FETCH_ROLE_SUCCESS';
export const FETCH_ROLE_FAILURE = 'FETCH_ROLE_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

export const fetchRoleRequest = () => ({
    type: FETCH_ROLE_REQUEST
});

export const fetchRoleSuccess = roles => ({
    type: FETCH_ROLE_SUCCESS,
    payload: roles
});

export const fetchRoleFailure = error => ({
    type: FETCH_ROLE_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchRole = () => {
    return dispatch => {
        dispatch(fetchRoleRequest());
        axios.get(`${API_ENDPOINT}/${AdminConfig.routes.role}`)
            .then(response => {
                const roles = response.data;
                dispatch(fetchRoleSuccess(roles));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchRoleFailure(errorMsg));
            });
    };
};

export const addRole = (role) => {
    return async (dispatch) => {
        dispatch(fetchRoleRequest());
        try {
            const response = await axios.post(`${API_ENDPOINT}/${AdminConfig.routes.role}`, role);
            dispatch(fetchRoleSuccess(response.data));
            dispatch(fetchRole());
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message || 'Lỗi không xác định';
            dispatch(fetchRoleFailure(errorMsg));
            console.error("Error adding role:", errorMsg);
            throw new Error(errorMsg); 
        }
    };
};

export const updateRole = (id, data) => {
    return async (dispatch) => {
        dispatch(fetchRoleRequest());
        try {
            const response = await axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.role}/${id}`, data);
            dispatch(fetchRoleSuccess(response.data));
            dispatch(fetchRole());
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message || 'Lỗi không xác định';
            dispatch(fetchRoleFailure(errorMsg));
            console.error("Error updating role:", errorMsg);
            throw new Error(errorMsg); 
        }
    };
};

export const deleteRole = (id) => {
    return dispatch => {
        dispatch(fetchRoleRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.role}/${id}`)
            .then(() => {
                // Sau khi xóa vai trò, gọi lại fetchRole để làm mới danh sách
                dispatch(fetchRole());
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchRoleFailure(errorMsg));
            });
    };
};
