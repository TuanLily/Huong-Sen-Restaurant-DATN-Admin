

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import axios from "axios";
import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';
import http from "../Utils/Http";
import { fetchRole } from "./RoleActions";

export const fetchUserRequest = () => ({
    type: FETCH_USERS_REQUEST
});

export const fetchUserSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_USERS_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchUserFailure = error => ({
    type: FETCH_USERS_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchUsers = (fullname = '', page = 1) => {
    return dispatch => {
        dispatch(fetchUserRequest());

        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.users}`);

        // Thêm tham số tìm kiếm nếu có
        if (fullname) {
            url.searchParams.append('search', fullname);
        }
        // Thêm tham số phân trang
        url.searchParams.append('page', page);

        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;

                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchUserSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};



export const fetchUserById = (id) => {
    return async (dispatch) => {
        dispatch(fetchUserRequest());

        try {
            const url = `${API_ENDPOINT}/${AdminConfig.routes.users}/${id}`;
            const response = await http.get(url);
            const user = response.data.result;
            dispatch(fetchUserSuccess(user));
            return user; // Return the fetched user data
        } catch (error) {
            const errorMsg = error.message;
            dispatch(fetchUserFailure(errorMsg));
            throw error; // Rethrow the error for handling in the calling function
        }
    };
};




export const checkEmailExists = async (email) => {
    try {
        const response = await http.post(`${API_ENDPOINT}/${AdminConfig.routes.users}/check-email-exists`, { email });
        return response.data.exists ? response.data.user : null;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};


export const addUser = (user) => {
    return dispatch => {
        dispatch(fetchUserRequest());
        http.post(`${API_ENDPOINT}/${AdminConfig.routes.users}`, user)
            .then(response => {
                dispatch(fetchUserSuccess(response.data.data));
                dispatch(fetchUsers());
                dispatch(fetchRole());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};

export const updateUser = (id, data) => {
    return dispatch => {
        dispatch(fetchUserRequest());
        http.patch(`${API_ENDPOINT}/${AdminConfig.routes.users}/${id}`, data)
            .then(response => {
                dispatch(fetchUserSuccess(response.data)); // Điều chỉnh dựa trên cấu trúc trả về từ server
                dispatch(fetchUsers()); // Cập nhật danh sách nhân viên sau khi cập nhật
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchUserFailure(errorMsg));
            });
    };
};

export const deleteUsers = (id) => {
    return dispatch => {
        dispatch(fetchUserRequest());
        return http.delete(`${API_ENDPOINT}/${AdminConfig.routes.users}/${id}`)
            .then((response) => {
                dispatch(fetchUsers()); // Cập nhật danh sách sau khi xóa
                return response.data; // Trả về dữ liệu thành công
            })
            .catch(error => {
                const errorMsg = error.response?.data?.error || "Đã xảy ra lỗi khi xóa tài khoản";
                dispatch(fetchUserFailure(errorMsg));
                throw new Error(errorMsg); // Ném lỗi ra ngoài để bắt
            });
    };
};



// export const checkEmailExists = async (email) => {
//     try {
//         const response = await http.get(`${API_ENDPOINT}/auth/check-email`, { params: { email } });
//         return response.data.exists ? response.data.user : null;
//     } catch (error) {
//         console.error('Error checking user existence:', error);
//         throw error;
//     }
// };