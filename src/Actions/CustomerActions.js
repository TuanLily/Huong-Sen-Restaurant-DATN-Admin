import axios from "axios";

export const FETCH_CUSTOMER_REQUEST = 'FETCH_CUSTOMER_REQUEST';
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS';
export const FETCH_CUSTOMER_FAILURE = 'FETCH_CUSTOMER_FAILURE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';

export const fetchCustomerRequest = () => ({
    type: FETCH_CUSTOMER_REQUEST
});

export const fetchCustomerSuccess = customer => ({
    type: FETCH_CUSTOMER_SUCCESS,
    payload: customer
});

export const fetchCustomerFailure = error => ({
    type: FETCH_CUSTOMER_FAILURE,
    payload: error
});

export const fetchCustomer = () => {
    return dispatch => {
        dispatch(fetchCustomerRequest());
        axios.get(`${API_ENDPOINT}/${AdminConfig.routes.customer}`)
            .then(response => {
                const customer = response.data.results;
                dispatch(fetchCustomerSuccess(customer));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCustomerFailure(errorMsg));
            });
    };
};


export const addCustomer = (customer) => {
    return dispatch => {
        dispatch(fetchCustomerRequest());
        axios.post(`${API_ENDPOINT}/${AdminConfig.routes.customer}`, customer)
            .then(() => {
                // Sau khi thêm khách hàng mới, gọi lại fetchCustomer để làm mới danh sách
                dispatch(fetchCustomer());
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCustomerFailure(errorMsg));
            });
    };
};


// export const updateUnit = (id, data) => {
//     return (dispatch) => {
//         dispatch(fetchCustomerRequest());
//         axios.put(`https://knowledgehub.demopolyct.online/api/unit/${id}`, data)
//             .then(response => {
//                 dispatch(fetchCustomerSuccess(response.data.data));
//             })
//             .catch(error => {
//                 dispatch(fetchCustomerFailure(error.message));
//             });
//     };
// };

export const deleteCustomer = (id) => {
    return dispatch => {
        dispatch(fetchCustomerRequest());
        axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.customer}/${id}`)
            .then(() => {
                // Sau khi xóa khách hàng, gọi lại fetchCustomer để làm mới danh sách
                dispatch(fetchCustomer());
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchCustomerFailure(errorMsg));
            });
    };
};