export const FETCH_RESERVATIONS_REQUEST = 'FETCH_RESERVATIONS_REQUEST';
export const FETCH_RESERVATIONS_SUCCESS = 'FETCH_RESERVATIONS_SUCCESS';
export const FETCH_RESERVATIONS_FAILURE = 'FETCH_RESERVATIONS_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_DATA, API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';
import http from "../Utils/Http";

export const fetchReservationsRequest = () => ({
    type: FETCH_RESERVATIONS_REQUEST
});

export const fetchReservationsSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_RESERVATIONS_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchReservationsFailure = error => ({
    type: FETCH_RESERVATIONS_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

// Lấy dữ liệu
export const fetchReservations = (fullname = '', tel = '', email = '', status = '', reservation_code = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchReservationsRequest());
        const url = new URL(`${API_ENDPOINT}/${API_DATA.reservations_admin}`);

        // Thêm tham số tìm kiếm nếu có
        if (fullname) {
            url.searchParams.append('searchName', fullname);
        }
        if (tel) {
            url.searchParams.append('searchPhone', tel);
        }
        if (email) {
            url.searchParams.append('searchEmail', email);
        }
        if (status) {
            url.searchParams.append('status', status);
        }
        if (reservation_code) {
            url.searchParams.append('reservation_code', reservation_code);
        }

        // Thêm tham số phân trang
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;
                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchReservationsSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchReservationsFailure(errorMsg));
            });
    };
};

// Lấy danh sách reatime
export const fetchRetime = async (fullname = '', tel = '', email = '', status = '', reservation_code = '', page = 1, pageSize = 10) => {
    try {
        const url = new URL(`${API_ENDPOINT}/${API_DATA.reservations_admin}`);

        // Thêm tham số tìm kiếm nếu có
        if (fullname) {
            url.searchParams.append('searchName', fullname);
        }
        if (tel) {
            url.searchParams.append('searchPhone', tel);
        }
        if (email) {
            url.searchParams.append('searchEmail', email);
        }
        if (status) {
            url.searchParams.append('status', status);
        }
        if (reservation_code) {
            url.searchParams.append('reservation_code', reservation_code);
        }
        
        // Thêm tham số phân trang
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        const response = await http.get(url.toString());

        const { results, totalCount, totalPages, currentPage } = response.data;

        // Trả về dữ liệu đã được xử lý
        return { results, totalCount, totalPages, currentPage };
    } catch (error) {
        // Xử lý lỗi và trả về lỗi
        throw new Error(error.message);
    }
};

// Lấy reservations theo ID
export const fetchReservationsID = (id) => {
    return dispatch => {
        dispatch(fetchReservationsRequest());

        const url = new URL(`${API_ENDPOINT}/${API_DATA.reservations_admin}/${id}`);

        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;
                // Dispatch action để cập nhật dữ liệu
                dispatch(fetchReservationsSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchReservationsFailure(errorMsg));
            });
    };
};

// Cập nhật trạng thái
export const updateReservations = (id, data, fullname = '', tel = '', email = '', status = '', reservation_code = '', page = 1, pageSize = 10) => {
    return (dispatch) => {
        dispatch(fetchReservationsRequest());
        http.patch(`${API_ENDPOINT}/${API_DATA.reservations_admin}/${id}`, data)
            .then((response) => {
                dispatch(fetchReservations(fullname, tel, email, status, reservation_code, page, pageSize));
            })
            .catch((error) => {
                dispatch(fetchReservationsFailure(error.message));
            });
    };
};

// Xóa
export const deleteReservations = (id, fullname = '', tel = '', email = '', status = '', reservation_code = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchReservationsRequest());
        http.delete(`${API_ENDPOINT}/${API_DATA.reservations_admin}/${id}`)
            .then(() => {
                dispatch(fetchReservations(fullname, tel, email, status, reservation_code, page, pageSize));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchReservationsFailure(errorMsg));
            });
    };
};

export const fetchExistingReservations = () => {
    return async (dispatch) => {
        dispatch(fetchReservationsRequest()); // Dispatch action bắt đầu lấy dữ liệu

        try {
            const response = await http.get(`${API_ENDPOINT}/${AdminConfig.routes.reservations_t_admin}`);
            const existingCodes = response.data; // Giả sử API trả về danh sách mã đặt chỗ
            dispatch(fetchReservationsSuccess(existingCodes)); // Dispatch action thành công với dữ liệu
            return existingCodes; // Trả về danh sách mã đặt chỗ để có thể sử dụng nó trong component
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message || 'Lỗi không xác định';
            dispatch(fetchReservationsFailure(errorMsg)); // Dispatch action lỗi
            throw new Error(errorMsg); // Ném lỗi để có thể xử lý ở nơi gọi hàm
        }
    };
};



// Thêm mới đặt bàn
export const addReservation = (reservations_t_admin) => {
    return async (dispatch) => {
        dispatch(fetchReservationsRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}/${AdminConfig.routes.reservations_t_admin}`, reservations_t_admin);
            dispatch(fetchReservationsSuccess(response.data)); // Gửi dữ liệu trả về
            dispatch(fetchReservations()); // Cập nhật danh sách đơn đặt bàn nếu cần
            return response.data; // Trả về response.data để có thể sử dụng nó trong component
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message || 'Lỗi không xác định';
            throw new Error(errorMsg); 
        }
    };
};






// Cập nhật đặt bàn
export const updateReservationOrder = (id, data) => {
    return dispatch => {
        dispatch(fetchReservationsRequest()); // Sử dụng action request hiện có
        http.patch(`${API_ENDPOINT}/${API_DATA.reservations_admin}/${id}`, data)
            .then(response => {
                // Sau khi cập nhật thành công, tải lại danh sách đặt bàn
                dispatch(fetchReservations());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchReservationsFailure(errorMsg)); // Sử dụng action failure hiện có
            });
    };
};
