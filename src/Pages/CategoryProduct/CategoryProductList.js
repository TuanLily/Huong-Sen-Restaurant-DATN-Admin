import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchProductCategoryHoatDong, fetchProductCategory, deleteProductCategory, setCurrentPage } from '../../Actions/ProductCategoryActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';
import CheckboxSelection from '../../Components/CheckboxSelection';
import { SuccessAlert } from '../../Components/Alert/Alert';

import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';

import { getPermissions } from '../../Actions/GetQuyenHanAction';
import { jwtDecode as jwt_decode } from 'jwt-decode';

export default function CategoryProductList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const token = localStorage.getItem('token');
    const getQuyenHanState = useSelector(state => state.getQuyenHan);
    const permissions = getQuyenHanState.getQuyenHan || [];

    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            const userIdFromToken = decodedToken.id;
            dispatch(getPermissions(userIdFromToken));
        }
        const decodedToken = jwt_decode(token);
        const userIdFromToken = decodedToken.id;
        dispatch(getPermissions(userIdFromToken));
    }, [navigate, dispatch, token]);

    const hasPermission = (permissionName) => {
        return permissions.data && permissions.data.some(permission => permission.name == permissionName);
    };

    const productCategoryState = useSelector(state => state.product_category);

    const query = new URLSearchParams(location.search);
    const urlPage = parseInt(query.get('page')) || 1;

    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [selectedProductCategory, setSelectedProductCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce hàm tìm kiếm để giảm số lần gọi API
    const debouncedSearch = useMemo(() => debounce((term) => {
        dispatch(fetchProductCategoryHoatDong(term, urlPage, productCategoryState.pageSize));
        dispatch(setCurrentPage(1));
    }, 1000), [dispatch, urlPage, productCategoryState.pageSize]);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    useEffect(() => {
        if (!searchTerm) {
            dispatch(fetchProductCategory('', urlPage, productCategoryState.pageSize));
        }
    }, [dispatch, urlPage, productCategoryState.pageSize]);

    useEffect(() => {
        if (searchTerm) {
            debouncedSearch(searchTerm);
        }
    }, [searchTerm]);

    useEffect(() => {
        navigate(`?page=${productCategoryState.currentPage}`);
    }, [productCategoryState.currentPage, navigate]);

    const handleClickOpen = (categories_id) => {
        setSelectedProductCategory(categories_id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProductCategory(null);
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const handleConfirm = async () => {
        if (setSelectedProductCategory) {
            try {
                await dispatch(deleteProductCategory(selectedProductCategory, searchTerm, urlPage, productCategoryState.pageSize));
                handleClose();
                setOpenSuccess(true); // Hiển thị thông báo thành công
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };

    const handleDeleteProductsCategory = async (selectedProductIds) => {
        for (let Id of selectedProductIds) {
            await dispatch(deleteProductCategory(Id, searchTerm, urlPage, productCategoryState.pageSize));
        }
        setOpenSuccess(true); // Hiển thị thông báo thành công
    };

    const {
        selectedItems,
        handleSelectItem,
        handleSelectAll,
        handleDeleteSelected,
        allSelected
    } = CheckboxSelection(productCategoryState.product_category, handleDeleteProductsCategory);

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event.target.value);
    };

    const handlePageChange = (page) => {
        navigate(`?page=${page}`); // Cập nhật URL với page
        dispatch(setCurrentPage(page)); // Cập nhật trang hiện tại trong state
        dispatch(fetchProductCategory(searchTerm, page, productCategoryState.pageSize));
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="fw-bold mb-3">Quản lý danh mục sản phẩm</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        {hasPermission('Xóa danh mục sản phẩm') && (
                            <button className="btn btn-danger btn-round me-2" onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>
                                Xóa mục đã chọn
                            </button>
                        )}
                        {hasPermission('Thêm danh mục sản phẩm') && (<Link to="/category-product/add" className="btn btn-primary btn-round">Thêm danh mục</Link>)}
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
                                                placeholder="Tìm kiếm danh mục ở đây!"
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
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        checked={allSelected}
                                                        onChange={handleSelectAll}
                                                    />
                                                </th>
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
                                                    <td colSpan="7"><CustomSpinner /></td>
                                                </tr>
                                            )}
                                            {!productCategoryState.loading && productCategoryState.allProduct_categorys.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">Không tìm thấy mã nào!</td>
                                                </tr>
                                            )}
                                            {productCategoryState.allProduct_categorys && productCategoryState.allProduct_categorys.map((item, index) => {
                                                const stt = (productCategoryState.currentPage - 1) * productCategoryState.pageSize + index + 1;
                                                return (
                                                    <tr key={item.id}>
                                                        <td>
                                                            {item.name === 'Chưa phân loại' ? (
                                                                "-"
                                                            ) : (
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedItems.includes(item.id)}
                                                                    onChange={() => handleSelectItem(item.id)}
                                                                />
                                                            )}
                                                        </td>
                                                        <td>{stt}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            {item.status === 1 && <span className="badge badge-success">Hoạt động</span>}
                                                            {item.status === 3 && <span className="badge badge-warning">Mặc định</span>}
                                                            {item.status === 0 && <span className="badge badge-danger">Ngưng hoạt động</span>}
                                                        </td>
                                                        <td>
                                                            {item.created_at.substring(0, 10)}
                                                        </td>
                                                        <td>
                                                            {item.updated_at.substring(0, 10)}
                                                        </td>
                                                        <td>
                                                            {item.name === 'Chưa phân loại' ? (
                                                                <div className="btn-group mt-3" role="group">
                                                                    <button type="button" className="btn btn-outline-warning">
                                                                        Không thể thao tác
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="btn-group mt-3" role="group">
                                                                    {hasPermission('Sửa danh mục sản phẩm') && (
                                                                        <button type="button" className="btn btn-outline-success" onClick={() => handleEdit(item.id)}>
                                                                            Sửa
                                                                        </button>
                                                                    )}
                                                                    {hasPermission('Xóa danh mục sản phẩm') && (
                                                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleClickOpen(item.id)}>
                                                                            Xóa
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-2'>
                                    <CustomPagination
                                        count={productCategoryState.totalPages} // Tổng số trang
                                        currentPageSelector={state => state.product_category.currentPage} // Selector để lấy trang hiện tại
                                        fetchAction={(page, pageSize) => fetchProductCategoryHoatDong(searchTerm, page, pageSize)} // Hàm fetch dữ liệu
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Xóa danh mục thành công!" />
                </div>
            </div>
            <DialogConfirm open={open} onClose={handleClose} onConfirm={handleConfirm} />
        </div>
    )
}