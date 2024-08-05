import {
  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_FAILURE,
  SET_CURRENT_PAGE,
} from "../Actions/TablesActions";

const initialState = {
  loading: false,
  tables: [],
  error: "",
  allTables: [],
  currentPage: 1,
  pageSize: 5,
};

const tablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        allTables: action.payload || [], // Đảm bảo allTables luôn là một mảng
        error: "",
        tables: (action.payload || []).slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize),
      };
    case FETCH_TABLE_FAILURE:
      return {
        ...state,
        loading: false,
        tables: [],
        error: action.payload,
      };
    case SET_CURRENT_PAGE:
      const start = (action.payload - 1) * state.pageSize;
      const end = start + state.pageSize;
      return {
        ...state,
        currentPage: action.payload,
        tables: state.allTables.slice(start, end), // Chia dữ liệu cho trang hiện tại
      };
    default:
      return state;
  }
};

export default tablesReducer;

