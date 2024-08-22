import React from 'react'
import { Link } from 'react-router-dom'
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';


export default function Dashboard() {
    const formatCurrency = (value) => {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
    };

    const orderOption = () => {
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['Xác nhận', 'Chưa xác nhận', 'Đã hủy', 'Đã thanh toán', 'Chưa thanh toán']
            },
            series: [
                {
                    name: 'Doanh thu',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 120, name: 'Xác nhận' },
                        { value: 310, name: 'Chưa xác nhận' },
                        { value: 190, name: 'Đã hủy' },
                        { value: 320, name: 'Đã thanh toán' },
                        { value: 1320, name: 'Chưa thanh toán' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    };    

    const revenueOption = () => {
        return {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Doanh thu']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                axisLabel: {
                    interval: 0, // Hiển thị tất cả các nhãn tháng
                    rotate: 30 // Xoay nhãn nếu cần
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Doanh thu',
                    type: 'bar',
                    data: [120, 310, 190, 320, 1320, 530, 600, 750, 900, 1100, 1300, 1500]
                }
            ]
        };
    };


    return (
        <div className="container">
            <div className="page-inner">
                <div
                    className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
                >
                    <div>
                        <h3 className="fw-bold mb-3">Dashboard</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-3">
                        <div className="card card-stats card-round">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-icon">
                                        <div
                                            className="icon-big text-center icon-primary bubble-shadow-small"
                                        >
                                            <i className="fas fa-users"></i>
                                        </div>
                                    </div>
                                    <div className="col col-stats ms-3 ms-sm-0">
                                        <div className="numbers">
                                            <p className="card-category">Số lượng khách hàng</p>
                                            <h4 className="card-title">1,294</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="card card-stats card-round">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-icon">
                                        <div
                                            className="icon-big text-center icon-success bubble-shadow-small"
                                        >
                                            <i className="fas fa-luggage-cart"></i>
                                        </div>
                                    </div>
                                    <div className="col col-stats ms-3 ms-sm-0">
                                        <div className="numbers">
                                            <p className="card-category">Số lượng hóa đơn</p>
                                            <h4 className="card-title">1,345</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="card card-stats card-round">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-icon">
                                        <div
                                            className="icon-big text-center icon-success bubble-shadow-small" style={{ backgroundColor: '#57EDE5' }}
                                        >
                                            <i className="fas fa-utensils"></i>
                                        </div>
                                    </div>
                                    <div className="col col-stats ms-3 ms-sm-0">
                                        <div className="numbers">
                                            <p className="card-category">Số lượng sản phẩm</p>
                                            <h4 className="card-title">$ 1,345</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="card card-stats card-round">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-icon">
                                        <div
                                            className="icon-big text-center icon-secondary bubble-shadow-small" style={{ backgroundColor: '#ED9D57' }}
                                        >
                                            <i className="fas fa-th-list"></i>
                                        </div>
                                    </div>
                                    <div className="col col-stats ms-3 ms-sm-0">
                                        <div className="numbers">
                                            <p className="card-category">Số lượng danh mục</p>
                                            <h4 className="card-title">576</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-round">
                            <div className="card-body">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Khách Hàng Mới</div>
                                </div>
                                <div className="card-list py-4">
                                    <div className="item-list">
                                        <div className="avatar">
                                            <img
                                                src="../Assets/Images/jm_denis.jpg"
                                                alt="..."
                                                className="avatar-img rounded-circle"
                                            />
                                        </div>
                                        <div className="info-user ms-3">
                                            <div className="username">Jimmy Denis</div>
                                            <div className="status">trangnqpc05335@gmail.com</div>
                                        </div>
                                    </div>
                                    <div className="item-list">
                                        <div className="avatar">
                                            <img
                                                src="../Assets/Images/jm_denis.jpg"
                                                alt="..."
                                                className="avatar-img rounded-circle"
                                            />
                                        </div>
                                        <div className="info-user ms-3">
                                            <div className="username">Jimmy Denis</div>
                                            <div className="status">trangnqpc05335@gmail.com</div>
                                        </div>
                                    </div>
                                    <div className="item-list">
                                        <div className="avatar">
                                            <span
                                                className="avatar-title rounded-circle border border-white"
                                            >CF</span>
                                        </div>
                                        <div className="info-user ms-3">
                                            <div className="username">Chandra Felix</div>
                                            <div className="status">Sales Promotion</div>
                                        </div>
                                    </div>
                                    <div className="item-list">
                                        <div className="avatar">
                                            <img
                                                src="../Assets/Images/talha.jpg"
                                                alt="..."
                                                className="avatar-img rounded-circle"
                                            />
                                        </div>
                                        <div className="info-user ms-3">
                                            <div className="username">Talha</div>
                                            <div className="status">Front End Designer</div>
                                        </div>
                                    </div>
                                    <div className="item-list">
                                        <div className="avatar">
                                            <img
                                                src="../Assets/Images/chadengle.jpg"
                                                alt="..."
                                                className="avatar-img rounded-circle"
                                            />
                                        </div>
                                        <div className="info-user ms-3">
                                            <div className="username">Chad</div>
                                            <div className="status">CEO Zeleaf</div>
                                        </div>
                                    </div>
                                    <div className="item-list">
                                        <div className="avatar">
                                            <span
                                                className="avatar-title rounded-circle border border-white bg-primary"
                                            >H</span>
                                        </div>
                                        <div className="info-user ms-3">
                                            <div className="username">Hizrian</div>
                                            <div className="status">Web Designer</div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-outline-success mt-2">Xem thêm</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Sản Phẩm Dùng Nhiều</div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive text-center">
                                    <table className="table align-items-center mb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th style={{ width: '10%' }} scope="col">Ảnh</th>
                                                <th scope="col">Tên sản phẩm</th>
                                                <th scope="col">Mã hiệu</th>
                                                <th scope="col">Giá</th>
                                                <th scope="col">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <img className="img-fluid rounded w-100" src='https://firebasestorage.googleapis.com/v0/b/huong-sen-restaurant.appspot.com/o/images%2Fhuong-sen-logo.png?alt=media&token=f117d5c3-ebc4-4449-a0c7-eaa903b2087a' alt="Image"/>
                                                </td>
                                                <td>Bánh da lợn hoi</td>
                                                <td>Pc9283</td>
                                                <td>
                                                    <div>
                                                        <span className="text-danger text-decoration-line-through">{formatCurrency(200000)}</span>
                                                        <div>{formatCurrency(300000)}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-success">Hoạt động</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <img className="img-fluid rounded w-100" src='https://firebasestorage.googleapis.com/v0/b/huong-sen-restaurant.appspot.com/o/images%2Fhuong-sen-logo.png?alt=media&token=f117d5c3-ebc4-4449-a0c7-eaa903b2087a' alt="Image"/>
                                                </td>
                                                <td>Bánh da lợn hoi</td>
                                                <td>Pc9283</td>
                                                <td>
                                                    <div>
                                                        <span className="text-danger text-decoration-line-through">{formatCurrency(200000)}</span>
                                                        <div>{formatCurrency(300000)}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-success">Hoạt động</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <img className="img-fluid rounded w-100" src='https://firebasestorage.googleapis.com/v0/b/huong-sen-restaurant.appspot.com/o/images%2Fhuong-sen-logo.png?alt=media&token=f117d5c3-ebc4-4449-a0c7-eaa903b2087a' alt="Image"/>
                                                </td>
                                                <td>Bánh da lợn hoi</td>
                                                <td>Pc9283</td>
                                                <td>
                                                    <div>
                                                        <span className="text-danger text-decoration-line-through">{formatCurrency(200000)}</span>
                                                        <div>{formatCurrency(300000)}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-success">Hoạt động</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <img className="img-fluid rounded w-100" src='https://firebasestorage.googleapis.com/v0/b/huong-sen-restaurant.appspot.com/o/images%2Fhuong-sen-logo.png?alt=media&token=f117d5c3-ebc4-4449-a0c7-eaa903b2087a' alt="Image"/>
                                                </td>
                                                <td>Bánh da lợn hoi</td>
                                                <td>Pc9283</td>
                                                <td>
                                                    <div>
                                                        <span className="text-danger text-decoration-line-through">{formatCurrency(200000)}</span>
                                                        <div>{formatCurrency(300000)}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-success">Hoạt động</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <img className="img-fluid rounded w-100" src='https://firebasestorage.googleapis.com/v0/b/huong-sen-restaurant.appspot.com/o/images%2Fhuong-sen-logo.png?alt=media&token=f117d5c3-ebc4-4449-a0c7-eaa903b2087a' alt="Image"/>
                                                </td>
                                                <td>Bánh da lợn hoi</td>
                                                <td>Pc9283</td>
                                                <td>
                                                    <div>
                                                        <span className="text-danger text-decoration-line-through">{formatCurrency(200000)}</span>
                                                        <div>{formatCurrency(300000)}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-success">Hoạt động</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <button type="button" className="btn btn-outline-success text-center">Xem thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Hóa Đơn Mới</div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive text-center">
                                    <table className="table align-items-center mb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Tổng</th>
                                                <th scope="col">Ngày thêm</th>
                                                <th scope="col">Chi tiết</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    Tủn Tủn
                                                </td>
                                                <td>Đang thiếu nợ</td>
                                                <td><div>{formatCurrency(300000)}</div></td>
                                                <td>
                                                    2024/12/11
                                                </td>
                                                <td>
                                                    <Link><span className="badge badge-success">Xem</span></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    Tủn Tủn
                                                </td>
                                                <td>Đang thiếu nợ</td>
                                                <td><div>{formatCurrency(300000)}</div></td>
                                                <td>
                                                    2024/12/11
                                                </td>
                                                <td>
                                                    <Link><span className="badge badge-success">Xem</span></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    Tủn Tủn
                                                </td>
                                                <td>Đang thiếu nợ</td>
                                                <td><div>{formatCurrency(300000)}</div></td>
                                                <td>
                                                    2024/12/11
                                                </td>
                                                <td>
                                                    <Link><span className="badge badge-success">Xem</span></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    Tủn Tủn
                                                </td>
                                                <td>Đang thiếu nợ</td>
                                                <td><div>{formatCurrency(300000)}</div></td>
                                                <td>
                                                    2024/12/11
                                                </td>
                                                <td>
                                                    <Link><span className="badge badge-success">Xem</span></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    Tủn Tủn
                                                </td>
                                                <td>Đang thiếu nợ</td>
                                                <td><div>{formatCurrency(300000)}</div></td>
                                                <td>
                                                    2024/12/11
                                                </td>
                                                <td>
                                                    <Link><span className="badge badge-success">Xem</span></Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <button type="button" className="btn btn-outline-success text-center">Xem thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-round">
                            <div className="card-body">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Danh sách khuyến mãi</div>
                                </div>
                                <div className="card-list">
                                    <div className='item-list d-flex justify-content-between'>
                                        <div className="md-5">
                                            <div><strong>Mã: </strong> <span>pc02938</span></div>
                                            <div><strong>Giảm: </strong> <span className='text-danger'>12%</span></div>
                                        </div>
                                        <div className="md-5">
                                            2024/12/01-2023/12/12
                                        </div>
                                    </div>
                                    <div className='item-list d-flex justify-content-between'>
                                        <div className="md-5">
                                            <div><strong>Mã: </strong> <span>pc02938</span></div>
                                            <div><strong>Giảm: </strong> <span className='text-danger'>12%</span></div>
                                        </div>
                                        <div className="md-5">
                                            2024/12/01-2023/12/12
                                        </div>
                                    </div>
                                    <div className='item-list d-flex justify-content-between'>
                                        <div className="md-5">
                                            <div><strong>Mã: </strong> <span>pc02938</span></div>
                                            <div><strong>Giảm: </strong> <span className='text-danger'>12%</span></div>
                                        </div>
                                        <div className="md-5">
                                            2024/12/01-2023/12/12
                                        </div>
                                    </div>
                                    <div className='item-list d-flex justify-content-between'>
                                        <div className="md-5">
                                            <div><strong>Mã: </strong> <span>pc02938</span></div>
                                            <div><strong>Giảm: </strong> <span className='text-danger'>12%</span></div>
                                        </div>
                                        <div className="md-5">
                                            2024/12/01-2023/12/12
                                        </div>
                                    </div>
                                    <div className='item-list d-flex justify-content-between'>
                                        <div className="md-5">
                                            <div><strong>Mã: </strong> <span>pc02938</span></div>
                                            <div><strong>Giảm: </strong> <span className='text-danger'>12%</span></div>
                                        </div>
                                        <div className="md-5">
                                            2024/12/01-2023/12/12
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-outline-success mt-2">Xem thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row">
                                    <div className="card-title">Thống Kê Doanh Thu</div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="chart-container" style={{ minHeight: "375px" }}>
                                    <ReactEcharts option={revenueOption()} style={{ height: '400px', width: '100%' }} />
                                </div>
                                <div id="myChartLegend"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row">
                                    <div className="card-title">Thống Kê Hóa Đơn</div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="chart-container" style={{ minHeight: "375px" }}>
                                    <ReactEcharts option={orderOption()} style={{ height: '400px', width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
