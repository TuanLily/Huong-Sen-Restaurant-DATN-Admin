import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteRole, fetchRole } from '../../Actions/RoleActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import RolePagination from '../../Components/Pagination/RolePagination';
import { format } from 'date-fns';

export default function RolesList() {
    const dispatch = useDispatch();
    const roleState = useSelector(state => state.role);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        dispatch(fetchRole());
    }, [dispatch]);

    const handleClickOpen = (roleID) => {
        setSelectedRole(roleID);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRole(null);
    };

    const handleConfirm = () => {
        if (selectedRole) {
            dispatch(deleteRole(selectedRole));
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
                        <h3 className="fw-bold mb-3">Quản lý khách hàng</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="#" className="btn btn-label-info btn-round me-2">Manage</Link>
                        <Link to="/role/add" className="btn btn-primary btn-round">Thêm vai trò</Link>
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
                                                <th scope="col">Tên</th>
                                                <th scope="col">Mô tả</th>
                                                <th scope="col">Ngày tạo</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {roleState?.loading && (
                                                <tr>
                                                    <td colSpan="7">Loading...</td>
                                                </tr>
                                            )}
                                            {!roleState?.loading && roleState?.role?.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">No role found.</td>
                                                </tr>
                                            )}
                                            {roleState?.error && (
                                                <tr>
                                                    <td colSpan="7">Error: {roleState?.error}</td>
                                                </tr>
                                            )}
                                            {roleState.role && roleState.role.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <div className="d-flex flex-column">
                                                        <span>Ngày tạo: {format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}</span>
                                                        <span>Ngày cập nhật: {format(new Date(item.updated_at), 'dd/MM/yyyy HH:mm')}</span>
                                                        </div>
                                                    </td>
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
                                    <RolePagination />
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
    )
}