import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchListTableFilterByDate,
  deleteTable,
  setCurrentPage,
  fetchReservationDetails,
} from "../../Actions/TablesActions";
import DialogConfirm from "../../Components/Dialog/Dialog";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SuccessAlert } from "../../Components/Alert/Alert";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  // Fetch tables whenever the selected date changes
  useEffect(() => {
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    dispatch(fetchListTableFilterByDate(formattedDate, urlPage, tableState.pageSize)); // Gọi hàm để lấy danh sách bàn theo ngày
  }, [dispatch, selectedDate, urlPage]);

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
        const formattedDate = selectedDate.format('YYYY-MM-DD');
        dispatch(fetchListTableFilterByDate(formattedDate, urlPage, tableState.pageSize)); // Cập nhật lại danh sách bàn sau khi xóa
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
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    dispatch(fetchListTableFilterByDate(formattedDate, page, 8)); // Cập nhật danh sách bàn theo trang và ngày
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    dispatch(setCurrentPage(1)); // Đặt lại trang hiện tại về 1
  };

  const handleViewOrder = async (tableId) => {
    setLoadingDetails(true);
    setErrorDetails(null);
    try {
      const details = await dispatch(fetchReservationDetails(tableId));
      if (details.data && details.data.length > 0) {
        const reservationId = details.data[0].id;
        navigate(`/reservation/detail/${reservationId}`);
      } else {
        setErrorDetails("Không tìm thấy thông tin đặt bàn.");
      }
    } catch (error) {
      setErrorDetails("Không thể lấy thông tin đặt bàn.");
    } finally {
      setLoadingDetails(false);
    }
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

        <div className="my-3">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <DatePicker
              label="Chọn ngày"
              value={selectedDate}
              onChange={handleDateChange}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  size: "small",
                  sx: { width: 160 }
                }
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="row">
          {tableState.loading ? (
            <CustomSpinner />
          ) : tableState.tables.length === 0 ? (
            <div className="text-center">Không tìm thấy bàn ăn</div>
          ) : (
            tableState.tables.map((item) => (
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
                    {item.reservation_date ? (
                      <p className="table-reservation-date">
                        Ngày đặt: {dayjs(item.reservation_date).format('DD/MM/YYYY HH:mm')}
                      </p>
                    ) : (
                      <p className="table-reservation-date">Ngày đặt: Trống</p>
                    )}
                    <div className="btn-group" role="group">
                      {item.status === 0 && (
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={() => handleViewOrder(item.id)}
                        >
                          Xem đơn
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-outline-success ms-2"
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
              fetchListTableFilterByDate(selectedDate.format('YYYY-MM-DD'), page, pageSize) // Cập nhật để sử dụng hàm lọc theo ngày
            }
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
