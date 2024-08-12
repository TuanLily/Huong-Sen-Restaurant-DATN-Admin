import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteRole,
  fetchRole,
  setCurrentPage,
} from "../../Actions/RoleActions";
import DialogConfirm from "../../Components/Dialog/Dialog";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import { format } from "date-fns";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";
import { DangerAlert } from "../../Components/Alert/Alert"; // Import DangerAlert component
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function RolesList() {
  const dispatch = useDispatch();
  const roleState = useSelector((state) => state.role);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlPage = parseInt(query.get("page")) || 1;

  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State cho thanh tìm kiếm
  const [openError, setOpenError] = useState(false); // State cho DangerAlert
  const [errorMessage, setErrorMessage] = useState(""); // State cho thông báo lỗi

  useEffect(() => {
    dispatch(fetchRole(searchTerm, urlPage, roleState.pageSize));
  }, [dispatch, searchTerm, urlPage, roleState.pageSize]);

  // Cập nhật URL khi currentPage thay đổi
  useEffect(() => {
    navigate(`?page=${roleState.currentPage}`);
  }, [roleState.currentPage, navigate]);

  const handleClickOpen = (roleID) => {
    setSelectedRole(roleID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRole(null);
  };

  const handleConfirm = async () => {
    if (selectedRole) {
      try {
        await dispatch(deleteRole(selectedRole));
        handleClose();
      } catch (error) {
        setErrorMessage(error.message);
        setOpenError(true);
      }
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
    navigate(`?page=${page}`); // Cập nhật URL với page
    dispatch(setCurrentPage(page)); // Cập nhật trang hiện tại trong state
    dispatch(fetchRole(searchTerm, page, roleState.pageSize));
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
          <div>
            <h3 className="fw-bold mb-3">Quản lý vai trò</h3>
            <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
          </div>
          <div className="ms-md-auto py-2 py-md-0">
            <Link to="/role/add" className="btn btn-primary btn-round">
              Thêm vai trò
            </Link>
            <DialogConfirm />
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
                        placeholder="Tìm kiếm vai trò ở đây!"
                        inputProps={{ "aria-label": "search" }}
                        value={searchTerm}
                        onChange={handleSearch} // Thêm xử lý thay đổi từ khóa tìm kiếm
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
                        <th scope="col">Tên</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roleState.loading && (
                        <tr>
                          <td colSpan="7">
                            <CustomSpinner />
                          </td>
                        </tr>
                      )}
                      {!roleState.loading && roleState.role.length === 0 && (
                        <tr>
                          <td colSpan="7">No role found.</td>
                        </tr>
                      )}
                      {roleState.error && (
                        <tr>
                          <td colSpan="7">Error: {roleState.error}</td>
                        </tr>
                      )}
                      {roleState.role &&
                        roleState.role.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                              <div className="d-flex flex-column">
                                <span>
                                  Ngày tạo:{" "}
                                  {format(
                                    new Date(item.created_at),
                                    "dd/MM/yyyy HH:mm"
                                  )}
                                </span>
                                <span>
                                  Ngày cập nhật:{" "}
                                  {format(
                                    new Date(item.updated_at),
                                    "dd/MM/yyyy HH:mm"
                                  )}
                                </span>
                              </div>
                            </td>
                            <td>
                              {item.name === "Chưa phân loại" ? (
                                <span>...</span>
                              ) : (
                                <div className="btn-group mt-3" role="group">
                                  <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={() => handleEdit(item.id)}
                                  >
                                    Sửa
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
                    count={roleState.totalPages} // Tổng số trang
                    currentPageSelector={(state) => state.role.currentPage} // Selector để lấy trang hiện tại
                    fetchAction={(page, pageSize) =>
                      fetchRole(searchTerm, page, pageSize)
                    } // Hàm fetch dữ liệu
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
      <DangerAlert
        open={openError}
        onClose={handleErrorClose}
        message={errorMessage}
        vertical="top"
        horizontal="right"
      />
    </div>
  );
}
