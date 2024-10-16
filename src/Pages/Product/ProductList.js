import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProduct, deleteProduct } from '../../Actions/ProductActions';
import { fetchProductCategory } from '../../Actions/ProductCategoryActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import ProductPagination from '../../Components/Pagination/ProductPagination';

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

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(productState.product.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = productState.product.slice(indexOfFirstProduct, indexOfLastProduct);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                                                <th className='w-10' scope="col">Hình ảnh</th>
                                                <th scope="col">Tên sản phẩm</th>
                                                <th scope="col">Mô tả</th>
                                                <th scope="col">Danh mục</th>
                                                <th scope="col">Giá</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productState.loading && (
                                                <tr>
                                                    <td colSpan="7">Loading...</td>
                                                </tr>
                                            )}
                                            {!productState.loading && productState.product.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">No customers found.</td>
                                                </tr>
                                            )}
                                            {productState.error && (
                                                <tr>
                                                    <td colSpan="7">Error: {productState.error}</td>
                                                </tr>
                                            )}
                                            {productState.product && currentProducts.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                    <td>
                                                        <img className="img-fluid rounded w-100" src={item.image || '../Assets/Images/default.jpg'} alt="Image"/>
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <span className="badge badge-success">{getCategoryName(item.categories_id)}</span>
                                                    </td>
                                                    <td>
                                                        <span className="text-danger text-decoration-line-through">{item.price} VND</span>
                                                        <div>{item.sale_price} VND</div>
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
                                    <ProductPagination count={totalPages} onPageChange={handlePageChange}/>
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