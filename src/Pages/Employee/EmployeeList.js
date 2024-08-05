import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    deleteEmployee,
    fetchEmployees,
    setCurrentPage,
} from "../../Actions/EmployeeActions";
import DialogConfirm from "../../Components/Dialog/Dialog";
import { fetchRole } from "../../Actions/RoleActions";
import CustomSpinner from '../../Components/Spinner/CustomSpinner';
import CustomPagination from "../../Components/Pagination/CustomPagination";

export default function EmployeeList() {
    const dispatch = useDispatch();
    const employeeState = useSelector((state) => state.employee);
    const roleState = useSelector((state) => state.role);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        dispatch(fetchEmployees());
        dispatch(fetchRole());
    }, [dispatch]);

    useEffect(() => {
        if (employeeState.allEmployees.length > 0) {
            dispatch(setCurrentPage(employeeState.currentPage));
        }
    }, [dispatch, employeeState.allEmployees, employeeState.currentPage]);

    const getRoleName = (id) => {
        const role = roleState.role.find((rol) => rol.id === id);
        return role ? role.name : "Không xác định";
    };

    const handleClickOpen = (employeeId) => {
        setSelectedEmployee(employeeId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEmployee(null);
    };

    const handleConfirm = () => {
        if (selectedEmployee) {
            dispatch(deleteEmployee(selectedEmployee));
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
                        <h3 className="fw-bold mb-3">Quản lý nhân viên</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="" className="btn btn-label-info btn-round me-2">
                            Manage
                        </Link>
                        <Link to="/employee/add" className="btn btn-primary btn-round">
                            Thêm nhân viên
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
                                                <a className="dropdown-item" href="#">
                                                    Action
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Another action
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Something else here
                                                </a>
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
                                                <th className="w-10" scope="col">
                                                    Ảnh đại diện
                                                </th>
                                                <th scope="col">Họ và tên</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Sdt</th>
                                                <th scope="col">Vai trò</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employeeState.loading && (
                                                <tr>
                                                    <td colSpan="9"><CustomSpinner/></td>
                                                </tr>
                                            )}
                                            {!employeeState.loading &&
                                                employeeState.employee.length === 0 && (
                                                    <tr>
                                                        <td colSpan="9">No employees found.</td>
                                                    </tr>
                                                )}
                                            {employeeState.employee &&
                                                employeeState.employee.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img
                                                                className="img-fluid rounded"
                                                                src={
                                                                    item.avatar || "../Assets/Images/default.jpg"
                                                                }
                                                                alt="Avatar"
                                                                width={70}
                                                            />
                                                        </td>
                                                        <td>{item.fullname}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.tel}</td>
                                                        <td>
                                                            <span className="badge" style={{backgroundColor: "green"}}>
                                                                {getRoleName(item.role_id)}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span
                                                                className="badge"
                                                                style={{
                                                                    backgroundColor:
                                                                        item.status === 1 ? "green" : "red",
                                                                    color: "white",
                                                                    
                                                                }}
                                                            >
                                                                {item.status === 1
                                                                    ? "Đang làm việc"
                                                                    : "Nghỉ việc"}
                                                            </span>
                                                        </td>
                                                        <td>
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
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="my-2">
                                <CustomPagination
                                        count={Math.ceil((employeeState.allEmployees).length / employeeState.pageSize)} currentPageSelector={state => state.employee.currentPage}
                                        fetchAction={fetchEmployees}
                                        onPageChange={(page) => {
                                            dispatch(setCurrentPage(page));
                                        }}
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
