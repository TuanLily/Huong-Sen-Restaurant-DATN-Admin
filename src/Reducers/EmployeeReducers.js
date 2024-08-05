import {
    FETCH_EMPLOYEE_FAILURE,
    FETCH_EMPLOYEE_REQUEST,
    FETCH_EMPLOYEE_SUCCESS,
    SET_CURRENT_PAGE
} from '../Actions/EmployeeActions';

const initialState = {
    allEmployees: [],
    employee: [],
    currentPage: 1,
    pageSize: 5, // Số lượng nhân viên trên mỗi trang
    loading: false,
    error: ''
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_EMPLOYEE_SUCCESS:
            const employees = Array.isArray(action.payload) ? action.payload : []; // Đảm bảo payload là một mảng
            return {
                ...state,
                loading: false,
                allEmployees: employees,
                employee: employees.slice(0, state.pageSize)
            };
        case FETCH_EMPLOYEE_FAILURE:
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
                employee: state.allEmployees.slice(start, end) // Chia dữ liệu cho trang hiện tại
            };
        default:
            return state;
    }
};

export default employeeReducer;
