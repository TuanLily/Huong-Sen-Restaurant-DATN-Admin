import {
  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_FAILURE,
  SET_CURRENT_PAGE,
} from "../Actions/TablesActions";

const initialState = {
  allTables: [],       // Tất cả dữ liệu bảng
  tables: [],          // Dữ liệu bảng cho trang hiện tại
  currentPage: 1,      // Trang hiện tại
  pageSize: 5,         // Kích thước trang
  loading: false,      // Trạng thái loading
  error: '',           // Lưu trữ lỗi nếu có
  totalCount: 0,       // Tổng số bảng
  totalPages: 0        // Tổng số trang
};

const tablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case FETCH_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        allTables: action.payload.results || [], // Đảm bảo allTables luôn là một mảng
        totalCount: action.payload.totalCount || 0, // Tổng số bảng
        totalPages: action.payload.totalPages || 0, // Tổng số trang
        currentPage: action.payload.currentPage || 1, // Trang hiện tại
        tables: (action.payload.results || []).slice(0, state.pageSize) // Dữ liệu bảng cho trang hiện tại
      };
    case FETCH_TABLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        tables: []
      };
    case SET_CURRENT_PAGE:
      const start = (action.payload - 1) * state.pageSize;
      const end = start + state.pageSize;
      return {
        ...state,
        currentPage: action.payload,
        tables: state.allTables.slice(start, end), // Dữ liệu bảng cho trang hiện tại
      };
    default:
      return state;
  }
};

export default tablesReducer;
