import axios from "axios";

export const FETCH_CUSTOMER_REQUEST = 'FETCH_CUSTOMER_REQUEST';
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS';
export const FETCH_CUSTOMER_FAILURE = 'FETCH_CUSTOMER_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

export const fetchCustomerRequest = () => ({
    type: FETCH_CUSTOMER_REQUEST
});

export const fetchCustomerSuccess = customer => ({
    type: FETCH_CUSTOMER_SUCCESS,
    payload: customer
});

export const fetchCustomerFailure = error => ({
    type: FETCH_CUSTOMER_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchCustomer = () => {
    return dispatch => {
        dispatch(fetchCustomerRequest());
        axios.get(`${API_ENDPOINT}/${AdminConfig.routes.customer}`)
            .then(response => {
                const customer = response.data.results;
                dispatch(fetchCustomerSuccess(customer));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCustomerFailure(errorMsg));
            });
    };
};



export const addCustomer = (customer) => {
    return dispatch => {
        dispatch(fetchCustomerRequest());
        axios.post(`${API_ENDPOINT}/${AdminConfig.routes.customer}`, customer)
            .then((response) => {
                // Sau khi thêm khách hàng mới, gọi lại fetchCustomer để làm mới danh sách
                dispatch(fetchCustomerSuccess(response.data.data));
                dispatch(fetchCustomer());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCustomerFailure(errorMsg));
            });
    };
};


export const updateCustomer = (id, data) => {
    return (dispatch) => {
        dispatch(fetchCustomerRequest());
        axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.customer}/${id}`, data)
            .then((response) => {
                dispatch(fetchCustomerSuccess(response.data.data));
                dispatch(fetchCustomer()); // Reload danh sách khách hàng sau khi cập nhật
            })
            .catch((error) => {
                dispatch(fetchCustomerFailure(error.message));
            });
    };
};

export const deleteCustomer = (id) => {
    return dispatch => {
        dispatch(fetchCustomerRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.customer}/${id}`)
            .then(() => {
                // Sau khi xóa khách hàng, gọi lại fetchCustomer để làm mới danh sách
                dispatch(fetchCustomer());
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchCustomerFailure(errorMsg));
            });
    };
};