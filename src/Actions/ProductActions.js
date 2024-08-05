import axios from "axios";

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

export const fetchProductRequest = () => ({
    type: FETCH_PRODUCT_REQUEST
});

export const fetchProductSuccess = product => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: product
});

export const fetchProductFailure = error => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchProduct = () => {
    return dispatch => {
        dispatch(fetchProductRequest());
        axios.get(`${API_ENDPOINT}/${AdminConfig.routes.product}`)
            .then(response => {
                const product = response.data.results;
                dispatch(fetchProductSuccess(product));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};


export const addProduct = (product) => {
    return dispatch => {
        dispatch(fetchProductRequest());
        axios.post(`${API_ENDPOINT}/${AdminConfig.routes.product}`, product)
            .then((response) => {
                // Sau khi thêm san pham mới, gọi lại fetchProduct để làm mới danh sách
                dispatch(fetchProductSuccess(response.data.data));
                dispatch(fetchProduct());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};


export const updateProduct = (id, data) => {
    return (dispatch) => {
        dispatch(fetchProductRequest());
        axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.product}/${id}`, data)
            .then((response) => {
                dispatch(fetchProductSuccess(response.data.data));
                dispatch(fetchProduct()); // Reload danh sách sau khi cập nhật
            })
            .catch((error) => {
                dispatch(fetchProductFailure(error.message));
            });
    };
};

export const deleteProduct = (id) => {
    return dispatch => {
        dispatch(fetchProductRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.product}/${id}`)
            .then(() => {
                // Sau khi xóa khách hàng, gọi lại fetchProduct để làm mới danh sách
                dispatch(fetchProduct());
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};