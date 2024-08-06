import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProduct, deleteProduct, setCurrentPage } from '../../Actions/ProductActions';
import { fetchProductCategory } from '../../Actions/ProductCategoryActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

export default function ProductList () {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const productCategoryState = useSelector(state => state.product_category);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(fetchProductCategory());
    }, [dispatch]);

    useEffect(() => {
        if (productState.allProducts.length > 0) {
            dispatch(setCurrentPage(productState.currentPage));
            dispatch(fetchProductCategory());
        }
    }, [dispatch, productState.allProducts, productState.currentPage]);

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
            dispatch(deleteProduct(selectedProduct));
            handleClose();
        }
    };

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    const formatCurrency = (value) => {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
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
                        <Link to="" className="btn btn-label-info btn-round me-2">Manage</Link>
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
                                                    <td colSpan="7">No customers found.</td>
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
                                        count={Math.ceil((productState.allProducts).length / productState.pageSize)} 
                                        currentPageSelector={state => state.product.currentPage}
                                        fetchAction={fetchProduct}
                                        onPageChange={(page) => { dispatch(setCurrentPage(page)) }}
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