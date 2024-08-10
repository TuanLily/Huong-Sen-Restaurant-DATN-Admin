import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation ,useNavigate } from 'react-router-dom';
import { deletePermissions, fetchPermissions, setCurrentPage } from '../../Actions/PermissionsActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function PermissionsList() {
    
    const dispatch = useDispatch();
    const permissionsState = useSelector(state => state.permissions);
    console.log(permissionsState);
    

    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const urlPage = parseInt(query.get('page')) || 1;

    const [open, setOpen] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        dispatch(fetchPermissions(searchTerm, urlPage, permissionsState.pageSize)); 
    }, [dispatch, urlPage, permissionsState.pageSize, searchTerm]);

    // Cập nhật URL khi currentPage thay đổi
    useEffect(() => {
        navigate(`?page=${permissionsState.currentPage}`);
    }, [permissionsState.currentPage, navigate]);

    const handleClickOpen = (permissionsId) => {
        setSelectedPermissions(permissionsId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPermissions(null);
    };

    const handleConfirm = () => {
        if (selectedPermissions) {
            dispatch(deletePermissions(selectedPermissions));
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
        navigate(`?page=${page}`); // Cập nhật URL với page
        dispatch(setCurrentPage(page)); // Cập nhật trang hiện tại trong state
        dispatch(fetchPermissions(searchTerm, page, permissionsState.pageSize));
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="fw-bold mb-3">Quản lý quyền hạn</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="/permissions/add" className="btn btn-primary btn-round">Thêm khách hàng</Link>
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
                                                p: '2px 4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: 320,
                                            }}
                                        >
                                            <SearchIcon />
                                            <InputBase
                                                sx={{ ml: 1, flex: 1 }}
                                                placeholder="Tìm kiếm quyền hạn ở đây!"
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
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên</th>
                                                <th scope="col">Ngày tạo</th>
                                                <th scope="col">Ngày cập nhật</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {permissionsState.loading && (
                                                <tr>
                                                    <td colSpan="7"><CustomSpinner /></td>
                                                </tr>
                                            )}
                                            {!permissionsState.loading && permissionsState.permissions.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">Không tìm thấy quyền hạng</td>
                                                </tr>
                                            )}
                                            {permissionsState.permissions && permissionsState.permissions.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{(permissionsState.currentPage - 1) * permissionsState.pageSize + index + 1}</td>
                                                    
                                                    <td>{item.name}</td>
                                                    <td>{item.created_at}</td>
                                                    <td>{item.updated_at}</td>
                                                    <td>
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
                                        count={permissionsState.totalPages}
                                        currentPageSelector={state => state.permissions.currentPage} 
                                        fetchAction={(page, pageSize) => fetchPermissions(searchTerm, page, pageSize)} 
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
