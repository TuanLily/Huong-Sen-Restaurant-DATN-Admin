import axios from "axios";

export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';

import { API_ENDPOINT } from "../Config/APIs";

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

export const fetchLogin = (username, password) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth_admin/login`, { username, password });
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