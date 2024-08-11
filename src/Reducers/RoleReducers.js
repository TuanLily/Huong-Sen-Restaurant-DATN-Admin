import {
  FETCH_ROLE_FAILURE,
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  SET_CURRENT_PAGE,
} from "../Actions/RoleActions";

const initialState = {
  allRoles: [],
  role: [],
  currentPage: 1,
  pageSize: 5, // Số lượng trên mỗi trang
  loading: false,
  error: "",
  totalCount: 0, // Tổng số nhân viên
  totalPages: 0, // Tổng số trang
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ROLE_SUCCESS:
      // Kiểm tra xem payload có phải là một đối tượng chứa dữ liệu phân trang hay không
      const {
        results = [],
        totalCount = 0,
        totalPages = 0,
        currentPage = 1,
      } = action.payload || {};

      // Đảm bảo rằng results là một mảng
      const rolesArray = Array.isArray(results) ? results : [];

      return {
        ...state,
        loading: false,
        allRoles: rolesArray,
        totalCount,
        totalPages,
        currentPage,
        // Cập nhật danh sách vai trò cho trang hiện tại
        role: rolesArray.slice(0, state.pageSize),
      };

    case FETCH_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_CURRENT_PAGE:
      const start = (action.payload - 1) * state.pageSize;
      const end = start + state.pageSize;
      return {
        ...state,
        currentPage: action.payload,
        role: state.allRoles.slice(start, end), // Chia dữ liệu cho trang hiện tại
      };
    default:
      return state;
  }
};

export default roleReducer;
