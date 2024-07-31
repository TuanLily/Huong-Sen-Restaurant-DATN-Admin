import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBlog, deleteBlog } from '../../Actions/BlogActions';
import DialogConfirm from '../../Components/Dialog/Dialog';
import BlogPagination from '../../Components/Pagination/BlogPagination';

export default function BlogList() {
    const dispatch = useDispatch();
    const blogState = useSelector(state => state.blog);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        dispatch(fetchBlog());
    }, [dispatch]);

    const handleClickOpen = (blogId) => {
        setSelectedBlog(blogId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBlog(null);
    };

    const handleConfirm = () => {
        if (selectedBlog) {
            dispatch(deleteBlog(selectedBlog));
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
                        <h3 className="fw-bold mb-3">Quản lý bài viết</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="" className="btn btn-label-info btn-round me-2">Manage</Link>
                        <Link to="/blogs/add" className="btn btn-primary btn-round">Thêm bài viết</Link>
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
                                                <th scope="col">Tiêu đề</th>
                                                <th scope="col">Nội dung</th>
                                                <th scope="col">Tác giả</th>
                                                <th scope='col'>Hình ảnh</th>
                                                {/* <th scope="col">Danh mục</th> */}
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blogState.loading && (
                                                <tr>
                                                    <td colSpan="7">Loading...</td>
                                                </tr>
                                            )}
                                            {!blogState.loading && blogState.blog.length === 0 && (
                                                <tr>
                                                    <td colSpan="7">No blogs found.</td>
                                                </tr>
                                            )}
                                            {blogState.error && (
                                                <tr>
                                                    <td colSpan="7">Error: {blogState.error}</td>
                                                </tr>
                                            )}
                                            {blogState.blog && blogState.blog.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.content}</td>
                                                    <td>{item.author}</td>
                                                    <td>     <img className="img-fluid rounded" src={item.poster || '../Assets/Images/default.jpg'} alt="poster" width={70} /></td>
                                                    {/* <td>
                                                        <span className="badge badge-success">{item.blog_category_id}</span>
                                                    </td> */}
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
                                    <BlogPagination />
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
