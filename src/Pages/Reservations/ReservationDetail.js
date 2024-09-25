// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
// import { fetchReservationsID } from '../../Actions/Reservations_t_AdminActions';
// import { fetchReservationdetail } from '../../Actions/GetReservationDetailAction';
// import CustomSpinner from '../../Components/Spinner/CustomSpinner';
// import logo from "../../Assets/Images/huong-sen-logo.png";

// export default function ReservationDetail() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const reservationState = useSelector(state => state.reservations_Admin);
//     const reservationDetailState = useSelector(state => state.reservations_Detail_Admin);

//     const query = new URLSearchParams(location.search);

//     useEffect(() => {
//         dispatch(fetchReservationsID(id));
//         dispatch(fetchReservationdetail(id));
//     }, [dispatch], console.log ());

//     const handlePrint = () => {
//         window.print();
//     };

//     const formatCurrency = (value) => {
//         return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
//     };

//     const statusMapping = {
//         1: { text: 'Chờ xác nhận', class: 'badge-warning' },
//         2: { text: 'Chờ thanh toán cọc', class: 'badge-success' },
//         3: { text: 'Đã thanh toán cọc', class: 'badge-info' },
//         0: { text: 'Hủy đơn', class: 'badge-danger' },
//         4: { text: 'Hoàn tất thanh toán', class: 'badge-primary' },
//         5: { text: 'Hoàn thành đơn', class: 'badge-primary' }
//     };

//     return (
//         <div>
//             {(reservationState.loading || reservationDetailState.loading) ? (
//                 <CustomSpinner />
//             ) : (reservationState.error || reservationDetailState.error) ? (
//                 <div>Error: {reservationState.error} {reservationDetailState.error}</div>

//             ) : (
//                 <div>
//                     {reservationState.reservation.length > 0 ? (
//                         <div className='container' style={{ margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
//                             <style>
//                                 {`
//                                     @media print {
//                                         .print-buttons {
//                                             display: none; /* Ẩn nút In và Quay lại khi in */
//                                         }
//                                     }
            
//                                     @media (max-width: 768px) {
//                                         table {
//                                             font-size: 14px; /* Giảm kích thước chữ trong bảng */
//                                         }
            
//                                         h1, h2, h3, h4 {
//                                             font-size: 1.5em; /* Giảm kích thước tiêu đề */
//                                         }
            
//                                         .signature {
//                                             flex-direction: column; /* Đặt chữ ký theo chiều dọc */
//                                             align-items: center;
//                                         }
            
//                                         .signature div {
//                                             margin-bottom: 20px;
//                                         }
//                                     }
//                                 `}
//                             </style>
//                             <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                                 <h1>
//                                     <img src={logo} alt="navbar brand" className="navbar-brand" width={70} height={70} />
//                                 </h1>
//                                 <h2>Nhà Hàng Hương Sen</h2>
//                                 <p>Nhà Hàng: Tầng 8, Số 2 Tôn Thất Tùng, Đống Đa - Hà Nội</p>
//                                 <p>Phone: 190030060 | Email: support@elise.vn</p>
//                             </div>
            
//                             <div style={{ marginBottom: '20px' }}>
//                                 <h3>Thông tin khách hàng</h3>
//                                 <p><strong>Tên:</strong> {reservationState.reservation[0].fullname}</p>
//                                 <p><strong>Phone:</strong> {reservationState.reservation[0].tel}</p>
//                                 <p><strong>Email:</strong> {reservationState.reservation[0].email}</p>
//                                 <p><strong>Ngày đặt:</strong> {reservationState.reservation[0].reservation_date.substring(0, 10)} | <strong>Số người:</strong> {reservationState.reservation[0].party_size} | <strong>Số bàn:</strong> {reservationState.reservation[0].tableName}</p>
//                             </div>
            
//                             <h3>Chi tiết đơn hàng</h3>
//                             <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//                                 <thead>
//                                     <tr>
//                                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>STT</th>
//                                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Món</th>
//                                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Số lượng</th>
//                                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Giá</th>
//                                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tổng tiền</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {reservationDetailState.reservationDetail.length > 0 ? (
//                                         reservationDetailState.reservationDetail.map((item, index) => (
//                                             <tr key={index}>
//                                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
//                                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.product_name}</td>
//                                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
//                                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatCurrency(item.price)}</td>
//                                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatCurrency((item.price * item.quantity))}</td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="5" style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px' }}>
//                                                 Khách hàng chưa đặt món!
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
            
//                             {reservationDetailState.reservationDetail.length > 0 && (
//                                 <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//                                     <div style={{ flex: '1', minWidth: '250px', textAlign: 'right' }}>
//                                     <p><strong>Tạm tính:</strong> {formatCurrency(reservationState.reservation[0].total_amount)}</p>
//                                         <p><strong>Thuế 10% (VAT):</strong> {formatCurrency(reservationState.reservation[0].total_amount * 10 / 100)}</p>
//                                         <p><strong>Tổng:</strong> {formatCurrency(reservationState.reservation[0].total_amount + reservationState.reservation[0].total_amount * 10 / 100)}</p>
//                                     </div>
//                                 </div>
//                             )}

//                             {reservationDetailState.reservationDetail.length > 0 && (
//                                 <div style={{ marginBottom: '20px' }}>
//                                     <h3>Thông tin thanh toán</h3>
//                                     <p><strong>Đã cọc:</strong> {reservationState.reservation[0].deposit ? (formatCurrency(reservationState.reservation[0].deposit)) : ('0 VND')}</p>
//                                     <p><strong>Giảm giá:</strong> {formatCurrency(reservationState.reservation[0].discount ? reservationState.reservation[0].total_amount * reservationState.reservation[0].discount / 100 : 0)}</p>
//                                     <p><strong>Còn lại: </strong> 
//                                         {
//                                             reservationState.reservation[0].discount || reservationState.reservation[0].deposit
//                                             ? formatCurrency(
//                                                 reservationState.reservation[0].total_amount 
//                                                 - (reservationState.reservation[0].discount ? reservationState.reservation[0].total_amount * reservationState.reservation[0].discount / 100 : 0)
//                                                 - (reservationState.reservation[0].deposit ? reservationState.reservation[0].deposit : 0)
//                                             )
//                                             : formatCurrency(reservationState.reservation[0].total_amount)
//                                         }
//                                     </p>
//                                     <p><strong>Trạng thái:</strong> {statusMapping[reservationState.reservation[0].status].text}</p>
//                                 </div>  
//                             )}
            
//                             <div style={{ textAlign: 'center', marginTop: '20px' }} className="print-buttons">
//                                 <button onClick={handlePrint} style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}>
//                                     In
//                                 </button>
//                                 <Link to="/reservation">
//                                     <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#007B9E'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#008CBA'}>
//                                         Quay lại
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     ) : (
//                         <div>No reservation found.</div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }




import React, { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(fetchReservationsID(id));
        dispatch(fetchReservationdetail(id));
    }, [dispatch]);

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
                <section className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#EEEEEE' }}>
                    <CustomSpinner />
                </section>
            ) : (reservationState.error || reservationDetailState.error) ? (
                <div>Error: {reservationState.error} {reservationDetailState.error}</div>

            ) : (
                <div>
                    {reservationState.reservation.length > 0 ? (
                        <div className='container' style={{ margin: '20px auto', fontFamily: 'Arial, sans-serif', maxWidth: '800px' }}>
                            <style>
                                {`
                                    @media print {
                                        .print-buttons {
                                            display: none; /* Ẩn nút In và Quay lại khi in */
                                        }
                                    }

                                    .invoice-header, .invoice-info, .invoice-details {
                                        margin-bottom: 20px;
                                        padding: 10px;
                                        border: 1px solid #ddd;
                                        border-radius: 5px;
                                    }

                                    .invoice-header {
                                        text-align: center;
                                    }

                                    .invoice-header img {
                                        width: 70px;
                                        height: 70px;
                                    }

                                    .invoice-details table {
                                        width: 100%;
                                        border-collapse: collapse;
                                    }

                                    .invoice-details th, .invoice-details td {
                                        border: 1px solid #ddd;
                                        padding: 8px;
                                        text-align: left;
                                    }

                                    .total-summary {
                                        display: flex;
                                        justify-content: space-between;
                                        border-top: 2px solid #000;
                                        padding-top: 10px;
                                        margin-top: 10px;
                                    }

                                    .summary-title {
                                        font-weight: bold;
                                    }
                                `}
                            </style>
                            
                            {/* Header */}
                            <div className="invoice-header">
                                <img src={logo} alt="navbar brand" />
                                <h2>Nhà Hàng Hương Sen</h2>
                                <p>Địa chỉ: Tầng 8, Số 2 Tôn Thất Tùng, Đống Đa - Hà Nội</p>
                                <p>Điện thoại: 190030060 | Email: support@elise.vn</p>
                            </div>
                            
                            {/* Thông tin khách hàng */}
                            <div className="invoice-info">
                                <h3>Thông tin khách hàng</h3>
                                <p><strong>Tên:</strong> {reservationState.reservation[0].fullname}</p>
                                <p><strong>Phone:</strong> {reservationState.reservation[0].tel}</p>
                                <p><strong>Email:</strong> {reservationState.reservation[0].email}</p>
                                <p><strong>Ngày đặt:</strong> {reservationState.reservation[0].reservation_date.substring(0, 10)} | <strong>Số người:</strong> {reservationState.reservation[0].party_size} | <strong>Số bàn:</strong> {reservationState.reservation[0].tableName}</p>
                            </div>
                            
                            {/* Chi tiết đơn hàng */}
                            <div className="invoice-details">
                                <h3>Chi tiết đơn hàng</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Món</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>
                                            <th>Tổng tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservationDetailState.reservationDetail.length > 0 ? (
                                            reservationDetailState.reservationDetail.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.product_name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{formatCurrency(item.price)}</td>
                                                    <td>{formatCurrency(item.price * item.quantity)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                                    Khách hàng chưa đặt món!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Thông tin thanh toán */}
                            {reservationDetailState.reservationDetail.length > 0 && (
                                <div className="total-summary">
                                    <div>
                                        <h3>Thông tin hóa đơn</h3>
                                        <p><strong>Tạm tính:</strong> {formatCurrency(reservationState.reservation[0].total_amount)}</p>
                                        <p><strong>Thuế 10%:</strong> {formatCurrency(reservationState.reservation[0].total_amount * 0.10)}</p>
                                        <p><strong>Tổng:</strong> {formatCurrency(reservationState.reservation[0].total_amount + reservationState.reservation[0].total_amount * 0.10)}</p>
                                        <p><strong>Trạng thái:</strong> {statusMapping[reservationState.reservation[0].status].text}</p>
                                    </div>
                                    <div>
                                        <h3>Thông tin thanh toán</h3>
                                        <p><strong>Đã cọc:</strong> {reservationState.reservation[0].deposit ? formatCurrency(reservationState.reservation[0].deposit) : '0 VND'}</p>
                                        <p><strong>Giảm giá:</strong> {formatCurrency(reservationState.reservation[0].discount ? reservationState.reservation[0].total_amount * reservationState.reservation[0].discount / 100 : 0)}</p>
                                        <p><strong>Còn lại:</strong> 
                                            {formatCurrency(
                                                reservationState.reservation[0].total_amount 
                                                - (reservationState.reservation[0].discount ? reservationState.reservation[0].total_amount * reservationState.reservation[0].discount / 100 : 0)
                                                - (reservationState.reservation[0].deposit ? reservationState.reservation[0].deposit : 0)
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Nút in và quay lại */}
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
