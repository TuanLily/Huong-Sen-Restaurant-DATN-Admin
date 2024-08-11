import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteCommentBlog, fetchCommentBlog, setCurrentPage } from '../../Actions/CommentBlogActions';
import { fetchCustomer } from '../../Actions/CustomerActions'; // Import fetchCustomer action
import DialogConfirm from '../../Components/Dialog/Dialog';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function CommentBlogList() {
    const dispatch = useDispatch();
    const commentBlogState = useSelector(state => state.commentBlog);
    const customerState = useSelector(state => state.customer); // Get the customer data

    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const urlPage = parseInt(query.get('page')) || 1;
    const [open, setOpen] = useState(false);
    const [selectedBlogState, setSelectedBlogState] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchCustomer()); // Fetch customer data
        dispatch(fetchCommentBlog(searchTerm, urlPage, commentBlogState.pageSize));
    }, [dispatch, urlPage, commentBlogState.pageSize, searchTerm]);

    useEffect(() => {
        navigate(`?page=${commentBlogState.currentPage}`);
    }, [commentBlogState.currentPage, navigate]);

    const handleClickOpen = (commentId) => {
        setSelectedBlogState(commentId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBlogState(null);
    };

    const handleConfirm = () => {
        if (selectedBlogState) {
            dispatch(deleteCommentBlog(selectedBlogState));
            handleClose();
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        dispatch(setCurrentPage(1));
    };

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    const handlePageChange = (page) => {
        navigate(`?page=${page}`); // Update URL with page
        dispatch(setCurrentPage(page)); // Update current page in state
        dispatch(fetchCommentBlog(searchTerm, page, commentBlogState.pageSize));
    };

    // Map customer ID to customer name
    const getCustomerNameById = (id) => {
        const customer = customerState.customer.find(c => c.id === id);
        return customer ? customer.fullname : 'Unknown';
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="fw-bold mb-3">Quản lý bình luận blog</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="/comment-blog/add" className="btn btn-primary btn-round">Thêm bình luận</Link>
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
                                                placeholder="Tìm kiếm bình luận ở đây!"
                                                inputProps={{ 'aria-label': 'search' }}
                                                value={searchTerm}
                                                onChange={handleSearch} // Handle search term change
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
                                                <th scope="col">Tên khách hàng</th>
                                                <th scope="col">Nội dung</th>
                                                <th scope="col">Ngày tạo</th>
                                                <th scope="col">Ngày cập nhật</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {commentBlogState.loading && (
                                                <tr>
                                                    <td colSpan="6"><CustomSpinner /></td>
                                                </tr>
                                            )}
                                            {!commentBlogState.loading && commentBlogState.commentBlog.length === 0 && (
                                                <tr>
                                                    <td colSpan="6">Không tìm thấy bình luận</td>
                                                </tr>
                                            )}
                                            {commentBlogState.commentBlog && commentBlogState.commentBlog.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{(commentBlogState.currentPage - 1) * commentBlogState.pageSize + index + 1}</td>
                                                    <td>{getCustomerNameById(item.customer_id)}</td> {/* Display customer name */}
                                                    <td>{item.content}</td>
                                                    <td>{item.created_at}</td>
                                                    <td>{item.updated_at}</td>
                                                    <td>
                                                        <div className="btn-group mt-3" role="group">
                                                            <button type="button" className="btn btn-outline-success" onClick={() => handleEdit(item.id)}>Sửa</button>
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
                                        count={commentBlogState.totalPages}
                                        currentPageSelector={state => state.commentBlog.currentPage} 
                                        fetchAction={(page, pageSize) => fetchCommentBlog(searchTerm, page, pageSize)} 
                                        onPageChange={handlePageChange} 
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
