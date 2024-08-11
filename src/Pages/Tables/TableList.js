import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchTables, deleteTable, setCurrentPage } from '../../Actions/TablesActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SuccessAlert } from '../../Components/Alert/Alert';

export default function TableList() {
  const dispatch = useDispatch();
  const tableState = useSelector(state => state.tables);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlPage = parseInt(query.get('page')) || 1;

  const [open, setOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State cho thanh tìm kiếm

  // Fetch tables khi trang thay đổi hoặc khi tìm kiếm
  useEffect(() => {
    dispatch(fetchTables(searchTerm, urlPage, tableState.pageSize));
  }, [dispatch, urlPage, tableState.pageSize, searchTerm]);

  // Cập nhật URL khi currentPage thay đổi
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
        setOpenSuccess(true); // Hiển thị thông báo thành công
      } catch (error) {
        console.error("Error deleting table:", error);
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
    dispatch(fetchTables(searchTerm, page, tableState.pageSize));
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
            <Link to="/tables/add" className="btn btn-primary btn-round">Thêm bàn ăn</Link>
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
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 320,
                      }}
                    >
                      <SearchIcon />
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Tìm kiếm bàn ăn ở đây!"
                        inputProps={{ 'aria-label': 'search' }}
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
                        <th scope="col">Số Bàn</th>
                        <th scope="col">Số Lượng Người Tối Đa</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableState.loading && (
                        <tr>
                          <td colSpan="5"><CustomSpinner /></td>
                        </tr>
                      )}
                      {!tableState.loading && tableState.tables.length === 0 && (
                        <tr>
                          <td colSpan="5">Không tìm thấy bàn ăn</td>
                        </tr>
                      )}
                      {tableState.tables && tableState.tables.map((item, index) => (
                        <tr key={item.id}>
                          <td>{(tableState.currentPage - 1) * tableState.pageSize + index + 1}</td>
                          <td>{item.number}</td>
                          <td>{item.capacity}</td>
                          <td>
                              {item.status === 1 ? (
                                <span className="badge badge-success">
                                  Bàn trống
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  Có khách
                                </span>
                              )}
                            </td>                          <td>
                            <div className="btn-group mt-3" role="group">
                              <button type="button" className="btn btn-outline-success" onClick={() => handleEdit(item.id)}>Sửa</button>
                              <button type="button" className="btn btn-outline-danger" onClick={() => handleClickOpen(item.id)}>
                                <span className='text-danger'>Xóa</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='my-2'>
                  <CustomPagination
                    count={tableState.totalPages} // Tổng số trang
                    currentPageSelector={state => state.tables.currentPage} // Selector để lấy trang hiện tại
                    fetchAction={(page, pageSize) => fetchTables(searchTerm, page, pageSize)} // Hàm fetch dữ liệu
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Xóa bàn ăn thành công!" />
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
