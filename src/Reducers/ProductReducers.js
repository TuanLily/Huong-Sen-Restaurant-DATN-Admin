import {
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  SET_CURRENT_PAGE,
  SET_LIMIT, // Thêm hành động SET_LIMIT
} from "../Actions/ProductActions";

const initialState = {
  allProducts: [], // Lưu tất cả sản phẩm
  product: [], // Danh sách sản phẩm trên trang hiện tại
  currentPage: parseInt(localStorage.getItem("currentPage"), 10) || 1,
  limit: localStorage.getItem("limit")
    ? parseInt(localStorage.getItem("limit"))
    : 5, // Mặc định là 5
  loading: false,
  error: "",
  totalCount: 0,
  totalPages: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_SUCCESS: {
      const { results, totalCount, totalPages, currentPage } = action.payload;

      // Lưu thông tin trang vào localStorage
      localStorage.setItem("currentPage", currentPage);

      return {
        ...state,
        loading: false,
        allProducts: results,
        totalCount,
        totalPages,
        currentPage,
        product: results.slice(0, state.limit), // Lấy danh sách sản phẩm theo limit
      };
    }
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_CURRENT_PAGE: {
      const start = (action.payload - 1) * state.limit;
      const end = start + state.limit;

      // Lưu thông tin trang hiện tại vào localStorage
      localStorage.setItem("currentPage", action.payload);

      return {
        ...state,
        currentPage: action.payload,
        product: state.allProducts.slice(start, end), // Cập nhật danh sách sản phẩm của trang mới
      };
    }
    case SET_LIMIT: {
      const newLimit = action.payload;

      // Điều chỉnh currentPage để đảm bảo không vượt quá số trang có sẵn khi limit thay đổi
      const totalPages = Math.ceil(state.allProducts.length / newLimit); // Tổng số trang
      const currentPage =
        state.currentPage > totalPages ? totalPages : state.currentPage;

      // Tính toán lại các chỉ số start và end dựa trên currentPage và newLimit
      const start = (currentPage - 1) * newLimit;
      const end = start + newLimit;

      // Lưu limit vào localStorage
      localStorage.setItem("limit", newLimit);

      return {
        ...state,
        limit: newLimit,
        currentPage, // Cập nhật currentPage nếu cần thiết
        product: state.allProducts.slice(start, end), // Cập nhật lại danh sách sản phẩm theo limit mới
      };
    }
    default:
      return state;
  }
};

export default productReducer;
