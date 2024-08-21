

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

export const fetchUsers = (fullname = '', page = 1, pageSize = 5) => {
    return dispatch => {
        dispatch(fetchUserRequest());

        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.users}`);

        // Thêm tham số tìm kiếm nếu có
        if (fullname) {
            url.searchParams.append('search', fullname);
        }
        // Thêm tham số phân trang
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

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

// export const addEmployee = (employee) => {
//     return dispatch => {
//         dispatch(fetchEmployeeRequest());
//         http.post(`${API_ENDPOINT}/${AdminConfig.routes.employee}`, employee)
//             .then(response => {
//                 dispatch(fetchUsersuccess(response.data.data));
//                 dispatch(fetchUsers()); 
//                 dispatch(fetchRole()); 
//             })
//             .catch(error => {
//                 const errorMsg = error.message;
//                 dispatch(fetchEmployeeFailure(errorMsg));
//             });
//     };
// };

// export const updateEmployee = (id, data) => {
//     return dispatch => {
//         dispatch(fetchEmployeeRequest());
//         http.patch(`${API_ENDPOINT}/${AdminConfig.routes.employee}/${id}`, data)
//             .then(response => {
//                 dispatch(fetchUsersuccess(response.data)); // Điều chỉnh dựa trên cấu trúc trả về từ server
//                 dispatch(fetchUsers()); // Cập nhật danh sách nhân viên sau khi cập nhật
//             })
//             .catch(error => {
//                 const errorMsg = error.message;
//                 dispatch(fetchEmployeeFailure(errorMsg));
//             });
//     };
// };

// export const deleteEmployee = (id) => {
//     return dispatch => {
//         dispatch(fetchEmployeeRequest());
//         http.delete(`${API_ENDPOINT}/${AdminConfig.routes.employee}/${id}`)
//             .then(() => {
//                 dispatch(fetchUsers()); // Cập nhật danh sách nhân viên sau khi xóa
//             })
//             .catch(error => {
//                 const errorMsg = error.message;
//                 dispatch(fetchEmployeeFailure(errorMsg));
//             });
//     };
// };


// export const checkEmailExists = async (email) => {
//     try {
//         const response = await http.get(`${API_ENDPOINT}/auth/check-email`, { params: { email } });
//         return response.data.exists ? response.data.user : null;
//     } catch (error) {
//         console.error('Error checking user existence:', error);
//         throw error;
//     }
// };