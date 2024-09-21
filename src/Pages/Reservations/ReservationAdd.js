import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchProductHoatDong } from '../../Actions/ProductActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductCategoryHoatDong } from '../../Actions/ProductCategoryActions';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';

export default function ReservationAdd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const productState = useSelector(state => state.product);
    const productCategoryState = useSelector(state => state.product_category);

    const query = new URLSearchParams(location.search);
    const urlPage = parseInt(query.get('page')) || 1;
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch product and category data
    useEffect(() => {
        dispatch(fetchProductHoatDong(searchTerm, urlPage, productState.pageSize));
        dispatch(fetchProductCategoryHoatDong());
    }, [dispatch, searchTerm, urlPage, productState.pageSize]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        navigate(`?page=1`); // Reset trang khi tìm kiếm
    };

    const handlePageChange = (page) => {
        navigate(`?page=${page}`); // Cập nhật URL với trang
        dispatch(fetchProductHoatDong(searchTerm, page, productState.pageSize)); // Fetch lại dữ liệu
    };
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        dispatch(fetchProductHoatDong(searchTerm, urlPage, productState.pageSize));
        dispatch(fetchProductCategoryHoatDong());
    }, [dispatch, searchTerm, urlPage, productState.pageSize]);

    const handleQuantityChange = (id, value) => {
        setQuantities({
            ...quantities,
            [id]: Math.max(value, 0) // Đảm bảo số lượng không nhỏ hơn 1
        });
    };
    const formatCurrency = (value) => {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
    };

    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng dropdown

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Đảo ngược trạng thái
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Thêm bàn đặt</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tên khách hàng</label>
                                            <input type="text" className="form-control" id="name" placeholder="Nhập tên khách hàng" />
                                        </div>

                                        <div className="form-group">
                                            <label for="">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="Nhập số điện thoại" />
                                        </div>

                                        <div className="form-group">
                                            <label for="">Ngày đặt</label>
                                            <input type="date" className="form-control" id="" />
                                        </div>
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select className="form-select form-control">
                                                <option>Đang chờ xác nhận</option>
                                                <option>Đã xác nhận</option>
                                                <option>Đã hủy</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="">Đã đặt cọc</label>
                                            <input type="text" className="form-control" id="" placeholder='0VND' />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="">Số điện thoại</label>
                                            <input type="number" className="form-control" id="phone" placeholder="Nhập số điện thoại" />
                                        </div>
                                        <div className="form-group">
                                            <label for="">Số lượng người</label>
                                            <input type="number" className="form-control" id="" placeholder="Nhập số lượng người" />
                                        </div>
                                        <div className="form-group">
                                            <label for="">Giờ</label>
                                            <input type="text" className="form-control" id="" placeholder='Vui lòng nhập thời gian' />
                                        </div>
                                        <div className="form-group">
                                            <label for="">Tổng tiền</label>
                                            <input type="text" className="form-control" id="" placeholder='0VND' />
                                        </div>
                                        <div className="form-group">
                                            <label for="">Ghi chú</label>
                                            <input type="text" className="form-control" id="" placeholder='Nhập ghi chú nếu khách hàng yêu cầu thêm' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-round">
                                    <div className="card-header">
                                        <div className="card-head-row card-tools-still-right">
                                            <div className="card-title">Danh sách món ăn</div>
                                            <div className="card-tools">
                                                <Paper
                                                    component="form"
                                                    sx={{
                                                        p: "2px 4px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        width: 320,
                                                    }}
                                                >
                                                    <SearchIcon />
                                                    <InputBase
                                                        sx={{ ml: 1, flex: 1 }}
                                                        placeholder="Tìm kiếm món ăn..."
                                                        inputProps={{ "aria-label": "search" }}
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
                                                        <th scope="col">Món ăn</th>
                                                        <th scope="col">Số lượng</th>
                                                        <th scope="col">Giá</th>
                                                        <th scope="col">Tổng tiền</th>
                                                        <th scope="col">Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>01</td>
                                                        <td>Bít tết</td>
                                                        <td>2</td>
                                                        <td>100.000VND</td>
                                                        <td>200.000VND</td>
                                                        <td>
                                                            <div className="btn-group mt-3" role="group">
                                                                <button type="button" className="btn btn-outline-danger">
                                                                    <Link to='/reservation/delete'><span className='text-danger'>Xóa</span></Link>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>02</td>
                                                        <td>Bít tết</td>
                                                        <td>2</td>
                                                        <td>100.000VND</td>
                                                        <td>200.000VND</td>
                                                        <td>
                                                            <div className="btn-group mt-3" role="group">
                                                                <button type="button" className="btn btn-outline-danger">
                                                                    <Link to='/reservation/delete'><span className='text-danger'>Xóa</span></Link>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className='my-2'>
                                        <CustomPagination
                                            count={productState.totalPages} 
                                            currentPageSelector={state => state.product.currentPage} 
                                            fetchAction={(page, pageSize) => fetchProductHoatDong(searchTerm, page, pageSize)} 
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className='col-md-12'>
                                <div className="card card-round shadow">
                                    <div className="card-header d-flex justify-content-between align-items-center" onClick={toggleDropdown}>
                                        <h5 className="card-title">Danh sách món ăn</h5>
                                        <span className="caret mx-4" ></span>
                                    </div>
                                    <div className=' d-flex justify-content-center'>
                                        <div className="card-body col-md-11 ">
                                            <div className={`collapse ${isOpen ? 'show' : ''}`}>
                                                <div className=" pb-2 rounded-bottom shadow-sm mb-4">
                                                    <div className="d-flex justify-content-between align-items-center shadow-sm rounded py-2 px-3">
                                                        <ul className="nav">
                                                            {productCategoryState.product_category && productCategoryState.product_category.map(category => (
                                                                <li className="nav-item" key={category.id}>
                                                                    <Link to="#" className={`nav-link text-dark fw-bolder fs-6 ${category.active ? 'active' : ''}`}>
                                                                        {category.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <div className="input-group" style={{ maxWidth: '300px' }}>
                                                            <span className="input-group-text">
                                                                <i className="fas fa-search"></i>
                                                            </span>
                                                            <input type="text" className="form-control" placeholder="Tìm kiếm món ăn ở đây..." />
                                                        </div>
                                                    </div>

                                                    <div className="table-responsive  p-3">
                                                        <table className="table table-borderless mb-0">
                                                            <tbody>
                                                                {productState.loading && (
                                                                    <tr>
                                                                        <td colSpan="3"><CustomSpinner/></td>
                                                                    </tr>
                                                                )}
                                                                {!productState.loading && productState.product.length === 0 && (
                                                                    <tr>
                                                                        <td colSpan="3">Không tìm thấy sản phẩm nào!</td>
                                                                    </tr>
                                                                )}
                                                                {productState.product && productState.product.map((item) => {
                                                                    const quantity = quantities[item.id] || 0; 
                                                                    const totalPrice = item.price * quantity;
                                                                    return (
                                                                        <tr key={item.id}>
                                                                            <td>{item.name}</td>
                                                                            <td>{formatCurrency(totalPrice)}</td>
                                                                            <td>
                                                                                <input
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    value={quantity}
                                                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className='my-2'>
                                                        <CustomPagination
                                                            count={productState.totalPages} 
                                                            currentPageSelector={state => state.product.currentPage} 
                                                            fetchAction={(page, pageSize) => fetchProductHoatDong(searchTerm, page, pageSize)}
                                                            onPageChange={handlePageChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-action">
                                                <div className="btn-group mt-3" role="group">
                                                    <button className="btn btn-success">Submit</button>
                                                    <button className="btn btn-danger">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}