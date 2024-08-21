import {
    FETCH_USERS_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    SET_CURRENT_PAGE
} from '../Actions/UsersAction';


const initialState = {
    allUsers: [],
    user: [],
    currentPage: 1,
    pageSize: 5,
    loading: false,
    error: '',
    totalCount: 0, // Tổng số khách hàng
    totalPages: 0 // Tổng số trang
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                allUsers: action.payload.results,
                totalCount: action.payload.totalCount,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                user: action.payload.results.slice(0, state.pageSize) // Dữ liệu cho trang hiện tại
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SET_CURRENT_PAGE:
            // Tính chỉ mục bắt đầu và kết thúc cho dữ liệu của trang hiện tại
            const start = (action.payload - 1) * state.pageSize;
            const end = start + state.pageSize;

            return {
                ...state,
                currentPage: action.payload,
                user: state.allUsers.slice(start, end) // Dữ liệu cho trang hiện tại
            };
        default:
            return state;
    }
};



export default userReducer;

