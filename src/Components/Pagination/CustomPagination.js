import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '../../Actions/CustomerActions';
import { fetchPermissions } from '../../Actions/PermissionsActions';

const CustomPagination = ({ count, onPageChange }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.customer.currentPage); // Giả sử bạn lưu trang hiện tại trong Redux

    const handlePageChange = (event, page) => {
        // Gọi hàm onPageChange từ props
        if (onPageChange) {
            onPageChange(page);
        }
        // Dispatch hành động để cập nhật dữ liệu cho trang hiện tại
        dispatch(fetchCustomer(page));
        
        
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
