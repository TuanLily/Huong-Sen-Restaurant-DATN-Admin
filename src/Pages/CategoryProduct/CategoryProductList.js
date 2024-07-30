import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProductCategory, deleteProductCategory } from '../../Actions/ProductCategoryActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import ProductCategoryPagination from '../../Components/Pagination/ProductCategoryPagination';

export default function CategoryProductList () {
    const dispatch = useDispatch();
    const productCategoryState = useSelector(state => state.product_category);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedProductCategory, setSelectedProductCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchProductCategory());
    }, [dispatch]);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(productCategoryState.product_category.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProductCategory = productCategoryState.product_category.slice(indexOfFirstProduct, indexOfLastProduct);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // const handleClickOpen = (categories_id) => {
    //     setSelectedProductCategory(categories_id);
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    //     setSelectedProductCategory(null);
    // };

    // const handleConfirm = () => {
    //     if (setSelectedProductCategory) {
    //         dispatch(deleteProductCategory(selectedProductCategory));
    //         handleClose();
    //     }
    // };

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="fw-bold mb-3">Quản lý danh mục sp</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="" className="btn btn-label-info btn-round me-2">Manage</Link>
                        <Link to="/categoryProduct/add" className="btn btn-primary btn-round">Thêm danh mục</Link>
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
                                                <th scope="col">Tên danh mục</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Ngày tạo</th>
                                                <th scope="col">Ngày cập nhật</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productCategoryState.loading && (
                                                <tr>
                                                    <td colSpan="7">Loading...</td>
                                                </tr>
                                            )}
                                            {!productCategoryState.loading && productCategoryState.product_category.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">No customers found.</td>
                                                </tr>
                                            )}
                                            {productCategoryState.error && (
                                                <tr>
                                                    <td colSpan="7">Error: {productCategoryState.error}</td>
                                                </tr>
                                            )}
                                            {productCategoryState.product_category && currentProductCategory.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <span className="badge badge-success">
                                                            {item.status == 1 ? 'Hoạt động' : 'Ngưng hoạt động'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {item.created_at.substring(0, 10)}
                                                    </td>
                                                    <td>
                                                        {item.updated_at.substring(0, 10)}
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
                                    <ProductCategoryPagination count={totalPages} onPageChange={handlePageChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <DialogConfirm open={open} onClose={handleClose} onConfirm={handleConfirm} /> */}
        </div>
    )
}