import {
    FETCH_PRODUCT_CATEGORY_REQUEST,
    FETCH_PRODUCT_CATEGORY_SUCCESS,
    FETCH_PRODUCT_CATEGORY_FAILURE,
    SET_CURRENT_PAGE
} from '../Actions/ProductCategoryActions';


const initialState = {
    currentPage: 1,
    pageSize: 5,
    allProduct_categorys: [],
    loading: false,
    product_category: [],
    error: ''
};

const productCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                allProduct_categorys: action.payload,
                product_category: action.payload.slice(0, state.pageSize),
                // product_category: Array.isArray(action.payload) ? action.payload : [],
            };
        case FETCH_PRODUCT_CATEGORY_FAILURE:
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
                product_category: state.allProduct_categorys.slice(start, end)
            };
        default:
            return state;
    }
};

export default productCategoryReducer;

