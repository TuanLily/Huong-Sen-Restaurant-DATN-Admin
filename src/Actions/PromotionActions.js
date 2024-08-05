import axios from "axios";

export const FETCH_PROMOTION_REQUEST = 'FETCH_PROMOTION_REQUEST';
export const FETCH_PROMOTION_SUCCESS = 'FETCH_PROMOTION_SUCCESS';
export const FETCH_PROMOTION_FAILURE = 'FETCH_PROMOTION_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

export const fetchPromotionRequest = () => ({
    type: FETCH_PROMOTION_REQUEST
});

export const fetchPromotionSuccess = product => ({
    type: FETCH_PROMOTION_SUCCESS,
    payload: product
});

export const fetchPromotionsFailure = error => ({
    type: FETCH_PROMOTION_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchPromotion = () => {
    return dispatch => {
        dispatch(fetchPromotionRequest());
        axios.get(`${API_ENDPOINT}/${AdminConfig.routes.promotion}`)
            .then(response => {
                const product_category = response.data.results;
                dispatch(fetchPromotionSuccess(product_category));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchPromotionsFailure(errorMsg));
            });
    };
};

export const addPromotion = (product) => {
    return dispatch => {
        dispatch(fetchPromotionRequest());
        axios.post(`${API_ENDPOINT}/${AdminConfig.routes.promotion}`, product)
            .then((response) => {
                dispatch(fetchPromotionSuccess(response.data.data));
                dispatch(fetchPromotion());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchPromotionsFailure(errorMsg));
            });
    };
};

export const updatePromotions = (id, data) => {
    return (dispatch) => {
        dispatch(fetchPromotionRequest());
        axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.promotion}/${id}`, data)
            .then((response) => {
                dispatch(fetchPromotionSuccess(response.data.data));
                dispatch(fetchPromotion()); // Reload danh sách sau khi cập nhật
            })
            .catch((error) => {
                dispatch(fetchPromotionsFailure(error.message));
            });
    };
};

export const deletePromotion = (id) => {
    return dispatch => {
        dispatch(fetchPromotionRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.promotion}/${id}`)
            .then(() => {
                dispatch(fetchPromotion());
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchPromotionsFailure(errorMsg));
            });
    };
};