import {
    FETCH_AUTH_FAILURE,
    FETCH_AUTH_REQUEST,
    FETCH_AUTH_SUCCESS,
    CHECK_PASSWORD_REQUEST,
    CHECK_PASSWORD_SUCCESS,
    CHECK_PASSWORD_FAILURE
} from "../Actions/AuthActions";

const initialState = {
    loading: false,
    auth: null,
    error: '',
    passwordCheckMessage: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AUTH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_AUTH_SUCCESS:
            return {
                loading: false,
                auth: action.payload,
                error: ''
            };
        case FETCH_AUTH_FAILURE:
            return {
                loading: false,
                auth: null,
                error: action.payload
            };
        case CHECK_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                passwordCheckMessage: '',
            };
        case CHECK_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                passwordCheckMessage: action.payload,
                error: ''
            };
        case CHECK_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                passwordCheckMessage: '',
                error: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;

