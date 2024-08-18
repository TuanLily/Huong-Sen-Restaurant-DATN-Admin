
export const FETCH_PROMOTION_REQUEST = 'FETCH_PROMOTION_REQUEST';
export const FETCH_PROMOTION_SUCCESS = 'FETCH_PROMOTION_SUCCESS';
export const FETCH_PROMOTION_FAILURE = 'FETCH_PROMOTION_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';
import http from "../Utils/Http";

export const fetchPromotionRequest = () => ({
    type: FETCH_PROMOTION_REQUEST
});

export const fetchPromotionSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_PROMOTION_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchPromotionsFailure = error => ({
    type: FETCH_PROMOTION_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchPromotion = (code_name = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchPromotionRequest());
        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.promotion}`);

        // Thêm tham số tìm kiếm nếu có
        if (code_name) {
            url.searchParams.append('search', code_name);
        }
        // Thêm tham số phân trang
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;

                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchPromotionSuccess(results, totalCount, totalPages, currentPage));
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
        http.post(`${API_ENDPOINT}/${AdminConfig.routes.promotion}`, product)
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
        http.patch(`${API_ENDPOINT}/${AdminConfig.routes.promotion}/${id}`, data)
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
        http.delete(`${API_ENDPOINT}/${AdminConfig.routes.promotion}/${id}`)
            .then(() => {
                dispatch(fetchPromotion());
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchPromotionsFailure(errorMsg));
            });
    };
};