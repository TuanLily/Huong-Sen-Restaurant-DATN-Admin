import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPromotion, deletePromotion } from '../../Actions/PromotionActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import PromotionPaginations from '../../Components/Pagination/PromotionPaginations';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

export default function PromotionList () {
    const dispatch = useDispatch();
    const promotionState = useSelector(state => state.promotion);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);

    useEffect(() => {
        dispatch(fetchPromotion());
    }, [dispatch]);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(promotionState.promotion.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentPromotion = promotionState.promotion.slice(indexOfFirst, indexOfLast);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClickOpen = (promotion_id) => {
        setSelectedPromotion(promotion_id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPromotion(null);
    };

    const handleConfirm = async () => {
        if (setSelectedPromotion) {
            dispatch(deletePromotion(selectedPromotion));
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
                        <h3 className="fw-bold mb-3">Quản lý khuyến mãi</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="" className="btn btn-label-info btn-round me-2">Manage</Link>
                        <Link to="/promotions/add" className="btn btn-primary btn-round">Thêm khuyến mãi</Link>
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
                                                <th scope="col">Tên khuyến mãi</th>
                                                <th scope="col">Phần trăm giảm</th>
                                                <th scope="col">Ngày bắt đầu</th>
                                                <th scope="col">Ngày kết thúc</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {promotionState.loading && (
                                                <tr>
                                                    <td colSpan="7"><CustomSpinner/></td>
                                                </tr>
                                            )}
                                            {!promotionState.loading && promotionState.promotion.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">No promotion found.</td>
                                                </tr>
                                            )}
                                            {promotionState.error && (
                                                <tr>
                                                    <td colSpan="7">Error: {promotionState.error}</td>
                                                </tr>
                                            )}
                                            {promotionState.promotion && currentPromotion.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <span className="badge badge-success">{item.discount}%</span>
                                                    </td>
                                                    <td>
                                                        {item.valid_from.substring(0, 10)}
                                                    </td>
                                                    <td>
                                                        {item.valid_to.substring(0, 10)}
                                                    </td>
                                                    <td>
                                                        <div className="btn-group mt-3" role="group">
                                                            <button type="button" className="btn btn-outline-success" onClick={() => handleEdit(item.id)}>
                                                                Sửa
                                                            </button>
                                                            <button type="button" className="btn btn-outline-danger" onClick={() => handleClickOpen(item.id)}>
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-2'>
                                    <PromotionPaginations count={totalPages} onPageChange={handlePageChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogConfirm open={open} onClose={handleClose} onConfirm={handleConfirm} />
        </div>
    )
}