import {
    FETCH_PERMISSIONS_REQUEST,
    FETCH_PERMISSIONS_SUCCESS,
    FETCH_PERMISSIONS_FAILURE,
    SET_CURRENT_PAGE
} from '../Actions/PermissionsActions';

const initialState = {
    allPermissions: [],
    permissions: [],
    currentPage: 1,
    pageSize: 5, // Số lượng khách hàng trên mỗi trang
    loading: false,
    error: ''
};

const permissionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PERMISSIONS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_PERMISSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                allPermissions: action.payload,
                permissions: action.payload.slice(0, state.pageSize) // Chia dữ liệu cho trang đầu tiên
            };
        case FETCH_PERMISSIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SET_CURRENT_PAGE:
            const start = (action.payload - 1) * state.pageSize;
            const end = start + state.pageSize;
            return {
                ...state,
                currentPage: action.payload,
                permissions: state.allPermissions.slice(start, end) // Chia dữ liệu cho trang hiện tại
            };
        default:
            return state;
    }
};

export default permissionsReducer;

