
export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';
import http from "../Utils/Http";

export const fetchProductRequest = () => ({
    type: FETCH_PRODUCT_REQUEST
});

export const fetchProductSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchProductFailure = error => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchProduct = (name = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchProductRequest());
        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.product}`);

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
                dispatch(fetchProductSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};
export const fetchMenu = () => {
    return dispatch => {
        dispatch(fetchProductRequest());
        http.get(`${API_ENDPOINT}/${AdminConfig.routes.product}/menu`)
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

export const fetchProductHoatDong = (name = '', searchCateID = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchProductRequest());
        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.product}/hoat_dong`);

        // Thêm tham số tìm kiếm nếu có
        if (name) {
            url.searchParams.append('searchName', name);
        }
        if (searchCateID) {
            url.searchParams.append('searchCateID', searchCateID);
        }

        // Thêm tham số phân trang
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;

                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchProductSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};

export const fetchProductNgungHoatDong = (name = '', searchCateID = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchProductRequest());
        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.product}/ngung_hoat_dong`);

        // Thêm tham số tìm kiếm nếu có
        if (name) {
            url.searchParams.append('searchName', name);
        }
        if (searchCateID) {
            url.searchParams.append('searchCateID', searchCateID);
        }
        // Thêm tham số phân trang
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;

                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchProductSuccess(results, totalCount, totalPages, currentPage));
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
        http.post(`${API_ENDPOINT}/${AdminConfig.routes.product}`, product)
            .then((response) => {
                // Sau khi thêm san pham mới, gọi lại fetchProduct để làm mới danh sách
                dispatch(fetchProductSuccess(response.data.data));
                dispatch(fetchProductHoatDong());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};

export const fetchProductHoatDongReser = (name = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchProductRequest());

        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.product}/hoat_dong`);

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

                // Lọc sản phẩm có categories_id khác 8 và trạng thái khác 0
                const filteredResults = results.filter(product => 
                    product.categories_id !== 8
                );

                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchProductSuccess(filteredResults, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.message || 'Đã xảy ra lỗi trong quá trình lấy dữ liệu.';
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};




export const updateProduct = (id, data) => {
    return (dispatch) => {
        dispatch(fetchProductRequest());
        http.patch(`${API_ENDPOINT}/${AdminConfig.routes.product}/${id}`, data)
            .then((response) => {
                dispatch(fetchProductSuccess(response.data.data));
                dispatch(fetchProductHoatDong()); // Reload danh sách sau khi cập nhật
            })
            .catch((error) => {
                dispatch(fetchProductFailure(error.message));
            });
    };
};

export const updateStatus = (id, data, start, name = '', searchCateID = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchProductRequest());
        http.patch(`${API_ENDPOINT}/${AdminConfig.routes.product}/${id}`, data)
            .then(() => {
                if (start == 'list') {
                    dispatch(fetchProductHoatDong(name, searchCateID, page, pageSize));
                } else {
                    dispatch(fetchProductNgungHoatDong(name, searchCateID, page, pageSize));
                }
            })
            .catch((error) => {
                dispatch(fetchProductFailure(error.message));
            });
    };
};

export const deleteProduct = (id) => {
    return dispatch => {
        dispatch(fetchProductRequest());
        http.delete(`${API_ENDPOINT}/${AdminConfig.routes.product}/${id}`)
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