import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DialogConfirm from '../../Components/Dialog/Dialog';
import { fetchTables, deleteTable, setCurrentPage } from '../../Actions/TablesActions'; // Import setCurrentPage
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';


export default function TableList() {
    const dispatch = useDispatch();
    const tableState = useSelector(state => state.tables);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        dispatch(fetchTables());
    }, [dispatch]);

    const handleClickOpen = (tableId) => {
        setSelectedTable(tableId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTable(null);
    };

    const handleConfirm = () => {
        if (selectedTable) {
            dispatch(deleteTable(selectedTable));
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
                        <h3 className="fw-bold mb-3">Quản lý bàn ăn</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="" className="btn btn-label-info btn-round me-2">Manage</Link>
                        <Link to="/tables/add" className="btn btn-primary btn-round">Thêm bàn ăn</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Danh sách bàn</div>
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
                                                <th scope="col">Số bàn</th>
                                                <th scope="col">Loại bàn</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableState.loading && (
                                                <tr>
                                                    <td colSpan="3"><CustomSpinner /></td>
                                                </tr>
                                            )}
                                            {!tableState.loading && tableState.tables.length === 0 && (
                                                <tr>
                                                    <td colSpan="3">No tables found.</td>
                                                </tr>
                                            )}
                                            {tableState.error && (
                                                <tr>
                                                    <td colSpan="3">Error: {tableState.error}</td>
                                                </tr>
                                            )}
                                            {tableState.tables && tableState.tables.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.number}</td>
                                                    <td>{item.type === 1 ? 'Bàn Thường' : 'Bàn Vip'}</td>
                                                    <td>{item.status === 1 ? <span className='badge badge-success'>Còn bàn</span> : <span className='badge badge-danger'>Hết bàn</span>}</td>
                                                    <td>
                                                        <div className="btn-group mt-3" role="group">
                                                            <button type="button" className="btn btn-outline-success" onClick={() => handleEdit(item.id)}>
                                                                <span className='text-success'>Sửa</span>
                                                            </button>
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
                                        count={Math.ceil((tableState.allTables).length / tableState.pageSize)} 
                                        currentPageSelector={state => state.tables.currentPage} // Đảm bảo truy cập đúng state
                                        fetchAction={fetchTables}
                                        onPageChange={(page) => {
                                            dispatch(setCurrentPage(page)); // Sử dụng setCurrentPage
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
