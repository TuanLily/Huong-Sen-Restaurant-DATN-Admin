import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistical } from '../Actions/StatisticalActions';
import ReactEcharts from 'echarts-for-react';
import CustomSpinner from '../Components/Spinner/CustomSpinner';

import { fetchProduct } from '../Actions/ProductActions';
import { fetchUsers } from '../Actions/UsersAction';
import { fetchBlog } from '../Actions/BlogActions';
import { fetchProductCategory } from '../Actions/ProductCategoryActions';

export default function Dashboard() {
    const dispatch = useDispatch();

    const { loading, data, error } = useSelector(state => state.statistical);

    const [selectedMonth, setSelectedMonth] = useState(null); // State để lưu tháng được chọn, mặc định là null (Cả năm)

    const productState = useSelector(state => state.product);
    const userState = useSelector(state => state.users);
    const blogState = useSelector(state => state.blog);
    const categoryState = useSelector(state => state.product_category);

    useEffect(() => {
        dispatch(fetchStatistical());
        dispatch(fetchProduct());
        dispatch(fetchUsers());
        dispatch(fetchBlog());
        dispatch(fetchProductCategory());
    }, [dispatch]);

    // Hàm để chuyển đổi dữ liệu theo trạng thái của từng tháng
    const getOrderDataByMonth = () => {
        if (!data || !data.revenueByMonthAndStatus) return [];

        const monthData = selectedMonth === null ? data.revenueByMonthAndStatus : [data.revenueByMonthAndStatus[selectedMonth - 1]];
        const orderCounts = monthData.reduce((acc, month) => {
            Object.keys(month).forEach(status => {
                acc[status] = (acc[status] || 0) + month[status];
            });
            return acc;
        }, {});

        return Object.keys(orderCounts).map(status => ({
            value: orderCounts[status],
            name: status,
        }));
    };

    const orderOption = () => {
        if (!data || !data.revenueByMonthAndStatus) return {};
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: Object.keys(data.revenueByMonthAndStatus[0]) // Lấy tên trạng thái từ dữ liệu
            },
            series: [
                {
                    name: 'Thống kê hóa đơn',
                    type: 'pie',
                    radius: '50%',
                    data: getOrderDataByMonth(),
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
        if (!data || !data.monthlyRevenue) return {};
        const revenueData = data.monthlyRevenue; // Kiểm tra dữ liệu hoặc trả về mảng rỗng
        return {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Doanh thu']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Doanh thu',
                    type: 'bar',
                    data: revenueData
                }
            ]
        };
    };

    if (loading) {
        return (
            <section className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#EEEEEE' }}>
                <CustomSpinner />
            </section>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <div className="page-inner">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
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
                                            <p className="card-category">Số lượng tài khoản</p>
                                            <h4 className="card-title">{userState.totalCount ? userState.totalCount : 0}</h4>
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
                                            <i className="fas fa-file-alt"></i>
                                        </div>
                                    </div>
                                    <div className="col col-stats ms-3 ms-sm-0">
                                        <div className="numbers">
                                            <p className="card-category">Số lượng bài viết</p>
                                            <h4 className="card-title">{blogState.totalCount ? blogState.totalCount : 0}</h4>
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
                                            <h4 className="card-title">{productState ? productState.allProducts.length : 0}</h4>
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
                                            <h4 className="card-title">{categoryState.totalCount ? categoryState.totalCount : 0}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row d-flex justify-content-between align-items-center">
                                    <div className="card-title">Thống Kê Hóa Đơn</div>
                                    {/* Dropdown select option nằm ngang tiêu đề */}
                                    <div className="col-md-4">
                                        <select
                                            className="form-select"
                                            value={selectedMonth || ''}
                                            onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value, 10) : null)}
                                        >
                                            <option value="">Cả năm</option>
                                            {[...Array(12).keys()].map(month => (
                                                <option key={month} value={month + 1}>Tháng {month + 1}</option>
                                            ))}
                                        </select>
                                    </div>
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
            </div>
        </div>
    );
}