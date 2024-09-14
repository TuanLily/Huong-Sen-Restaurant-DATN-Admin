
export const FETCH_ROLE_REQUEST = 'FETCH_ROLE_REQUEST';
export const FETCH_ROLE_SUCCESS = 'FETCH_ROLE_SUCCESS';
export const FETCH_ROLE_FAILURE = 'FETCH_ROLE_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';
import http from "../Utils/Http";

export const fetchRoleRequest = () => ({
    type: FETCH_ROLE_REQUEST
});

export const fetchRoleSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_ROLE_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchRoleFailure = error => ({
    type: FETCH_ROLE_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchRole = (name = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchRoleRequest());

        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.role}`);

        // Thêm tham số tìm kiếm nếu có
        if (name) {
            url.searchParams.append('search', name);
        }
        // Thêm tham số phân trang
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;

                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchRoleSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchRoleFailure(errorMsg));
            });
    };
};

export const fetchRole2 = () => {
    return dispatch => {
        dispatch(fetchRoleRequest());

        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.role}`);

        // Không thêm tham số tìm kiếm và phân trang

        http.get(url.toString())
            .then(response => {
                const { results } = response.data;

                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchRoleSuccess(results));
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
            const response = await http.post(`${API_ENDPOINT}/${AdminConfig.routes.role}`, role);
            dispatch(fetchRoleSuccess(response.data));
            dispatch(fetchRole());
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message || 'Lỗi không xác định';
            throw new Error(errorMsg); 
        }
    };
};

export const updateRole = (id, data) => {
    return async (dispatch) => {
        dispatch(fetchRoleRequest());
        try {
            const response = await http.patch(`${API_ENDPOINT}/${AdminConfig.routes.role}/${id}`, data);
            dispatch(fetchRoleSuccess(response.data));
            dispatch(fetchRole());
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message || 'Lỗi không xác định';
            throw new Error(errorMsg); 
        }
    };
};

export const deleteRole = (id) => {
    return async (dispatch) => {
        dispatch(fetchRoleRequest());
        try {
            await http.delete(`${API_ENDPOINT}/${AdminConfig.routes.role}/${id}`);
            // Sau khi xóa vai trò, gọi lại fetchRole để làm mới danh sách
            dispatch(fetchRole());
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message  || "Lỗi không xác định";
            throw new Error(errorMsg);
        }
    };
};
