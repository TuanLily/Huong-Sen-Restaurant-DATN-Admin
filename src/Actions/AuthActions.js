import axios from "axios";

export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';

export const CHECK_PASSWORD_REQUEST = 'CHECK_PASSWORD_REQUEST';
export const CHECK_PASSWORD_SUCCESS = 'CHECK_PASSWORD_SUCCESS';
export const CHECK_PASSWORD_FAILURE = 'CHECK_PASSWORD_FAILURE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

export const fetchAuthRequest = () => ({
    type: FETCH_AUTH_REQUEST
});

export const fetchAuthSuccess = auth => ({
    type: FETCH_AUTH_SUCCESS,
    payload: auth
});

export const fetchAuthFailure = error => ({
    type: FETCH_AUTH_FAILURE,
    payload: error
});

export const checkPasswordRequest = () => ({
    type: CHECK_PASSWORD_REQUEST
});

export const checkPasswordSuccess = message => ({
    type: CHECK_PASSWORD_SUCCESS,
    payload: message
});

export const checkPasswordFailure = error => ({
    type: CHECK_PASSWORD_FAILURE,
    payload: error
});

// Đăng nhập
export const fetchLogin = (email, password) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth_admin/login`, { email, password });
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchAuthSuccess(data));
                // Lưu thông tin vào localStorage
                localStorage.setItem('user_admin', JSON.stringify(data.data)); // Lưu toàn bộ đối tượng data
            } else {
                dispatch(fetchAuthFailure('Unexpected response status: ' + response.status));
            }
        } catch (error) {
            dispatch(fetchAuthFailure(error.response ? error.response.data.message : error.message));
        }
    };
};

// Kiểm tra mật khẩu có đúng hay không
export const checkPassword = (email, currentPassword) => {
    return dispatch => {
        dispatch(checkPasswordRequest());
        return axios.post(`${API_ENDPOINT}/users/check-password`, { email, currentPassword })
            .then(response => {
                dispatch(checkPasswordSuccess(response.data.message));
                return response.data.message; // Trả về thông báo mật khẩu đúng/sai
            })
            .catch(error => {
                const errorMsg = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : error.message;
                dispatch(checkPasswordFailure(errorMsg));
                return errorMsg; // Trả về thông báo lỗi
            });
    };
};

// Cập nhật thông tin cá nhân khi đăng nhập
export const updateProfile = (id, data) => {
    return (dispatch) => {
        dispatch(fetchAuthRequest());
        axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.users}/${id}`, data)
            .then((response) => {
                console.log(response);
                dispatch(fetchAuthSuccess(response.data.data));
            })
            .catch((error) => {
                console.error('Update profile error:', error); // Kiểm tra lỗi
                dispatch(fetchAuthFailure(error.message));
            });
    };
};