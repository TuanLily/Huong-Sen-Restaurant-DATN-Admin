import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchTables,
  deleteTable,
  setCurrentPage,
} from "../../Actions/TablesActions";
import DialogConfirm from "../../Components/Dialog/Dialog";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SuccessAlert } from "../../Components/Alert/Alert";

export default function TableList() {
  const dispatch = useDispatch();
  const tableState = useSelector((state) => state.tables);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlPage = parseInt(query.get("page")) || 1;

  const [open, setOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [capacity, setCapacity] = useState("");

  // Fetch tables whenever the page or capacity filter changes
  useEffect(() => {
    dispatch(fetchTables(capacity, urlPage, tableState.pageSize));
  }, [dispatch, urlPage, tableState.pageSize, capacity]);

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
        setOpenSuccess(true);
        dispatch(fetchTables(capacity, tableState.currentPage, tableState.pageSize))
      } catch (error) {
        console.error("Error deleting table:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    dispatch(setCurrentPage(page));
    dispatch(fetchTables(capacity, page, tableState.pageSize));
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
            <Link to="/tables/add" className="btn btn-primary btn-round">
              Thêm bàn ăn
            </Link>
          </div>
        </div>

        {/* Capacity Filter Dropdown */}
        <div className="card-tools my-3">
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Lọc theo số người</InputLabel>
            <Select
              value={capacity}
              onChange={handleCapacityChange}
              label="Lọc theo số người"
            >
              <MenuItem value="0">Tất cả</MenuItem>
              <MenuItem value={2}>2 người</MenuItem>
              <MenuItem value={4}>4 người</MenuItem>
              <MenuItem value={6}>6 người</MenuItem>
              <MenuItem value={8}>8 người</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="row">
          {tableState.loading ? (
            <CustomSpinner />
          ) : tableState.tables.length === 0 ? (
            <div className="text-center">Không tìm thấy bàn ăn</div>
          ) : (
            tableState.tables.map((item, index) => (
              <div key={item.id} className="col-md-3 col-sm-6 mb-3">
                <div className="card text-center">
                  <div className="card-body text-center">
                    {item.status !== 1 && (
                      <div className="status-icon">
                        <i class="fa-solid fa-circle-check"></i>
                      </div>
                    )}
                    <div
                      className={`table-number ${
                        item.status === 1 ? "bg-warning" : "bg-second"
                      }`}
                    >
                      {item.number}
                    </div>
                    <hr />
                    <p className="table-status">
                      {item.status === 1 ? "Bàn trống" : "Đang phục vụ"}
                    </p>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => handleEdit(item.id)}
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger ms-2"
                        onClick={() => handleClickOpen(item.id)}
                      >
                        Xóa
                      </button>
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
          message="Xóa bàn ăn thành công!"
        />

        <DialogConfirm
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />

        <div className="my-2">
          <CustomPagination
            count={tableState.totalPages}
            currentPageSelector={(state) => state.tables.currentPage}
            fetchAction={(page, pageSize) =>
              fetchTables(capacity, page, pageSize)
            }
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
