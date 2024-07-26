import {
    FETCH_CUSTOMER_FAILURE,
    FETCH_CUSTOMER_REQUEST,
    FETCH_CUSTOMER_SUCCESS
} from '../Actions/CustomerActions';


const initialState = {
    loading: false,
    customer: [],
    error: ''
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_CUSTOMER_SUCCESS:
            return {
                loading: false,
                customer: Array.isArray(action.payload) ? action.payload : [],
                error: ''
            };
        case FETCH_CUSTOMER_FAILURE:
            return {
                loading: false,
                customer: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default customerReducer;

