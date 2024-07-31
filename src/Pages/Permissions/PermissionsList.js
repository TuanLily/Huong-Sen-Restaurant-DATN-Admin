import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deletePermissions, fetchPermissions } from '../../Actions/PermissionsActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';

export default function PermissionsList() {
    const dispatch = useDispatch();
    const permissionsState = useSelector(state => state.permissions);
    console.log(permissionsState);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState(null);

    // Pagination state
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchPermissions(currentPage));
    }, [dispatch, currentPage]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    // Calculate paginated data
    const totalPages = Math.ceil((permissionsState.total || 0) / itemsPerPage); // Ensure total is defined
    const indexOfLastPermission = currentPage * itemsPerPage;
    const indexOfFirstPermission = indexOfLastPermission - itemsPerPage;

    // Ensure permissionsState.permissions is an array
    const currentPermissions = Array.isArray(permissionsState.permissions)
        ? permissionsState.permissions.slice(indexOfFirstPermission, indexOfLastPermission)
        : [];

    const handleClickOpen = (permissionId) => {
        setSelectedPermissions(permissionId);
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

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
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
                        <Link to="/permissions/manage" className="btn btn-label-info btn-round me-2">Manage</Link>
                        <Link to="/permissions/add" className="btn btn-primary btn-round">Thêm quyền hạn</Link>
                        <DialogConfirm />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Danh sách quyền hạn</div>
                                    <div className="card-tools">
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-icon btn-clean me-0"
                                                type="button"
                                                id="dropdownMenuButton"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="fas fa-ellipsis-h"></i>
                                            </button>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton"
                                            >
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive text-center">
                                    <table className="table align-items-center mb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên quyền hạn</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {permissionsState.loading && (
                                                <tr>
                                                    <td colSpan="3">Loading...</td>
                                                </tr>
                                            )}
                                            {!permissionsState.loading && (Array.isArray(permissionsState.permissions) && permissionsState.permissions.length === 0) && (
                                                <tr>
                                                    <td colSpan="3">No permissions found.</td>
                                                </tr>
                                            )}
                                            {permissionsState.error && (
                                                <tr>
                                                    <td colSpan="3">Error: {permissionsState.error}</td>
                                                </tr>
                                            )}
                                            {currentPermissions.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                    <td>{item.name}</td>
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
                                    <CustomPagination count={totalPages} onPageChange={handlePageChange} />
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
