import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/Images/huong-sen-logo.png'

export default function MenuBar() {
    return (
        <div className="sidebar" data-background-color="dark">
            <div className="sidebar-logo">
                <div className="logo-header d-flex justify-content-center align-items-center" data-background-color="dark">
                    <Link to="" className="logo">
                        <img
                            src={logo}
                            alt="navbar brand"
                            className="navbar-brand"
                            width={70}
                            height="70"
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
                                        <Link to={'/'}>
                                            <span className="sub-item">Dashboard</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-section">

                            <h4 className="text-section">Quản Lý Danh Sách</h4>
                        </li>

                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#productManagement">
                                <i className="fa-solid fa-bowl-food"></i>                                <p>Quản Lý Sản Phẩm</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="productManagement">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <Link to='category-product'>
                                            <span className="sub-item">Danh mục sản phẩm</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='category-product-lock'>
                                            <span className="sub-item">Danh mục sản phẩm tạm xóa</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='product'>
                                            <span className="sub-item">Sản phẩm</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='product-lock'>
                                            <span className="sub-item">Sản phẩm tạm xóa</span>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#blogManagement">
                                <i className="fa-solid fa-blog"></i>
                                <p>Quản Lý Bài Viết</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="blogManagement">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <Link to='categoryBlog'>
                                            <span className="sub-item">Danh mục bài viết</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='category-blog-lock'>
                                            <span className="sub-item">Danh mục bài viết tạm xóa</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='blog'>
                                            <span className="sub-item">Bài viết</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='blog-lock'>
                                            <span className="sub-item">Bài viết tạm xóa</span>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#otherManagement">
                                <i className="fa-solid fa-list"></i>
                                <p>Quản Lý Khác</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="otherManagement">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <Link to='promotion'>
                                            <span className="sub-item">Quản lý khuyến mãi</span>
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
                                </ul>
                            </div>
                        </li>
                        <li className="nav-section">

                            <h4 className="text-section">Quản Lý Tài Khoản</h4>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#accountManagement">
                                <i className="fa-solid fa-users"></i>
                                <p>Quản Lý Tài khoản</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="accountManagement">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <Link to='employee'>
                                            <span className="sub-item">Nhân viên</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='customer'>
                                            <span className="sub-item">Khách hàng</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-section">

                            <h4 className="text-section">Quản Lý Đơn Hàng</h4>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#orderManagement">
                                <i className="fa-solid fa-cart-shopping"></i>                                <p>Quản Lý Đơn Hàng</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="orderManagement">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <Link to='order'>
                                            <span className="sub-item">Đơn hàng</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='orderDetail'>
                                            <span className="sub-item">Chi tiết đơn hàng</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='payMethod'>
                                            <span className="sub-item">Quản lý thanh toán</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-section">

                            <h4 className="text-section">Quản Lý Đặt Bàn</h4>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#tableManagement">
                                <i className="fa-solid fa-chair"></i>
                                <p>Quản Lý Đặt Bàn</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="tableManagement">
                                <ul className="nav nav-collapse">
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
                                </ul>
                            </div>
                        </li>
                        <li className="nav-section">

                            <h4 className="text-section">Quản Lý Bình Luận</h4>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#commentManagement">
                                <i className="fa-solid fa-comment"></i>
                                <p>Quản Lý Bình Luận</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="commentManagement">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <Link to='commentproducts'>
                                            <span className="sub-item">Quản lý bình luận sản phẩm</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='commentblog'>
                                            <span className="sub-item">Quản lý bình luận blog</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-section">

                            <h4 className="text-section">Quản Lý Vai Trò & Quyền Hạn</h4>
                        </li>
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#roleManagement">
                                <i className="fa-solid fa-users-gear"></i>
                                <p>Quản Lý Vai trò-Quyền Hạn</p>
                                <span className="caret"></span>
                            </a>
                            <div className="collapse" id="roleManagement">
                                <ul className="nav nav-collapse">
                                    <li>
                                        <Link to='permissions'>
                                            <span className="sub-item">Quản lý quyền hạn</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='rolespermissions'>
                                            <span className="sub-item">Quản lý vai trò quyền hạn</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {/* <li className="nav-item">
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
                                    <li>
                                        <Link to='permissions'>
                                            <span className="sub-item">Quản lý quyền hạn</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='rolespermissions'>
                                            <span className="sub-item">Quản lý vai trò quyền hạn</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='commentproducts'>
                                            <span className="sub-item">Quản lý vai trò đánh giá sản phẩm</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='commentblog'>
                                            <span className="sub-item">Quản lý bình luận blog</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}
