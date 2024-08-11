import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DialogConfirm from "../../Components/Dialog/Dialog";
import {
  fetchCategoryBlog,
  deleteCategoryBlog,
  setCurrentPage,
} from "../../Actions/BlogsCategoriesActions";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function CategoryBlogList() {
  const dispatch = useDispatch();
  const categoryBlogState = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlPage = parseInt(query.get("page")) || 1;

  const [open, setOpen] = useState(false);
  const [selectedCategoryBlog, setSelectedCategoryBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State cho thanh tìm kiếm

  // Fetch categories khi trang thay đổi hoặc khi tìm kiếm
  useEffect(() => {
    dispatch(
      fetchCategoryBlog(searchTerm, urlPage, categoryBlogState.pageSize)
    );
  }, [dispatch, urlPage, categoryBlogState.pageSize, searchTerm]);

  // Cập nhật URL khi currentPage thay đổi
  useEffect(() => {
    navigate(`?page=${categoryBlogState.currentPage}`);
  }, [categoryBlogState.currentPage, navigate]);

  const handleClickOpen = (categoryId) => {
    setSelectedCategoryBlog(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategoryBlog(null);
  };

  const handleConfirm = () => {
    if (selectedCategoryBlog) {
      dispatch(deleteCategoryBlog(selectedCategoryBlog));
      handleClose();
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    dispatch(setCurrentPage(1));
  };

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    dispatch(setCurrentPage(page));
    dispatch(fetchCategoryBlog(searchTerm, page, categoryBlogState.pageSize));
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
          <div>
            <h3 className="fw-bold mb-3">Quản lý danh mục blog</h3>
            <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
          </div>
          <div className="ms-md-auto py-2 py-md-0">
            <Link to="/category-blog/add" className="btn btn-primary btn-round">
              Thêm danh mục
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-head-row card-tools-still-right">
                  <div className="card-title">Danh sách</div>
                  <div className="card-tools">
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 320,
                      }}
                    >
                      <SearchIcon />
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Tìm kiếm danh mục blog..."
                        inputProps={{ "aria-label": "search" }}
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </Paper>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive text-center">
                  <table className="table align-items-center mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên danh mục</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryBlogState.loading && (
                        <tr>
                          <td colSpan="4">
                            <CustomSpinner />
                          </td>
                        </tr>
                      )}
                      {!categoryBlogState.loading &&
                        categoryBlogState.categories.length === 0 && (
                          <tr>
                            <td colSpan="4">Không tìm thấy danh mục</td>
                          </tr>
                        )}
                      {categoryBlogState.error && (
                        <tr>
                          <td colSpan="4">Error: {categoryBlogState.error}</td>
                        </tr>
                      )}
                      {categoryBlogState.categories &&
                        categoryBlogState.categories.map((item, index) => (
                          <tr key={item.id}>
                            <td>
                              {(categoryBlogState.currentPage - 1) *
                                categoryBlogState.pageSize +
                                index +
                                1}
                            </td>
                            <td>{item.name}</td>
                            <td>
                              {item.status === 1 ? (
                                <span className="badge badge-success">
                                  Hoạt động
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  Không hoạt động
                                </span>
                              )}
                            </td>
                            <td>
                              {item.name !== "Undefined" && (
                                <div className="btn-group mt-3" role="group">
                                  <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={() => handleEdit(item.id)}
                                  >
                                    <span className="text-success">Sửa</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => handleClickOpen(item.id)}
                                  >
                                    <span className="text-danger">Xóa</span>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="my-2">
                  <CustomPagination
                    count={categoryBlogState.totalPages} // Đây nên là totalPages, không phải allCategories.length / pageSize
                    currentPageSelector={(state) =>
                      state.categories.currentPage
                    }
                    fetchAction={(page, pageSize) =>
                      fetchCategoryBlog(searchTerm, page, pageSize)
                    }
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogConfirm
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
