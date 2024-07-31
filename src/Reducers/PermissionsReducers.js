import {
    FETCH_PERMISSIONS_REQUEST,
    FETCH_PERMISSIONS_SUCCESS,
    FETCH_PERMISSIONS_FAILURE
} from '../Actions/PermissionsActions';

const initialState = {
    permissions: [],
    loading: false,
    error: null,
    currentPage: 1, // Nếu bạn lưu trạng thái trang hiện tại
    total: 0 // Tổng số lượng mục (nếu cần thiết)
};

const permissionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PERMISSIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_PERMISSIONS_SUCCESS:
            return {
                loading: false,
                permissions: Array.isArray(action.payload) ? action.payload : [],
                currentPage: action.payload.page, // Nếu API trả về số trang hiện tại
                total: action.payload.total ,
                error: ''
            };
        case FETCH_PERMISSIONS_FAILURE:
            return {
                loading: false,
                permissions: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default permissionsReducer;

