import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchReservationsID } from '../../Actions/Reservations_t_AdminActions';
import { fetchReservationdetail } from '../../Actions/GetReservationDetailAction';
import CustomSpinner from '../../Components/Spinner/CustomSpinner';
import logo from "../../Assets/Images/huong-sen-logo.png";

export default function ReservationDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const reservationState = useSelector(state => state.reservations_Admin);
    const reservationDetailState = useSelector(state => state.reservations_Detail_Admin);

    const query = new URLSearchParams(location.search);

    useEffect(() => {
        dispatch(fetchReservationsID(id));
        dispatch(fetchReservationdetail(id));
    }, [dispatch], console.log ());

    const handlePrint = () => {
        window.print();
    };

    const formatCurrency = (value) => {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
    };

    const statusMapping = {
        1: { text: 'Chờ xác nhận', class: 'badge-warning' },
        2: { text: 'Chờ thanh toán cọc', class: 'badge-success' },
        3: { text: 'Đã thanh toán cọc', class: 'badge-info' },
        0: { text: 'Hủy đơn', class: 'badge-danger' },
        4: { text: 'Hoàn tất thanh toán', class: 'badge-primary' },
        5: { text: 'Hoàn thành đơn', class: 'badge-primary' }
    };

    return (
        <div>
            {(reservationState.loading || reservationDetailState.loading) ? (
                <CustomSpinner />
            ) : (reservationState.error || reservationDetailState.error) ? (
                <div>Error: {reservationState.error} {reservationDetailState.error}</div>

            ) : (
                <div>
                    {reservationState.reservation.length > 0 ? (
                        <div className='container' style={{ margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
                            <style>
                                {`
                                    @media print {
                                        .print-buttons {
                                            display: none; /* Ẩn nút In và Quay lại khi in */
                                        }
                                    }
            
                                    @media (max-width: 768px) {
                                        table {
                                            font-size: 14px; /* Giảm kích thước chữ trong bảng */
                                        }
            
                                        h1, h2, h3, h4 {
                                            font-size: 1.5em; /* Giảm kích thước tiêu đề */
                                        }
            
                                        .signature {
                                            flex-direction: column; /* Đặt chữ ký theo chiều dọc */
                                            align-items: center;
                                        }
            
                                        .signature div {
                                            margin-bottom: 20px;
                                        }
                                    }
                                `}
                            </style>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <h1>
                                    <img src={logo} alt="navbar brand" className="navbar-brand" width={70} height={70} />
                                </h1>
                                <h2>Nhà Hàng Hương Sen</h2>
                                <p>Nhà Hàng: Tầng 8, Số 2 Tôn Thất Tùng, Đống Đa - Hà Nội</p>
                                <p>Phone: 190030060 | Email: support@elise.vn</p>
                            </div>
            
                            <div style={{ marginBottom: '20px' }}>
                                <h3>Thông tin khách hàng</h3>
                                <p><strong>Tên:</strong> {reservationState.reservation[0].fullname}</p>
                                <p><strong>Phone:</strong> {reservationState.reservation[0].tel}</p>
                                <p><strong>Email:</strong> {reservationState.reservation[0].email}</p>
                                <p><strong>Ngày đặt:</strong> {reservationState.reservation[0].reservation_date.substring(0, 10)} | <strong>Số người:</strong> {reservationState.reservation[0].party_size} | <strong>Số bàn:</strong> {reservationState.reservation[0].tableName}</p>
                            </div>
            
                            <h3>Chi tiết đơn hàng</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>STT</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Món</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Số lượng</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Giá</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservationDetailState.reservationDetail.length > 0 ? (
                                        reservationDetailState.reservationDetail.map((item, index) => (
                                            <tr key={index}>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.product_name}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatCurrency(item.price)}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatCurrency((item.price * item.quantity))}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px' }}>
                                                Khách hàng chưa đặt món!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
            
                            {reservationDetailState.reservationDetail.length > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div>
                                        <p><strong>Thuế:</strong> 0 vnđ</p>
                                    </div>
                                    <div>
                                        <h4><strong>Tổng tiền:</strong> {formatCurrency(reservationState.reservation[0].total_amount)}</h4>
                                    </div>
                                </div>
                            )}
            
                            {reservationDetailState.reservationDetail.length > 0 && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h3>Thông tin thanh toán</h3>
                                    <p><strong>Đã cọc:</strong> {reservationState.reservation[0].deposit ? (formatCurrency(reservationState.reservation[0].deposit)) : ('0 VND')}</p>
                                    <p><strong>Giảm giá:</strong> {formatCurrency(reservationState.reservation[0].discount ? reservationState.reservation[0].total_amount * reservationState.reservation[0].discount / 100 : 0)}</p>
                                    <p><strong>Còn lại:</strong> 
                                        {
                                            reservationState.reservation[0].discount || reservationState.reservation[0].deposit
                                            ? formatCurrency(
                                                reservationState.reservation[0].total_amount 
                                                - (reservationState.reservation[0].discount ? reservationState.reservation[0].total_amount * reservationState.reservation[0].discount / 100 : 0)
                                                - (reservationState.reservation[0].deposit ? reservationState.reservation[0].deposit : 0)
                                            )
                                            : formatCurrency(reservationState.reservation[0].total_amount)
                                        }
                                    </p>
                                    <p><strong>Trạng thái:</strong> {statusMapping[reservationState.reservation[0].status].text}</p>
                                </div>  
                            )}
            
                            <div style={{ marginTop: '40px', textAlign: 'center', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }} className="signature">
                                <div>
                                    <h4>Chữ ký của khách hàng</h4>
                                    <p style={{ borderTop: '1px solid #ddd', padding: '40px 0' }}>____________________</p>
                                    <p>(Chữ ký khách hàng)</p>
                                </div>
                                <div>
                                    <h4>Chữ ký của nhân viên</h4>
                                    <p style={{ borderTop: '1px solid #ddd', padding: '40px 0' }}>____________________</p>
                                    <p>(Chữ ký nhân viên)</p>
                                </div>
                            </div>
            
                            <div style={{ textAlign: 'center', marginTop: '20px' }} className="print-buttons">
                                <button onClick={handlePrint} style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}>
                                    In
                                </button>
                                <Link to="/reservation">
                                    <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#007B9E'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#008CBA'}>
                                        Quay lại
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div>No reservation found.</div>
                    )}
                </div>
            )}
        </div>
    );
}
