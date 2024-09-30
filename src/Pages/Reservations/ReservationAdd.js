import { Link, useNavigate, useLocation } from 'react-router-dom';
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchProductHoatDong } from '../../Actions/ProductActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductCategoryHoatDong } from '../../Actions/ProductCategoryActions';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';
import { addReservation } from '../../Actions/Reservations_t_AdminActions';
import { SuccessAlert, DangerAlert } from "../../Components/Alert/Alert";
import { useForm } from 'react-hook-form'; // Import useForm

export default function ReservationAdd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const productState = useSelector(state => state.product);
    const productCategoryState = useSelector(state => state.product_category);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const query = new URLSearchParams(location.search);
    const urlPage = parseInt(query.get('page')) || 1;
    const [searchTerm, setSearchTerm] = useState('');
    const [quantities, setQuantities] = useState({});
    const [isOpen, setIsOpen] = useState(false); // Trạng thái cho dropdown danh sách món ăn

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            tel: '',
            reservation_date: '',
            deposit: 0,
            partySize: 0,
            notes: '',
            totalAmount: 0 // Đảm bảo totalAmount được khởi tạo
        }
    });

    const customerInfo = watch();

    useEffect(() => {
        dispatch(fetchProductHoatDong(searchTerm, urlPage, productState.pageSize));
        dispatch(fetchProductCategoryHoatDong());
    }, [dispatch, searchTerm, urlPage, productState.pageSize]);

    useEffect(() => {
        const selectedProducts = Object.entries(quantities).map(([id, quantity]) => {
            const product = productState.product.find(p => p.id === parseInt(id));
            if (product && quantity > 0) {
                return {
                    price: product.price * quantity,
                };
            }
            return null;
        }).filter(item => item !== null);

        const total = selectedProducts.reduce((sum, item) => sum + item.price, 0);
        const totalAfterDeposit = total - (customerInfo.deposit || 0);

        setValue('totalAmount', totalAfterDeposit > 0 ? totalAfterDeposit : 0);
    }, [quantities, productState.product, customerInfo.deposit, setValue]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        navigate(`?page=1`);
    };

    const handlePageChange = (page) => {
        navigate(`?page=${page}`);
        dispatch(fetchProductHoatDong(searchTerm, page, productState.pageSize));
    };

    const handleQuantityChange = (id, value) => {
        setQuantities({
            ...quantities,
            [id]: Math.max(value, 0)
        });
    };

    const formatCurrency = (value) => {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
    };

    const onSubmit = (data) => {
        const selectedProducts = Object.entries(quantities).map(([id, quantity]) => {
            const product = productState.product.find(p => p.id === parseInt(id));
            if (product && quantity > 0) {
                return {
                    product_id: product.id,
                    quantity: quantity,
                    price: product.price * quantity,
                };
            }
            return null;
        }).filter(item => item !== null);

        const total = selectedProducts.reduce((sum, item) => sum + item.price, 0);



        dispatch(addReservation({
            ...data,
            totalAmount: total,
            products: selectedProducts,
        }));

        // Điều hướng về trang khác hoặc thực hiện hành động khác nếu cần
        navigate('/reservations'); // Ví dụ: chuyển hướng đến trang danh sách đặt chỗ
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}> {/* Sử dụng handleSubmit */}
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Thêm bàn đặt</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tên khách hàng</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                                                {...register('fullname', { required: 'Tên khách hàng là bắt buộc' })}
                                                placeholder="Nhập tên khách hàng"
                                            />
                                            {errors.fullname && <div className="invalid-feedback">{errors.fullname.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                {...register('email', { required: 'Email là bắt buộc' })}
                                                placeholder="Nhập email"
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Số lượng người</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register('partySize')}
                                                placeholder="Nhập số lượng người"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Đã đặt cọc</label>
                                            <input type="number" className="form-control" {...register('deposit')} placeholder='0VND' />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Số điện thoại</label>
                                            <input
                                                type="number"
                                                className={`form-control ${errors.tel ? 'is-invalid' : ''}`}
                                                {...register('tel', { required: 'Số điện thoại là bắt buộc' })}
                                                placeholder="Nhập số điện thoại"
                                            />
                                            {errors.tel && <div className="invalid-feedback">{errors.tel.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Ngày và giờ đặt</label>
                                            <input
                                                type="datetime-local"
                                                className={`form-control ${errors.reservation_date ? 'is-invalid' : ''}`}
                                                {...register('reservation_date', { required: 'Ngày và giờ đặt là bắt buộc' })}
                                                min={new Date().toISOString().slice(0, 16)} // Thêm thuộc tính min
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select className="form-select form-control" {...register('status')}>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Tổng tiền</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register('totalAmount')}
                                                readOnly
                                                placeholder='0VND'
                                                value={formatCurrency(customerInfo.totalAmount)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className="form-group">
                                            <label>Ghi chú</label>
                                            <textarea
                                                className="form-control"
                                                {...register('notes')}
                                                style={{ width: '100%', height: '100px' }}
                                                placeholder='Nhập ghi chú nếu khách hàng yêu cầu thêm'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phần danh sách món ăn */}
                        <div className="row">
                            <div className='col-md-12'>
                                <div className="card card-round shadow">
                                    <div className="card-header d-flex justify-content-between align-items-center" onClick={toggleDropdown}>
                                        <h5 className="card-title">Danh sách món ăn</h5>
                                        <span className="caret mx-4"></span>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <div className="card-body col-md-11">
                                            <div className={`collapse ${isOpen ? 'show' : ''}`}>
                                                <div className="pb-2 rounded-bottom shadow-sm mb-4">
                                                    <div className="d-flex justify-content-between align-items-center shadow-sm rounded py-2 px-3">
                                                        <ul className="nav">
                                                            {productCategoryState.product_category && productCategoryState.product_category
                                                                .filter(category => category.name !== 'Chưa phân loại') // Loại bỏ danh mục "Chưa phân loại"
                                                                .map(category => (
                                                                    <li className="nav-item" key={category.id}>
                                                                        <Link
                                                                            to="#"
                                                                            className={`nav-link text-dark fw-bolder fs-6 ${category.id === selectedCategory ? 'active' : ''}`}
                                                                            onClick={() => setSelectedCategory(category.id)}
                                                                        >
                                                                            {category.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                        </ul>


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
                                                                    value={searchTerm}
                                                                    onChange={handleSearch}
                                                                />
                                                            </Paper>
                                                        </div>
                                                    </div>
                                                    <table className="table table-hover table-striped mt-2">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Tên</th>
                                                                <th scope="col">Đơn giá</th>
                                                                <th scope="col" className='text-center'>Số lượng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {productState.loading && <tr>
                                                                <td colSpan={4}>
                                                                    <CustomSpinner />
                                                                </td>
                                                            </tr>}
                                                            {!productState.loading && productState.product && productState.product.length > 0
                                                                ? productState.product
                                                                    .filter(product => selectedCategory === null || product.categories_id === selectedCategory) // Lọc sản phẩm theo danh mục
                                                                    .map(product => (
                                                                        <tr key={product.id}>
                                                                            <td>{product.name}</td>
                                                                            <td>{formatCurrency(product.price)}</td>
                                                                            <td className="input-group">
                                                                                <input
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    style={{ width: '300px' }}
                                                                                    value={quantities[product.id] || ''}
                                                                                    min={0}
                                                                                    onChange={e => handleQuantityChange(product.id, parseInt(e.target.value))}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                : <tr><td colSpan="4" className="text-center">Không có món ăn nào</td></tr>
                                                            }
                                                        </tbody>

                                                    </table>
                                                    <div className="row justify-content-center">
                                                        {productState.totalPages > 1 && (
                                                            <CustomPagination
                                                                page={urlPage}
                                                                totalPages={productState.totalPages}
                                                                handleChangePage={handlePageChange}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                            <button type="submit" className="btn btn-primary">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
