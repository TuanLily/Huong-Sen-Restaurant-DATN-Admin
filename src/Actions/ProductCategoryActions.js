import axios from "axios";

export const FETCH_PRODUCT_CATEGORY_REQUEST = 'FETCH_PRODUCT_CATEGORY_REQUEST';
export const FETCH_PRODUCT_CATEGORY_SUCCESS = 'FETCH_PRODUCT_CATEGORY_SUCCESS';
export const FETCH_PRODUCT_CATEGORY_FAILURE = 'FETCH_PRODUCT_CATEGORY_FAILURE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

export const fetchProductCategoryRequest = () => ({
    type: FETCH_PRODUCT_CATEGORY_REQUEST
});

export const fetchProductCategorySuccess = product => ({
    type: FETCH_PRODUCT_CATEGORY_SUCCESS,
    payload: product
});

export const fetchProductCategoryFailure = error => ({
    type: FETCH_PRODUCT_CATEGORY_FAILURE,
    payload: error
});

export const fetchProductCategory = () => {
    return dispatch => {
        dispatch(fetchProductCategoryRequest());
        axios.get(`${API_ENDPOINT}/${AdminConfig.routes.categoryProduct}`)
            .then(response => {
                const product_category = response.data.results;
                dispatch(fetchProductCategorySuccess(product_category));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductCategoryFailure(errorMsg));
            });
    };
};

export const addProductCategory = (product) => {
    return dispatch => {
        dispatch(fetchProductCategoryRequest());
        axios.post(`${API_ENDPOINT}/${AdminConfig.routes.categoryProduct}`, product)
            .then((response) => {
                // Sau khi thêm san pham mới, gọi lại fetchProduct để làm mới danh sách
                dispatch(fetchProductCategorySuccess(response.data.data));
                dispatch(fetchProductCategory());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductCategoryFailure(errorMsg));
            });
    };
};

export const updateProductCategory = (id, data) => {
    return (dispatch) => {
        dispatch(fetchProductCategoryRequest());
        axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.categoryProduct}/${id}`, data)
            .then((response) => {
                dispatch(fetchProductCategorySuccess(response.data.data));
                dispatch(fetchProductCategory()); // Reload danh sách sau khi cập nhật
            })
            .catch((error) => {
                dispatch(fetchProductCategoryFailure(error.message));
            });
    };
};

export const deleteProductCategory = (id) => {
    return dispatch => {
        dispatch(fetchProductCategoryRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.categoryProduct}/${id}`)
            .then(() => {
                // Sau khi xóa danh muc, gọi lại fetchProductCategory để làm mới danh sách
                dispatch(fetchProductCategory());
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchProductCategoryFailure(errorMsg));
            });
    };
};