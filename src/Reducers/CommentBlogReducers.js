import {
    FETCH_COMMENTBLOG_FAILURE,
    FETCH_COMMENTBLOG_REQUEST,
    FETCH_COMMENTBLOG_SUCCESS,
} from '../Actions/CommentBlogActions';

const initialState = {
    commentBlog: [],
    loading: false,
    error: ''
};

const CommentBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTBLOG_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_COMMENTBLOG_SUCCESS:
            console.log('Fetched Comments:', action.payload.results); // Log the results fetched
            return {
                ...state,
                loading: false,
                commentBlog: action.payload.results, // Update this to store comments directly
                error: ''
            };
        case FETCH_COMMENTBLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
    

export default CommentBlogReducer;
