import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteTable,
  setCurrentPage,
  fetchTables,
  updateTable,
} from "../../Actions/TablesActions";
import DialogConfirm from "../../Components/Dialog/Dialog";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";
import { FormControl, Paper, InputBase, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { SuccessAlert } from "../../Components/Alert/Alert";
import debounce from "lodash.debounce";

import { getPermissions } from "../../Actions/GetQuyenHanAction";
import { jwtDecode as jwt_decode } from "jwt-decode";

export default function TableList() {
  const dispatch = useDispatch();
  const tableState = useSelector((state) => state.tables);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlPage = parseInt(query.get("page")) || 1;

  const token = localStorage.getItem("token");
  const getQuyenHanState = useSelector((state) => state.getQuyenHan);
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
    return (
      permissions.data &&
      permissions.data.some((permission) => permission.name == permissionName)
    );
  };

  const [open, setOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [editFormData, setEditFormData] = useState({
    number: '',
    capacity: '',
    status: 1
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Debounce hàm tìm kiếm để giảm số lần gọi API
  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        dispatch(fetchTables(term, urlPage, tableState.pageSize));
        dispatch(setCurrentPage(1));
      }, 1000),
    [dispatch, urlPage, tableState.pageSize]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchTerm) {
      dispatch(fetchTables("", urlPage, tableState.pageSize)); // Fetch lại dữ liệu khi không tìm kiếm
    }
  }, [dispatch, searchTerm, urlPage, tableState.pageSize]);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm]);

  // Update URL when currentPage changes
  useEffect(() => {
    navigate(`?page=${tableState.currentPage}`);
  }, [tableState.currentPage, navigate]);

  const handleClickOpen = (tableId) => {
    setSelectedTable(tableId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTable(null);
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleConfirm = async () => {
    if (selectedTable) {
      try {
        await dispatch(deleteTable(selectedTable));
        handleClose();
        setSuccessMessage("Xóa bàn ăn thành công!");
        setOpenSuccess(true);
        const formattedDate = selectedDate.format('YYYY-MM-DD');
        dispatch(fetchListTableFilterByDate(formattedDate, urlPage, tableState.pageSize));
        dispatch(fetchTables(capacity, urlPage, tableState.pageSize));
      } catch (error) {
        console.error("Error deleting table:", error);
      }
    }
  };

  const handleEdit = (table) => {
    setEditingTable(table);
    setEditFormData({
      number: table.number,
      capacity: table.capacity,
      status: table.status
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditingTable(null);
    setEditFormData({ number: '', capacity: '', status: 1 });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await dispatch(updateTable(editingTable.id, editFormData));
      handleCloseEditModal();
      setSuccessMessage("Cập nhật bàn ăn thành công!");
      setOpenSuccess(true);
      dispatch(fetchTables(searchTerm, tableState.currentPage, tableState.pageSize));
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    dispatch(setCurrentPage(page)); // Cập nhật trang hiện tại trong state
    dispatch(fetchTables(searchTerm, page, tableState.pageSize)); // Fetch dữ liệu theo trang mới
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
          <div>
            <h3 className="fw-bold mb-3">Quản lý bàn ăn</h3>
            <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
          </div>
          <div className="ms-md-auto py-2 py-md-0">
            {(hasPermission('Thêm bàn ăn') && (
              <Link to="/tables/add" className="btn btn-primary btn-round">
                Thêm bàn ăn
              </Link>
            ))}
          </div>
        </div>

        <div className="row">
          {tableState.loading ? (
            <CustomSpinner />
          ) : tableState.tables.length === 0 ? (
            <div className="text-center">Không tìm thấy bàn ăn</div>
          ) : (
            tableState.allTables.map((item) => (
              <div key={item.id} className="col-md-3 col-sm-6 mb-3">
                <div className="card text-center">
                  <div className="card-body text-center">
                    {item.status !== 1 && (
                      <div className="status-icon">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    )}
                    <div className={`table-number ${item.status === 1 ? "bg-info" : "bg-warning"}`}>
                      {item.number}
                    </div>
                    <hr />
                    <p className="table-status">
                      {item.status === 1 ? "Bàn trống" : "Đang phục vụ"}
                    </p>
                    <p className="table-capacity">
                      Sức chứa: {item.capacity} người
                    </p>
                    <div className="btn-group" role="group">
                      {hasPermission("Sửa bàn ăn") && (
                        <button
                          type="button"
                          className="btn btn-outline-success ms-2"
                          onClick={() => handleEdit(item.id)}
                        >
                          Sửa
                        </button>
                      )}
                      {hasPermission("Xóa bàn ăn") && (
                        <button
                          type="button"
                          className="btn btn-outline-danger ms-2"
                          onClick={() => handleClickOpen(item.id)}
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <SuccessAlert
          open={openSuccess}
          onClose={handleSuccessClose}
          message={successMessage}
        />

        <DialogConfirm
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />

        <Dialog open={openEditModal} onClose={handleCloseEditModal}>
          <DialogTitle>Chỉnh sửa bàn ăn</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="number"
              label="Số bàn"
              type="text"
              fullWidth
              variant="outlined"
              value={editFormData.number}
              onChange={handleEditFormChange}
            />
            <TextField
              select
              margin="dense"
              name="capacity"
              label="Số lượng người tối đa"
              fullWidth
              variant="outlined"
              value={editFormData.capacity}
              onChange={handleEditFormChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Chọn số lượng người</option>
              <option value="2">2 người</option>
              <option value="4">4 người</option>
              <option value="6">6 người</option>
              <option value="8">8 người</option>
            </TextField>
            <TextField
              select
              margin="dense"
              name="status"
              label="Trạng thái"
              fullWidth
              variant="outlined"
              value={editFormData.status}
              onChange={handleEditFormChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value={1}>Bàn trống</option>
              <option value={0}>Có khách</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal}>Hủy</Button>
            <Button onClick={handleEditSubmit} variant="contained" color="primary">
              Lưu thay đổi
            </Button>
          </DialogActions>
        </Dialog>

        <div className="my-2">
          <CustomPagination
            count={tableState.totalPages} // Tổng số trang từ state
            onPageChange={handlePageChange} // Hàm chuyển trang
            currentPageSelector={(state) => state.tables.currentPage} // Selector lấy currentPage
            pageSizeSelector={(state) => state.tables.limit} // Thay pageSizeSelector thành limit
            fetchDataAction={(page, size) => fetchTables(searchTerm, page)} // Fetch dữ liệu với searchTerm và page
          />
        </div>
      </div>
    </div>
  );
}
