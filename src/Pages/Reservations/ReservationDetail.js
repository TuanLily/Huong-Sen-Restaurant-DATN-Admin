// import { Link } from 'react-router-dom';
// import logo from "../../Assets/Images/huong-sen-logo.png";

// export default function ReservationDetail () {
//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className='container' style={{ margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
//             <style>
//                 {`
//                     @media print {
//                         .print-buttons {
//                             display: none; /* Ẩn nút In và Quay lại khi in */
//                         }
//                     }
//                 `}
//             </style>
//             <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                 <h1>
//                     <img src={logo} alt="navbar brand" className="navbar-brand" width={70} height={70} />
//                 </h1>
//                 <h2>Nhà Hàng Hương Sen</h2>
//                 <p>Nhà Hàng: Tầng 8, Số 2 Tôn Thất Tùng, Đống Đa - Hà Nội</p>
//                 <p>Phone: 190030060 | Email: support@elise.vn</p>
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//                 <h3>Thông tin khách hàng</h3>
//                 <p><strong>Tên:</strong> Nguyễn Văn A</p>
//                 <p><strong>Phone:</strong> 0359020898</p>
//                 <p><strong>Email:</strong> nguyenvana@gmail.com</p>
//                 <p><strong>Ngày đặt:</strong> 2023-04-02</p>
//                 <p><strong>Giờ vào:</strong> 3 | <strong>Số người:</strong> 12 | <strong>Số bàn:</strong> 31</p>
//             </div>

//             <h3>Chi tiết đơn hàng</h3>
//             <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//                 <thead>
//                     <tr>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>STT</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Món</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Số lượng</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Giá</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tổng tiền</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>Nộm đu đủ</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>4</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>50.000 đ</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>200.000 đ</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>2</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>Nước cam</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>4</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>50.000 đ</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>200.000 đ</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>3</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>Trứng ốp la</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>2</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>80.000 đ</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>160.000 đ</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>4</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>Gà chiên kiểu KFC</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>5</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>150.000 đ</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>750.000 đ</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>5</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>Cá thu rán</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>8</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>500.000 đ</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>4.000.000 đ</td>
//                     </tr>
//                 </tbody>
//             </table>

//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <div>
//                     <p><strong>Thuế:</strong> 531.000 vnđ</p>
//                 </div>
//                 <div>
//                     <h4><strong>Tổng tiền:</strong> 5.841.000 vnđ</h4>
//                 </div>
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//                 <h3>Thông tin thanh toán</h3>
//                 <p><strong>Đã cọc:</strong> 100.000 vnđ</p>
//                 <p><strong>Còn lại:</strong> 5.741.000 vnđ</p>
//                 <p><strong>Trạng thái:</strong> Đã thanh toán</p>
//             </div>

//             <div style={{ marginTop: '40px', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
//                 <div>
//                     <h4>Chữ ký của khách hàng</h4>
//                     <p style={{ borderTop: '1px solid #ddd', padding: '40px 0' }}>____________________</p>
//                     <p>(Chữ ký khách hàng)</p>
//                 </div>
//                 <div>
//                     <h4>Chữ ký của nhân viên</h4>
//                     <p style={{ borderTop: '1px solid #ddd', padding: '40px 0' }}>____________________</p>
//                     <p>(Chữ ký nhân viên)</p>
//                 </div>
//             </div>

//             <div style={{ textAlign: 'center', marginTop: '20px' }} className="print-buttons">
//                 <button onClick={handlePrint} style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}>
//                     In
//                 </button>
//                 <Link to="/reservation">
//                     <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#007B9E'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#008CBA'}>
//                         Quay lại
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// }

import { Link } from 'react-router-dom';
import logo from "../../Assets/Images/huong-sen-logo.png";

export default function ReservationDetail() {
    const handlePrint = () => {
        window.print();
    };

    return (
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
                <p><strong>Tên:</strong> Nguyễn Văn A</p>
                <p><strong>Phone:</strong> 0359020898</p>
                <p><strong>Email:</strong> nguyenvana@gmail.com</p>
                <p><strong>Ngày đặt:</strong> 2023-04-02</p>
                <p><strong>Giờ vào:</strong> 3 | <strong>Số người:</strong> 12 | <strong>Số bàn:</strong> 31</p>
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
                    <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Nộm đu đủ</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>4</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>50.000 đ</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>200.000 đ</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Nộm đu đủ</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>4</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>50.000 đ</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>200.000 đ</td>
                    </tr>
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    <p><strong>Thuế:</strong> 531.000 vnđ</p>
                </div>
                <div>
                    <h4><strong>Tổng tiền:</strong> 5.841.000 vnđ</h4>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Thông tin thanh toán</h3>
                <p><strong>Đã cọc:</strong> 100.000 vnđ</p>
                <p><strong>Còn lại:</strong> 5.741.000 vnđ</p>
                <p><strong>Trạng thái:</strong> Đã thanh toán</p>
            </div>

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
    );
}
