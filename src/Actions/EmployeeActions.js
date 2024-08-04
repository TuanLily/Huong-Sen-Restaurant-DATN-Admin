import axios from "axios";

export const FETCH_EMPLOYEE_REQUEST = 'FETCH_EMPLOYEE_REQUEST';
export const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS';
export const FETCH_EMPLOYEE_FAILURE = 'FETCH_EMPLOYEE_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';
import { fetchRole } from "./RoleActions";

export const fetchEmployeeRequest = () => ({
    type: FETCH_EMPLOYEE_REQUEST
});

export const fetchEmployeeSuccess = employees => ({
    type: FETCH_EMPLOYEE_SUCCESS,
    payload: employees
});

export const fetchEmployeeFailure = error => ({
    type: FETCH_EMPLOYEE_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const fetchEmployees = () => {
    return dispatch => {
        dispatch(fetchEmployeeRequest());
        axios.get(`${API_ENDPOINT}/${AdminConfig.routes.employee}`)
            .then(response => {
                const employees = response.data;
                dispatch(fetchEmployeeSuccess(employees));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchEmployeeFailure(errorMsg));
            });
    };
};

export const addEmployee = (employee) => {
    return dispatch => {
        dispatch(fetchEmployeeRequest());
        axios.post(`${API_ENDPOINT}/${AdminConfig.routes.employee}`, employee)
            .then(response => {
                dispatch(fetchEmployeeSuccess(response.data.data));
                dispatch(fetchEmployees()); 
                dispatch(fetchRole()); 
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchEmployeeFailure(errorMsg));
            });
    };
};

export const updateEmployee = (id, data) => {
    return dispatch => {
        dispatch(fetchEmployeeRequest());
        axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.employee}/${id}`, data)
            .then(response => {
                dispatch(fetchEmployeeSuccess(response.data)); // Điều chỉnh dựa trên cấu trúc trả về từ server
                dispatch(fetchEmployees()); // Cập nhật danh sách nhân viên sau khi cập nhật
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchEmployeeFailure(errorMsg));
            });
    };
};

export const deleteEmployee = (id) => {
    return dispatch => {
        dispatch(fetchEmployeeRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.employee}/${id}`)
            .then(() => {
                dispatch(fetchEmployees()); // Cập nhật danh sách nhân viên sau khi xóa
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchEmployeeFailure(errorMsg));
            });
    };
};
