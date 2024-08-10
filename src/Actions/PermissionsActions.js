import axios from "axios";

export const FETCH_PERMISSIONS_REQUEST = 'FETCH_PERMISSIONS_REQUEST';
export const FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS';
export const FETCH_PERMISSIONS_FAILURE = 'FETCH_PERMISSIONS_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

export const fetchPermissionsRequest = () => ({
    type: FETCH_PERMISSIONS_REQUEST
});

export const fetchPermissionsSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_PERMISSIONS_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchPermissionsFailure = error => ({
    type: FETCH_PERMISSIONS_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchPermissions = (name = '', page = 1, pageSize = 10) => {

    return dispatch => {
        dispatch(fetchPermissionsRequest());

        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.Permissions}`);

        // Thêm tham số tìm kiếm nếu có
        if (name) {
            url.searchParams.append('search', name);
        }
        // Thêm tham số phân trang
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        axios.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;

                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchPermissionsSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchPermissionsFailure(errorMsg));
            });
    };
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