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
    return dispatch => {
        dispatch(fetchRoleRequest());
        axios.post(`${API_ENDPOINT}/${AdminConfig.routes.role}`, role)
            .then((response) => {
                // Sau khi thêm vai trò mới, gọi lại fetchRole để làm mới danh sách
                dispatch(fetchRoleSuccess(response.data));
                dispatch(fetchRole());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchRoleFailure(errorMsg));
            });
    };
};

export const updateRole = (id, data) => {
    return (dispatch) => {
        dispatch(fetchRoleRequest());
        axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.role}/${id}`, data)
            .then((response) => {
                dispatch(fetchRoleSuccess(response.data));
                dispatch(fetchRole()); // Reload danh sách vai trò sau khi cập nhật
            })
            .catch((error) => {
                dispatch(fetchRoleFailure(error.message));
            });
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
