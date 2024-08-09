import {
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    SET_CURRENT_PAGE
} from '../Actions/ProductActions';

const initialState = {
    currentPage: 1,
    pageSize: 5,
    allProducts: [],
    loading: false,
    product: [],
    error: '',
    totalCount: 0, 
    totalPages: 0
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                allProducts: action.payload.results,
                totalCount: action.payload.totalCount,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                product: action.payload.results.slice(0, state.pageSize),
            };
        case FETCH_PRODUCT_FAILURE:
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
                product: state.allProducts.slice(start, end)
            };
        default:
            return state;
    }
};

export default productReducer;

