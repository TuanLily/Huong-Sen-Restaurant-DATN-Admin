import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';

const CustomPagination = ({ count, onPageChange, currentPageSelector, fetchAction }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(currentPageSelector); // Lấy trang hiện tại từ Redux

    const handlePageChange = (event, page) => {
        if (onPageChange) {
            onPageChange(page); // Gọi hàm onPageChange từ props nếu có
        }
        dispatch(fetchAction(page)); // Dispatch hành động để cập nhật dữ liệu cho trang hiện tại
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

export default CustomPagination;