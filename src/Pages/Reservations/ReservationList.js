import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

export default function ReservationList() {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="pt-2 pb-4 mb-2">
                    <div>
                        <h3 className="fw-bold mb-2">Quản lý đặt bàn</h3>
                        <form className="form-inline d-flex flex-wrap justify-content-between align-items-center">
                            <div className="d-flex flex-wrap align-items-center mb-2">
                                <input type="text" className="form-control mr-2" style={{ flex: '1 1 200px', height: '38px', minWidth: '150px' }} placeholder="Tên khách hàng" aria-label="Tên khách hàng" />
                                <input type="email" className="form-control mr-2" style={{ flex: '1 1 200px', height: '38px', minWidth: '150px' }} placeholder="Email" aria-label="Email" />
                                <input type="text" className="form-control mr-2" style={{ flex: '1 1 150px', height: '38px', minWidth: '120px' }} placeholder="Phone" aria-label="Phone" />
                                <select className="form-control mr-2" style={{ flex: '1 1 150px', height: '38px', minWidth: '120px' }}>
                                    <option value="">Trạng thái</option>
                                    <option value="pending">Chưa xác nhận</option>
                                    <option value="paid">Đã thanh toán</option>
                                </select>
                            </div>
                            <button type="button" className="btn btn-primary" style={{ height: '38px', borderRadius: '20px' }}>Thêm đặt bàn</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Danh sách</div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive text-center">
                                    <table className="table align-items-center mb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>STT</th>
                                                <th style={{ textAlign: 'left' }}>Thông tin khách hàng</th>
                                                <th style={{ textAlign: 'left' }}>Thông tin đặt bàn</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                {
                                                    id: 1,
                                                    customerName: 'Nguyễn Văn A',
                                                    email: 'nguyenvana@gmail.com',
                                                    phone: '0359020898',
                                                    date: '2023-04-02',
                                                    time: '11:00',
                                                    numberOfPeople: 12,
                                                    totalAmount: '5.310.000 đ',
                                                    deposit: '0 đ',
                                                    status: 'Chưa xác nhận',
                                                },
                                                {
                                                    id: 2,
                                                    customerName: 'A',
                                                    email: 'a@gmail.com',
                                                    phone: '0928817228',
                                                    date: '2023-03-30',
                                                    time: '11:30',
                                                    numberOfPeople: 1,
                                                    totalAmount: '360.000 đ',
                                                    deposit: '0 đ',
                                                    status: 'Đã thanh toán',
                                                },
                                                {
                                                    id: 3,
                                                    customerName: 'A',
                                                    email: 'a@gmail.com',
                                                    phone: '0928817228',
                                                    date: '2023-03-30',
                                                    time: '11:30',
                                                    numberOfPeople: 1,
                                                    totalAmount: '360.000 đ',
                                                    deposit: '0 đ',
                                                    status: 'Đã thanh toán',
                                                },
                                                {
                                                    id: 4,
                                                    customerName: 'A',
                                                    email: 'a@gmail.com',
                                                    phone: '0928817228',
                                                    date: '2023-03-30',
                                                    time: '11:30',
                                                    numberOfPeople: 1,
                                                    totalAmount: '360.000 đ',
                                                    deposit: '0 đ',
                                                    status: 'Đã thanh toán',
                                                },
                                                {
                                                    id: 5,
                                                    customerName: 'A',
                                                    email: 'a@gmail.com',
                                                    phone: '0928817228',
                                                    date: '2023-03-30',
                                                    time: '11:30',
                                                    numberOfPeople: 1,
                                                    totalAmount: '360.000 đ',
                                                    deposit: '0 đ',
                                                    status: 'Đã thanh toán',
                                                },
                                            ].map((reservation, index) => (
                                                <tr key={reservation.id}>
                                                    <td>{reservation.id}</td>
                                                    <td style={{ textAlign: 'left' }}>
                                                        Họ và tên: {reservation.customerName}<br />
                                                        Email: {reservation.email}<br />
                                                        Phone: {reservation.phone}
                                                    </td>
                                                    <td style={{ textAlign: 'left' }}>
                                                        Ngày đặt: {reservation.date}<br />
                                                        Giờ tới: {reservation.time}<br />
                                                        Số người: {reservation.numberOfPeople}<br />
                                                        Tổng tiền: {reservation.totalAmount}<br />
                                                        Số tiền cọc: {reservation.deposit}
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${reservation.status === 'Chưa xác nhận' ? 'badge-warning' : 'badge-success'}`}>
                                                            {reservation.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div className="text-align-center">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <button className="btn btn-info dropdown-toggle" type="button" onClick={() => toggleDropdown(index)} style={{ marginRight: '5px' }}>
                                                                    Hành động
                                                                </button>
                                                                <button className="btn" style={{ backgroundColor: '#ff69b4', color: '#fff', marginRight: '5px' }}>
                                                                    <i className="fas fa-edit mr-2"></i>
                                                                </button>
                                                                <button className="btn" style={{ backgroundColor: '#28a745', color: '#fff' }}>
                                                                    <i className="fas fa-eye mr-2"></i>
                                                                </button>
                                                            </div>
                                                            {activeDropdown === index && (
                                                                <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 2, right: '10.7%' }}>
                                                                    <button className="dropdown-item">
                                                                        <i className="fas fa-trash mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Xóa
                                                                    </button>
                                                                    <div className="dropdown-divider"></div>
                                                                    <button className="dropdown-item">
                                                                        <i className="fas fa-times-circle mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Chưa thanh toán cọc
                                                                    </button>
                                                                    <div className="dropdown-divider"></div>
                                                                    <button className="dropdown-item">
                                                                        <i className="fas fa-check-circle mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Đã thanh toán cọc
                                                                    </button>
                                                                    <div className="dropdown-divider"></div>
                                                                    <button className="dropdown-item">
                                                                        <i className="fas fa-dollar-sign mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Đã thanh toán
                                                                    </button>
                                                                    <div className="dropdown-divider"></div>
                                                                    <button className="dropdown-item">
                                                                        <i className="fas fa-ban mr-2" style={{ minWidth: '20px', textAlign: 'center' }}></i> Đã Hủy
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-2'>
                                    <div className="d-flex justify-content-center align-items-center mt-3">
                                        <Pagination
                                            count={4}
                                            page={1}
                                            onChange={1}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}