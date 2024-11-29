import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CustomPagination = ({
    count, // Tổng số trang
    onPageChange, // Hàm callback khi đổi trang
    currentPageSelector, // Selector để lấy trang hiện tại
    pageSizeSelector, // Selector để lấy số mục mỗi trang
    fetchDataAction, // Action để gọi dữ liệu
}) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(currentPageSelector);
    const pageSize = useSelector(pageSizeSelector);

    const handlePageChange = (event, value) => {
        onPageChange(value); // Cập nhật trang
        dispatch(fetchDataAction(value, pageSize)); // Fetch dữ liệu với page và pageSize
    };

    const handleItemsPerPageChange = (event) => {
        const newLimit = parseInt(event.target.value);
        // Lưu limit vào localStorage
        localStorage.setItem('limit', newLimit);
        dispatch(fetchDataAction(1, newLimit)); // Fetch lại từ trang 1 với limit mới
    };

    return (
        <div className="d-flex justify-content-between align-items-center mt-3 px-3">
            <FormControl className="me-4" style={{ width: '120px' }}>
                <InputLabel>Số lượng mục</InputLabel>
                <Select
                    value={localStorage.getItem('limit') || pageSize} // Lấy giá trị limit từ localStorage (hoặc từ Redux state)
                    onChange={handleItemsPerPageChange}
                    label="Số lượng mục"
                    style={{ padding: '0 10px' }}
                >
                    {[5, 10, 20, 50, 100].map(size => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className="d-flex justify-content-center w-100">
                <Pagination
                    count={count}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    variant="outlined"
                />
            </div>
        </div>

    );
};

export default CustomPagination;