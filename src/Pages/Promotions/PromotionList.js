import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchPromotion, deletePromotion, setCurrentPage } from '../../Actions/PromotionActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function PromotionList () {
    const dispatch = useDispatch();
    const promotionState = useSelector(state => state.promotion);
    const navigate = useNavigate();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const urlPage = parseInt(query.get('page')) || 1;

    const [open, setOpen] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchPromotion(searchTerm, urlPage, promotionState.pageSize));
    }, [dispatch, urlPage, promotionState.pageSize, searchTerm]);

    useEffect(() => {
        navigate(`?page=${promotionState.currentPage}`);
    }, [promotionState.currentPage, navigate]);

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        dispatch(setCurrentPage(1));
    };

    const handlePageChange = (page) => {
        navigate(`?page=${page}`); // Cập nhật URL với page
        dispatch(setCurrentPage(page)); // Cập nhật trang hiện tại trong state
        dispatch(fetchPromotion(searchTerm, page, promotionState.pageSize));
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
                                                placeholder="Tìm kiếm mã ở đây!"
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
                                                <th scope="col">Mã khuyến mãi</th>
                                                <th scope="col">Phần trăm giảm</th>
                                                <th scope="col">Số lần</th>
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
                                                    <td colSpan="7">Không tìm thấy mã nào!</td>
                                                </tr>
                                            )}
                                            {promotionState.promotion && promotionState.promotion.map((item, index) => {
                                                const stt = (promotionState.currentPage - 1) * promotionState.pageSize + index + 1;
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{stt}</td>
                                                        <td>{item.code_name}</td>
                                                        <td>
                                                            <span className="badge badge-success">{item.discount}%</span>
                                                        </td>
                                                        <td>{item.quantity}</td>
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
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-2'>
                                    <CustomPagination
                                        count={promotionState.totalPages} // Tổng số trang
                                        currentPageSelector={state => state.promotion.currentPage} // Selector để lấy trang hiện tại
                                        fetchAction={(page, pageSize) => fetchPromotion(searchTerm, page, pageSize)} // Hàm fetch dữ liệu
                                        onPageChange={handlePageChange} 
                                    />
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