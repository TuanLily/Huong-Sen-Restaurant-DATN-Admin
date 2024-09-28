import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchReservations, deleteReservations, updateReservations, setCurrentPage } from '../../Actions/Reservations_t_AdminActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';
import { SuccessAlert } from '../../Components/Alert/Alert';

import { InputBase, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { getPermissions } from '../../Actions/GetQuyenHanAction';
import { jwtDecode as jwt_decode } from 'jwt-decode';

export default function ReservationList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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

    const [nameSearch, setNameSearch] = useState('');

    const handleNameSearch = (event) => {
        setNameSearch(event.target.value);
        dispatch(setCurrentPage(1));
    };

    const [emailSearch, setEmailSearch] = useState('');

    const handleEmailSearch = (event) => {
        setEmailSearch(event.target.value);
        dispatch(setCurrentPage(1));
    };

    const [phoneSearch, setPhoneSearch] = useState('');

    const handlePhoneSearch = (event) => {
        setPhoneSearch(event.target.value);
        dispatch(setCurrentPage(1));
    };

    const [statusSearch, setStatusSearch] = useState('');

    const handleStatusSearch = (event) => {
        setStatusSearch(event.target.value);
        dispatch(setCurrentPage(1));
    };

    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const reservationState = useSelector(state => state.reservations_Admin);

    const query = new URLSearchParams(location.search);
    const urlPage = parseInt(query.get('page')) || 1;

    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        dispatch(fetchReservations(nameSearch , phoneSearch , emailSearch , statusSearch , urlPage, reservationState.pageSize));
    }, [dispatch, urlPage, reservationState.pageSize, nameSearch, phoneSearch, emailSearch, statusSearch]);

    useEffect(() => {
        navigate(`?page=${reservationState.currentPage}`);
    }, [reservationState.currentPage, navigate]);

    const handleClickOpen = (id) => {
        setSelectedReservation(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedReservation(null);
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const handleDelete = async () => {
        if (selectedReservation) {
            try {
                await dispatch(deleteReservations(selectedReservation, nameSearch, phoneSearch, emailSearch, statusSearch, urlPage, reservationState.pageSize));
                setActiveDropdown(null);
                handleClose();
                setOpenSuccess(true); // Hiển thị thông báo thành công
            } catch (error) {
                console.error("Error deleting reservations:", error);
            }
        }
    };

    const handleUpdateStatus = async (id, st) => {
        if (id) {
            try {
                await dispatch(updateReservations(id, {status: st}, nameSearch, phoneSearch, emailSearch, statusSearch, urlPage, reservationState.pageSize));
                setActiveDropdown(null);
                handleClose();
                setOpenSuccess(true); // Hiển thị thông báo thành công
            } catch (error) {
                console.error("Error update reservations:", error);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    const handleDetail = (id) => {
        navigate(`detail/${id}`);
    };

    const formatCurrency = (value) => {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
    };

    const handlePageChange = (page) => {
        navigate(`?page=${page}`); // Cập nhật URL với page
        dispatch(setCurrentPage(page)); // Cập nhật trang hiện tại trong state
        dispatch(fetchReservations(nameSearch , phoneSearch , emailSearch , statusSearch , page, reservationState.pageSize));
    };

    const statusMapping = {
        1: { text: 'Chờ xác nhận', class: 'badge bg-secondary' },    
        2: { text: 'Chờ thanh toán cọc', class: 'badge bg-dark' },
        3: { text: 'Đã thanh toán cọc', class: 'badge bg-info' },     
        0: { text: 'Hủy đơn', class: 'badge bg-danger' },             
        4: { text: 'Hoàn tất thanh toán', class: 'badge bg-primary' },
        5: { text: 'Hoàn thành đơn', class: 'badge bg-success' }       
    };
    

    return (
        <div className="container" style={{ overflow: 'visible' }}>
            <div className="page-inner">
                <div className="pt-2 pb-4 mb-2">
                    <div>
                        <h3 className="fw-bold mb-2">Quản lý đặt bàn</h3>
                        <form className="form-inline d-flex flex-wrap justify-content-between align-items-center">
                            <div className="d-flex flex-wrap align-items-center mb-2">
                                <input type="text" className="form-control mr-2" style={{ flex: '1 1 150px', height: '38px', minWidth: '120px' }} placeholder="Tên khách hàng" aria-label="Email" value={nameSearch} onChange={handleNameSearch} /> 
                                <input type="email" className="form-control mr-2" style={{ flex: '1 1 150px', height: '38px', minWidth: '120px' }} placeholder="Email" aria-label="Email" value={emailSearch} onChange={handleEmailSearch} /> 
                                <input type="text" className="form-control mr-2" style={{ flex: '1 1 150px', height: '38px', minWidth: '120px' }} placeholder="Phone" aria-label="Phone" value={phoneSearch} onChange={handlePhoneSearch}/> 
                                <select className="form-control mr-2" style={{ flex: '1 1 150px', height: '38px', minWidth: '120px' }} value={statusSearch} onChange={handleStatusSearch}>
                                    <option value="">Trạng thái</option>
                                    <option value="0">Đã hủy</option>
                                    <option value="1">Chờ xác nhận</option>
                                    <option value="2">Chờ thanh toán cọc</option>
                                    <option value="3">Đã thanh toán cọc</option>
                                    <option value="4">Hoàn tất thanh toán</option>
                                    <option value="5">Hoàn thành đơn</option>
                                </select>
                            </div>
                            <Link to="add" className="btn btn-primary" style={{ height: '38px', borderRadius: '20px' }}>Thêm đặt bàn</Link>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Danh sách</div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive text-center">
                                    <table className="table align-items-center mb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>STT</th>
                                                <th style={{ textAlign: 'left' }}>Thông tin khách hàng</th>
                                                <th style={{ textAlign: 'left' }}>Thông tin đặt bàn</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reservationState.loading && (
                                                <tr>
                                                    <td colSpan="7"><CustomSpinner/></td>
                                                </tr>
                                            )}
                                            {!reservationState.loading && reservationState.reservation.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">Không tìm thấy danh sách nào!</td>
                                                </tr>
                                            )}
                                            {reservationState.reservation && reservationState.reservation.map((item, index) => {
                                                const stt = (reservationState.currentPage - 1) * reservationState.pageSize + index + 1;
                                                const statusInfo = statusMapping[item.status] || { text: 'Không xác định', class: 'badge-secondary' };
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{stt}</td>
                                                        <td style={{ textAlign: 'left' }}>
                                                            Họ và tên: {item.fullname}<br />
                                                            Email: {item.email}<br />
                                                            Phone: {item.tel}<br />
                                                            Số bàn: {item.tableName}
                                                        </td>
                                                        <td style={{ textAlign: 'left' }}>
                                                            Ngày đặt: {item.created_at.substring(0, 10)}<br />
                                                            Số người: {item.party_size}<br />
                                                            Tổng tiền: {formatCurrency(item.total_amount ? item.total_amount : 0)}<br />
                                                            Số tiền cọc: {item.deposit ? formatCurrency (item.deposit) : '0 VND'}<br/>
                                                            Số tiền còn lại: {formatCurrency(item.total_amount ? item.deposit ? item.total_amount - item.deposit : item.total_amount : 0)}
                                                        </td>
                                                        <td>
                                                        <span className={`badge ${statusInfo.class}`}>
                                                            {statusInfo.text}
                                                        </span>
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <div className="text-align-center">
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <button className="btn dropdown-toggle" type="button" onClick={() => toggleDropdown(index)} style={{ marginRight: '5px', backgroundColor: '#4c9fbc', color: '#fff', border: 'none' }}>
                                                                        Hành động
                                                                    </button>
                                                                    <button onClick={() => handleEdit(item.id)} className="btn" style={{ backgroundColor: '#ff6b6b', color: '#fff', marginRight: '5px', border: 'none' }}>
                                                                        <i className="fas fa-edit mr-2"></i>
                                                                    </button>
                                                                    <button onClick={() => handleDetail(item.id)} className="btn" style={{ backgroundColor: '#ffcc5c', color: '#fff', border: 'none' }}>
                                                                        <i className="fas fa-eye mr-2"></i>
                                                                    </button>

                                                                </div>
                                                                {activeDropdown === index && (
                                                                    <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 2, right: '10.5%' }}>
                                                                        <button onClick={() => handleClickOpen(item.id)} className="dropdown-item">
                                                                            <i className="fas fa-trash mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Xóa
                                                                        </button>
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={() => handleUpdateStatus(item.id , 2)} className="dropdown-item">
                                                                            <i className="fas fa-times-circle mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Chờ thanh toán cọc
                                                                        </button>
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={() => handleUpdateStatus(item.id , 3)} className="dropdown-item">
                                                                            <i className="fas fa-check-circle mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Đã thanh toán cọc
                                                                        </button>
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={() => handleUpdateStatus(item.id , 5)} className="dropdown-item">
                                                                            <i className="fas fa-check-circle mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Hoàn thanh đơn
                                                                        </button>
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={() => handleUpdateStatus(item.id , 4)} className="dropdown-item">
                                                                            <i className="fas fa-dollar-sign mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Hoàn tất thanh toán
                                                                        </button>
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={() => handleUpdateStatus(item.id , 0)} className="dropdown-item">
                                                                            <i className="fas fa-ban mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Đã Hủy
                                                                        </button>
                                                                        <div className="dropdown-divider"></div>
                                                                        <button onClick={() => handleUpdateStatus(item.id , 1)} className="dropdown-item">
                                                                            <i className="fas fa-ban mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Chờ xác nhận
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-2'>
                                    <CustomPagination
                                        count={reservationState.totalPages} // Tổng số trang
                                        currentPageSelector={state => state.reservations_Admin.currentPage} // Selector để lấy trang hiện tại
                                        fetchAction={(page, pageSize) => fetchReservations(nameSearch , phoneSearch , emailSearch , statusSearch , page , pageSize)} // Hàm fetch dữ liệu
                                        onPageChange={handlePageChange} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Thao tác thành công!" />
                </div>
            </div>
            <DialogConfirm open={open} onClose={handleClose} onConfirm={handleDelete} />
        </div>
    );
}