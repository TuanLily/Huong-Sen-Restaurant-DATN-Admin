import {
    FETCH_PROMOTION_REQUEST,
    FETCH_PROMOTION_SUCCESS,
    FETCH_PROMOTION_FAILURE,
    SET_CURRENT_PAGE
} from '../Actions/PromotionActions';

const initialState = {
    currentPage: 1,
    pageSize: 5,
    allPromotions: [],
    loading: false,
    promotion: [],
    error: ''
};

const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROMOTION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PROMOTION_SUCCESS:
            return {
                ...state,
                loading: false,
                allPromotions: action.payload,
                promotion: action.payload.slice(0, state.pageSize),
                // promotion: Array.isArray(action.payload) ? action.payload : [],
            };
        case FETCH_PROMOTION_FAILURE:
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
                promotion: state.allPromotions.slice(start, end)
            };
        default:
            return state;
    }
};

export default promotionReducer;

