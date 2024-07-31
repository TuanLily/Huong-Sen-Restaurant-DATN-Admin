import {
    FETCH_ROLE_FAILURE,
    FETCH_ROLE_REQUEST,
    FETCH_ROLE_SUCCESS
} from '../Actions/RoleActions';


const initialState = {
    loading: false,
    role: [],
    error: ''
};

const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ROLE_SUCCESS:
            return {
                loading: false,
                role: Array.isArray(action.payload) ? action.payload : [],
                error: ''
            };
        case FETCH_ROLE_FAILURE:
            return {
                loading: false,
                role: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default roleReducer;

