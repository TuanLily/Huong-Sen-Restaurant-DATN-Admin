import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuBar() {
    return (
        <div className="sidebar" data-background-color="dark">
            <div className="sidebar-logo">
                <div className="logo-header" data-background-color="dark">
                    <Link to="" className="logo">
                        <img
                            src="../Assets/Images/kaiadmin/logo_light.svg"
                            alt="navbar brand"
                            className="navbar-brand"
                            height="20"
                        />
                    </Link>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar">
                            <i className="gg-menu-right"></i>
                        </button>
                        <button className="btn btn-toggle sidenav-toggler">
                            <i className="gg-menu-left"></i>
                        </button>
                    </div>
                    <button className="topbar-toggler more">
                        <i className="gg-more-vertical-alt"></i>
                    </button>
                </div>
            </div>
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <ul className="nav nav-secondary">
                        <li className="nav-item active">
                            <a
                                data-bs-toggle="collapse"
                                href="#dashboard"
                                className="collapsed"
                                aria-expanded="false"
                            >
                                <i className="fas fa-home"></i>
                                <p>Dashboard</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="dashboard">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <a href="../demo1/index.html">
                                            <span className="sub-item">Dashboard 1</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-section">
                            <span className="sidebar-mini-icon">
                                <i className="fa fa-ellipsis-h"></i>
                            </span>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#base">
                                <i className="fas fa-layer-group"></i>
                                <p>Quản trị</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="base">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <Link to='product'>
                                            <span className="sub-item">Quản lý sản phẩm</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='categoryProduct'>
                                            <span className="sub-item">Quản lý danh mục sp</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='customer'>
                                            <span className="sub-item">Quản lý khách hàng</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='employee'>
                                            <span className="sub-item">Quản lý nhân viên</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='blog'>
                                            <span className="sub-item">Quản lý bài viết</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='categoryBlog'>
                                            <span className="sub-item">Quản lý danh mục bv</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='productImage'>
                                            <span className="sub-item">Quản lý ảnh sp</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='table'>
                                            <span className="sub-item">Quản lý bàn ăn</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='reservation'>
                                            <span className="sub-item">Quản lý đặt bàn</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='order'>
                                            <span className="sub-item">Quản lý đơn hàng</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='orderDetail'>
                                            <span className="sub-item">Quản lý chi tiết đơn hàng</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='promotion'>
                                            <span className="sub-item">Quản lý khuyến mãi</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='payMethod'>
                                            <span className="sub-item">Quản lý thanh toán</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='CustomerGroup'>
                                            <span className="sub-item">Quản lý nhóm khách hàng</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='Places'>
                                            <span className="sub-item">Quản lý thứ hạng</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='Roles'>
                                            <span className="sub-item">Quản lý vai trò</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarLayouts">
                                <i className="fas fa-th-list"></i>
                                <p>Sidebar Layouts</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="sidebarLayouts">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <a href="sidebar-style-2.html">
                                            <span className="sub-item">Sidebar Style 2</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="icon-menu.html">
                                            <span className="sub-item">Icon Menu</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#forms">
                                <i className="fas fa-pen-square"></i>
                                <p>Forms</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="forms">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <a href="forms/forms.html">
                                            <span className="sub-item">Basic Form</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#tables">
                                <i className="fas fa-table"></i>
                                <p>Tables</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="tables">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <a href="tables/tables.html">
                                            <span className="sub-item">Basic Table</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tables/datatables.html">
                                            <span className="sub-item">Datatables</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#maps">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>Maps</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="maps">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <a href="maps/googlemaps.html">
                                            <span className="sub-item">Google Maps</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="maps/jsvectormap.html">
                                            <span className="sub-item">Jsvectormap</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#charts">
                                <i className="far fa-chart-bar"></i>
                                <p>Charts</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="charts">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <a href="charts/charts.html">
                                            <span className="sub-item">Chart Js</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="charts/sparkline.html">
                                            <span className="sub-item">Sparkline</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="widgets.html">
                                <i className="fas fa-desktop"></i>
                                <p>Widgets</p>
                                <span className="badge badge-success">4</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#submenu">
                                <i className="fas fa-bars"></i>
                                <p>Menu Levels</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="submenu">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <a data-bs-toggle="collapse" href="#subnav1">
                                            <span className="sub-item">Level 1</span>
                                            <span className="caret"></span>
                                        </a>
                                        <div className="collapse" id="subnav1">
                                            <ul className="nav nav-collapse subnav">
                                                <li>
                                                    <a to="">
                                                        <span className="sub-item">Level 2</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a to="">
                                                        <span className="sub-item">Level 2</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="collapse" href="#subnav2">
                                            <span className="sub-item">Level 1</span>
                                            <span className="caret"></span>
                                        </a>
                                        <div className="collapse" id="subnav2">
                                            <ul className="nav nav-collapse subnav">
                                                <li>
                                                    <a to="">
                                                        <span className="sub-item">Level 2</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a to="">
                                            <span className="sub-item">Level 1</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
