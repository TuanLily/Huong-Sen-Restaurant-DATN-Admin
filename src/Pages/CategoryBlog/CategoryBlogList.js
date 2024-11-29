import React, { useEffect, useMemo, useState } from "react";
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
import { SuccessAlert } from '../../Components/Alert/Alert';
import CheckboxSelection from '../../Components/CheckboxSelection';
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";

import { getPermissions } from '../../Actions/GetQuyenHanAction';
import { jwtDecode as jwt_decode } from 'jwt-decode';

export default function CategoryBlogList() {
  const dispatch = useDispatch();
  const categoryBlogState = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlPage = parseInt(query.get("page")) || 1;

  const token = localStorage.getItem('token');
  const getQuyenHanState = useSelector(state => state.getQuyenHan);
  const permissions = getQuyenHanState.getQuyenHan || [];

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const userIdFromToken = decodedToken.id;
      dispatch(getPermissions(userIdFromToken));
    }
    const decodedToken = jwt_decode(token);
    const userIdFromToken = decodedToken.id;
    dispatch(getPermissions(userIdFromToken));
  }, [navigate, dispatch, token]);

  const hasPermission = (permissionName) => {
    return permissions.data && permissions.data.some(permission => permission.name == permissionName);
  };

  const [open, setOpen] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false);;
  const [selectedCategoryBlog, setSelectedCategoryBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce hàm tìm kiếm để giảm số lần gọi API
  const debouncedSearch = useMemo(() => debounce((term) => {
    dispatch(fetchCategoryBlog(term, urlPage, categoryBlogState.pageSize));
    dispatch(setCurrentPage(1));
  }, 1000), [dispatch, urlPage, categoryBlogState.pageSize]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchTerm) {
      dispatch(fetchCategoryBlog('', urlPage, categoryBlogState.pageSize));
    }
  }, [dispatch, searchTerm, urlPage, categoryBlogState.pageSize]);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm]);

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

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleConfirm = async () => {
    if (selectedCategoryBlog) {
      try {
        await dispatch(deleteCategoryBlog(selectedCategoryBlog));
        handleClose();
        setOpenSuccess(true); // Hiển thị thông báo thành công
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleDeletes = async (selectedIds) => {
    for (let Id of selectedIds) {
      await dispatch(deleteCategoryBlog(Id));
    }
    setOpenSuccess(true); // Hiển thị thông báo thành công
  };

  const {
    selectedItems,
    handleSelectItem,
    handleSelectAll,
    handleDeleteSelected,
    allSelected
  } = CheckboxSelection(categoryBlogState.categories, handleDeletes);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
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
            {hasPermission('Xóa danh mục bài viết') && (
              <button className="btn btn-danger btn-round me-2" onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>
                Xóa mục đã chọn
              </button>
            )}
            {hasPermission('Thêm danh mục bài viết') && (
              <Link to="/category-blog/add" className="btn btn-primary btn-round">
                Thêm danh mục
              </Link>
            )}
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
                        <th>
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={handleSelectAll}
                          />
                        </th>
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
                      {!categoryBlogState.loading && categoryBlogState.categories.length === 0 && (
                        <tr>
                          <td colSpan="4">Không tìm thấy danh mục</td>
                        </tr>
                      )}
                      {categoryBlogState.error && (
                        <tr>
                          <td colSpan="4">Error: {categoryBlogState.error}</td>
                        </tr>
                      )}
                      {categoryBlogState.allCategories &&
                        categoryBlogState.allCategories.map((item, index) => (
                          <tr key={item.id}>
                            <td>
                              {item.name == 'Chưa phân loại' ? (
                                "-"
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={selectedItems.includes(item.id)}
                                  onChange={() => handleSelectItem(item.id)}
                                />
                              )}
                            </td>
                            <td>{index + 1}</td>
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
                              {item.name !== "Chưa phân loại" && (
                                <div className="btn-group mt-3" role="group">
                                  {hasPermission('Sửa danh mục bài viết') && (
                                    <button
                                      type="button"
                                      className="btn btn-outline-success"
                                      onClick={() => handleEdit(item.id)}
                                    >
                                      <span className="text-success">Sửa</span>
                                    </button>
                                  )}
                                  {hasPermission('Xóa danh mục bài viết') && (
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger"
                                      onClick={() => handleClickOpen(item.id)}
                                    >
                                      <span className="text-danger">Xóa</span>
                                    </button>
                                  )}
                                </div>
                              )}
                              {item.name === "Chưa phân loại" && (
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  disabled
                                >
                                  Không thể thao tác
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="my-2">
                  <CustomPagination
                    count={categoryBlogState.totalPages}
                    onPageChange={handlePageChange} // Hàm chuyển trang
                    currentPageSelector={(state) => state.categories.currentPage}
                    pageSizeSelector={(state) => state.categories.limit} // Thay pageSizeSelector thành limit
                    fetchDataAction={(page, size) => fetchCategoryBlog(searchTerm, page)} // Fetch dữ liệu với searchTerm và page

                  />
                </div>
              </div>
            </div>
          </div>
          <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Xóa danh mục thành công!" />
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
