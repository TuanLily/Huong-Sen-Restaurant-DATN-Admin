import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProductCategory, deleteProductCategory, setCurrentPage } from '../../Actions/ProductCategoryActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

export default function CategoryProductList () {
    const dispatch = useDispatch();
    const productCategoryState = useSelector(state => state.product_category);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedProductCategory, setSelectedProductCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchProductCategory());
    }, [dispatch]);

    useEffect(() => {
        if (productCategoryState.allProduct_categorys.length > 0) {
            dispatch(setCurrentPage(productCategoryState.currentPage));
        }
    }, [dispatch, productCategoryState.allProduct_categorys, productCategoryState.currentPage]);

    const handleClickOpen = (categories_id) => {
        setSelectedProductCategory(categories_id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProductCategory(null);
    };

    const handleConfirm = async () => {
        if (setSelectedProductCategory) {
            dispatch(deleteProductCategory(selectedProductCategory));
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
                        <h3 className="fw-bold mb-3">Quản lý danh mục sp</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="" className="btn btn-label-info btn-round me-2">Manage</Link>
                        <Link to="/category-product/add" className="btn btn-primary btn-round">Thêm danh mục</Link>
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
                                                    <td colSpan="7"><CustomSpinner/></td>
                                                </tr>
                                            )}
                                            {!productCategoryState.loading && productCategoryState.product_category.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">No categories found.</td>
                                                </tr>
                                            )}
                                            {productCategoryState.product_category && productCategoryState.product_category.map((item, index) => {
                                                const stt = (productCategoryState.currentPage - 1) * productCategoryState.pageSize + index + 1;
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{stt}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            {item.status == 1 ? <span className="badge badge-success">Hoạt động</span> : <span className="badge badge-danger">Ngưng hoạt động</span>}
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
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-2'>
                                    <CustomPagination
                                        count={Math.ceil((productCategoryState.allProduct_categorys).length / productCategoryState.pageSize)} 
                                        currentPageSelector={state => state.product_category.currentPage}
                                        fetchAction={fetchProductCategory}
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