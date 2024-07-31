import {
    FETCH_CUSTOMER_FAILURE,
    FETCH_CUSTOMER_REQUEST,
    FETCH_CUSTOMER_SUCCESS,
    SET_CURRENT_PAGE
} from '../Actions/CustomerActions';


const initialState = {
    allCustomers: [],
    customer: [],
    currentPage: 1,
    pageSize: 5, // Số lượng khách hàng trên mỗi trang
    loading: false,
    error: ''
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                allCustomers: action.payload,
                customer: action.payload.slice(0, state.pageSize) // Chia dữ liệu cho trang đầu tiên
            };
        case FETCH_CUSTOMER_FAILURE:
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
                customer: state.allCustomers.slice(start, end) // Chia dữ liệu cho trang hiện tại
            };
        default:
            return state;
    }
};


export default customerReducer;

