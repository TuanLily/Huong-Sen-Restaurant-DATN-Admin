import axios from "axios";

export const FETCH_PERMISSIONS_REQUEST = 'FETCH_PERMISSIONS_REQUEST';
export const FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS';
export const FETCH_PERMISSIONS_FAILURE = 'FETCH_PERMISSIONS_FAILURE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

export const fetchPermissionsRequest = () => ({
    type: FETCH_PERMISSIONS_REQUEST
});

export const fetchPermissionsSuccess = permissions => ({
    type: FETCH_PERMISSIONS_SUCCESS,
    payload: permissions
});

export const fetchPermissionsFailure = error => ({
    type: FETCH_PERMISSIONS_FAILURE,
    payload: error
});

export const fetchPermissions = (page = 1) => (dispatch) => {
    dispatch(fetchPermissionsRequest());

    axios.get(`${API_ENDPOINT}/${AdminConfig.routes.Permissions}?page=${page}`)
        .then(response => {
            const permissions = response.data;
            console.log(permissions);
            dispatch(fetchPermissionsSuccess(permissions));
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(fetchPermissionsFailure(errorMsg));
        });
};



export const addPermissions = (permissions) => {
    return dispatch => {
        dispatch(fetchPermissionsRequest());
        axios.post(`${API_ENDPOINT}/${AdminConfig.routes.Permissions}`, permissions)
            .then((response) => {
                // Sau khi thêm khách hàng mới, gọi lại fetchPermissions để làm mới danh sách
                dispatch(fetchPermissionsSuccess(response.data.data));
                dispatch(fetchPermissions());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchPermissionsFailure(errorMsg));
            });
    };
};


export const updatePermissions = (id, data) => {
    return (dispatch) => {
        dispatch(fetchPermissionsRequest());
        axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.Permissions}/${id}`, data)
            .then((response) => {
                dispatch(fetchPermissionsSuccess(response.data.data));
                dispatch(fetchPermissions()); // Reload danh sách khách hàng sau khi cập nhật
            })
            .catch((error) => {
                dispatch(fetchPermissionsFailure(error.message));
            });
    };
};

export const deletePermissions = (id) => {
    return dispatch => {
        dispatch(fetchPermissionsRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.Permissions}/${id}`)
            .then(() => {
                // Sau khi xóa khách hàng, gọi lại fetchPermissions để làm mới danh sách
                dispatch(fetchPermissions());
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchPermissionsFailure(errorMsg));
            });
    };
};