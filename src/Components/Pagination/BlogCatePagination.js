import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryBlog } from '../../Actions/BlogsCategoriesActions';

const BlogCatePagination = ({ count, onPageChange }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.categories.currentPage); // Giả sử bạn lưu trang hiện tại trong Redux

    const handlePageChange = (event, page) => {
        // Gọi hàm onPageChange từ props
        if (onPageChange) {
            onPageChange(page);
        }
        // Dispatch hành động để cập nhật dữ liệu cho trang hiện tại
        dispatch(fetchCategoryBlog(page));
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <Pagination
                count={count}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
            />
        </div>
    );
};

export default BlogCatePagination;
