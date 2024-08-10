import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchProductHoatDong, deleteProduct, updateStatus, setCurrentPage } from '../../Actions/ProductActions';
import { fetchProductCategory } from '../../Actions/ProductCategoryActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function ProductList () {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const productCategoryState = useSelector(state => state.product_category);
    const navigate = useNavigate();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const urlPage = parseInt(query.get('page')) || 1;

    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchProductHoatDong(searchTerm, urlPage, productState.pageSize));
        dispatch(fetchProductCategory());
    }, [dispatch, urlPage, productState.pageSize, searchTerm]);

    useEffect(() => {
        navigate(`?page=${productState.currentPage}`);
        dispatch(fetchProductCategory());
    }, [productState.currentPage, navigate]);

    const getCategoryName = (id) => {
        const product_category = productCategoryState.product_category.find(cat => cat.id === id);
        return product_category ? product_category.name : 'Không xác định';
    };

    const handleClickOpen = (productId) => {
        setSelectedProduct(productId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    const handleConfirm = () => {
        if (setSelectedProduct) {
            dispatch(updateStatus(selectedProduct, {status: 0}, 'list'));
            handleClose();
        }
    };

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    const formatCurrency = (value) => {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        dispatch(setCurrentPage(1));
    };

    const handlePageChange = (page) => {
        navigate(`?page=${page}`); // Cập nhật URL với page
        dispatch(setCurrentPage(page)); // Cập nhật trang hiện tại trong state
        dispatch(fetchProductHoatDong(searchTerm, page, productState.pageSize));
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="fw-bold mb-3">Quản lý sản phẩm</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="/product/tam_xoa" className="btn btn-label-info btn-round me-2">Sản phẩm tạm xóa</Link>
                        <Link to="/product/add" className="btn btn-primary btn-round">Thêm sản phẩm</Link>
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
                                                placeholder="Tìm sản phẩm ở đây!"
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
                                                <th style={{ width: '10%' }} scope="col">Hình ảnh</th>
                                                <th scope="col">Tên sản phẩm</th>
                                                <th scope="col">Mô tả</th>
                                                <th scope="col">Danh mục</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Giá</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productState.loading && (
                                                <tr>
                                                    <td colSpan="7"><CustomSpinner/></td>
                                                </tr>
                                            )}
                                            {!productState.loading && productState.product.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">Không tìm thấy sản phẩm nào!</td>
                                                </tr>
                                            )}
                                            {productState.product && productState.product.map((item, index) => {
                                                const stt = (productState.currentPage - 1) * productState.pageSize + index + 1;
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{stt}</td>
                                                        <td>
                                                            <img className="img-fluid rounded w-100" src={item.image || '../Assets/Images/default.jpg'} alt="Image"/>
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>{item.description}</td>
                                                        <td>{getCategoryName(item.categories_id)}</td>
                                                        <td>
                                                            {
                                                                item.status === 1 ? <span className="badge badge-success">Hoạt động</span> : <span className="badge badge-danger">Ngừng kinh doanh</span>
                                                            }
                                                        </td>
                                                        <td>
                                                            {item.sale_price > 0 ? (
                                                                <div>
                                                                    <span className="text-danger text-decoration-line-through">{formatCurrency(item.price)}</span>
                                                                    <div>{formatCurrency(item.price - item.sale_price)}</div>
                                                                </div>
                                                            ) : (
                                                                <div>{formatCurrency(item.price)}</div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div className="btn-group" role="group">
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
                                        count={productState.totalPages} // Tổng số trang
                                        currentPageSelector={state => state.product.currentPage} // Selector để lấy trang hiện tại
                                        fetchAction={(page, pageSize) => fetchProductHoatDong(searchTerm, page, pageSize)} // Hàm fetch dữ liệu
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