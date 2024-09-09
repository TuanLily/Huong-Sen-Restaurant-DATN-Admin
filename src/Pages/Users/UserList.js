import React, { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';

import { setCurrentPage } from '../../Actions/CustomerActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';
import { SuccessAlert } from '../../Components/Alert/Alert';
import { deleteUsers, fetchUsers } from '../../Actions/UsersAction';
import { fetchRole } from '../../Actions/RoleActions';

import { getPermissions } from '../../Actions/GetQuyenHanAction';
import { jwtDecode as jwt_decode } from 'jwt-decode';

export default function CustomerList() {
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

    const userState = useSelector(state => state.users);
    const roleState = useSelector(state => state.role);

    const query = new URLSearchParams(location.search);
    const urlPage = parseInt(query.get('page')) || 1;

    const [open, setOpen] = useState(false);
    const [selectedUser, setselectedUser] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce hàm tìm kiếm để giảm số lần gọi API
    const debouncedSearch = useMemo(() => debounce((term) => {
        dispatch(fetchUsers(term, urlPage, userState.pageSize));
        dispatch(setCurrentPage(1));
    }, 1000), [dispatch, urlPage, userState.pageSize]);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    useEffect(() => {
        if (!searchTerm) {
            dispatch(fetchUsers('', urlPage, userState.pageSize));
        }
    }, [dispatch, urlPage, userState.pageSize]);

    useEffect(() => {
        if (searchTerm) {
            debouncedSearch(searchTerm);
        }
    }, [searchTerm]);

    useEffect(() => {
        navigate(`?page=${userState.currentPage}`);
    }, [userState.currentPage, navigate]);


    useEffect(() => {
        dispatch(fetchRole());
    }, [dispatch]);

    const getRoleNameById = (roleId) => {
        const role = roleState.role.find(role => role.id === roleId);
        return role ? role.name : '';
    };

    const handleClickOpen = (customerId) => {
        setselectedUser(customerId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setselectedUser(null);
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };


    const handleDelete = async () => {
        if (selectedUser) {
            try {
                await dispatch(deleteUsers(selectedUser));
                handleClose();
                setOpenSuccess(true);
            } catch (error) {
                console.error("Lỗi khi xóa tài khoản:", error);
            }
        }
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event.target.value);
    };

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    //* Hàm để chuyển trang và render dữ liệu đến trang hiện tại
    const handlePageChange = (page) => {
        navigate(`?page=${page}`); // Cập nhật URL với page
        dispatch(setCurrentPage(page)); // Cập nhật trang hiện tại trong state
        dispatch(fetchUsers(searchTerm, page, userState.pageSize));
    };


    return (
        <div className="container">
            <div className="page-inner">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="fw-bold mb-3">Quản lý tài khoản</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                    {hasPermission('Thêm tài khoản') && (<Link to="/users/add" className="btn btn-primary btn-round">Thêm tài khoản</Link>)}
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
                                                placeholder="Tìm kiếm tài khoản ở đây!"
                                                inputProps={{ 'aria-label': 'search' }}
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
                                                <th scope="col">#</th>
                                                <th scope="col">Ảnh đại diện</th>
                                                <th scope="col">Tên đầy đủ</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">SĐT</th>
                                                <th scope="col">Địa chỉ</th>
                                                <th scope="col">Loại người dùng</th>
                                                <th scope="col">Vai trò (dành cho nhân viên)</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userState.loading && (
                                                <tr>
                                                    <td colSpan="7"><CustomSpinner /></td>
                                                </tr>
                                            )}
                                            {!userState.loading && userState.user.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">Không tìm thấy tài khoản</td>
                                                </tr>
                                            )}
                                            {userState.user && userState.user.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img
                                                            className="img-fluid rounded-circle"
                                                            src={user.avatar || '../Assets/Images/default.jpg'}
                                                            alt="Avatar"
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </td>
                                                    <td>{user.fullname}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.tel}</td>
                                                    <td>{user.address}</td>
                                                    <td>
                                                        {
                                                            user.user_type == "Khách Hàng"
                                                                ? <span className="badge badge-secondary">Khách Hàng</span>
                                                                : <span className="badge badge-info">Nhân Viên</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-warning">{getRoleNameById(user.role_id)}</span>
                                                    </td>
                                                    <td>
                                                        {
                                                            user.status == 1
                                                                ? <span className="badge badge-success">Hoạt động</span>
                                                                : <span className="badge badge-danger">Ngưng hoạt động</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="btn-group" role="group">
                                                        {hasPermission('Sửa tài khoản') && (<button type="button" className="btn btn-outline-success" onClick={() => handleEdit(user.id)}>Sửa</button>)}
                                                        {hasPermission('Xóa tài khoản') && (<button type="button" className="btn btn-outline-danger" onClick={() => handleClickOpen(user.id)}><span className='text-danger'>Xóa</span></button>)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-2'>
                                    <CustomPagination
                                        count={userState.totalPages} // Tổng số trang
                                        currentPageSelector={state => state.customer.currentPage} // Selector để lấy trang hiện tại
                                        fetchAction={(page, pageSize) => fetchUsers(searchTerm, page, pageSize)} // Hàm fetch dữ liệu
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Xóa tài khoản thành công!" />
                </div>
            </div>
            <DialogConfirm
                open={open}
                onClose={handleClose}
                onConfirm={handleDelete}
            />
        </div>
    );
}
