import React, { useEffect } from "react";
import { Link, NavLink, useLocation, Navigate, useNavigate } from "react-router-dom";
import logo from "../Assets/Images/huong-sen-logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { getPermissions } from '../Actions/GetQuyenHanAction';

export default function MenuBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const getQuyenHanState = useSelector(state => state.getQuyenHan);
  const permissions = getQuyenHanState.getQuyenHan || [];

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const userIdFromToken = decodedToken.id;
      dispatch(getPermissions(userIdFromToken));  
    }
    const decodedToken = jwt_decode(token);
    const userIdFromToken = decodedToken.id;
    dispatch(getPermissions(userIdFromToken));
  }, [navigate, dispatch, token]);

  const hasPermission = (permissionName) => {
    return permissions.data && permissions.data.some(permission => permission.name == permissionName);
  };

  // Kiểm tra xem hiện tại đang ở trong dropdown nào
  const isDashboardActive = location.pathname === "/dashboard";
  const isProductManagementActive =
    location.pathname.startsWith("/category-product") ||
    location.pathname.startsWith("/product");
  const isBlogManagementActive =
    location.pathname.startsWith("/category-blog") ||
    location.pathname.startsWith("/blogs");
  const isOtherManagementActive =
    location.pathname.startsWith("/promotions") ||
    location.pathname.startsWith("/customer-group") ||
    location.pathname.startsWith("/places");
  const isAccountManagementActive =
    location.pathname.startsWith("/users")
  const isOrderManagementActive =
    location.pathname.startsWith("/order") ||
    location.pathname.startsWith("/order-detail") ||
    location.pathname.startsWith("/pay-method");
  const isTableManagementActive =
    location.pathname.startsWith("/tables") ||
    location.pathname.startsWith("/reservation");
  const isCommentManagementActive =
    location.pathname.startsWith("/comment-products") ||
    location.pathname.startsWith("/comment-blog");
  const isRoleManagementActive =
    location.pathname.startsWith("/role") ||
    location.pathname.startsWith("/permissions");
  const isChatManagement = location.pathname.startsWith("/user-chats");

  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div
          className="logo-header d-flex justify-content-center align-items-center"
          data-background-color="dark"
        >
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
            <li className={`nav-item ${isDashboardActive ? "active" : ""}`}>
              <NavLink to="/dashboard" className="collapsed">
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li className="nav-section">
              <h4 className="text-section">Quản Lý Danh Sách</h4>
            </li>

            {/* Quản Lý Sản Phẩm */}

            {(hasPermission('Xem sản phẩm') || hasPermission('Xem danh mục sản phẩm') || hasPermission('Khôi phục sản phẩm')) && (
              <li className={ `nav-item ${ (hasPermission('Xem danh mục sản phẩm') && (location.pathname.startsWith("/category-product")) || ((hasPermission('Xem sản phẩm') || (hasPermission('Khôi phục sản phẩm') && location.pathname.startsWith("/product/tam_xoa"))) && location.pathname.startsWith("/product"))) ? "active" : "" }` }>
                <NavLink to="#productManagement" className="collapsed" aria-expanded={isProductManagementActive.toString()} data-bs-toggle="collapse">
                  <i className="fa-solid fa-bowl-food"></i>
                  <p>Quản Lý Sản Phẩm</p>
                  <span className="caret"></span>
                </NavLink>
                <div className={ `collapse ${ (hasPermission('Xem danh mục sản phẩm') && (location.pathname.startsWith("/category-product")) || ((hasPermission('Xem sản phẩm') || (hasPermission('Khôi phục sản phẩm') && location.pathname.startsWith("/product/tam_xoa"))) && location.pathname.startsWith("/product"))) ? "show" : "" }` } id="productManagement">
                  <ul className="nav nav-collapse">
                    {hasPermission('Xem danh mục sản phẩm') && (
                      <li>
                        <NavLink to="/category-product">
                          <span className="sub-item">Danh mục sản phẩm</span>
                        </NavLink>
                      </li>
                    )}
                    {hasPermission('Xem sản phẩm') && (
                      <li>
                        <NavLink to="/product">
                          <span className="sub-item">Sản phẩm</span>
                        </NavLink>
                      </li>
                    )}
                    {hasPermission('Khôi phục sản phẩm') && (
                      <li>
                        <NavLink to="/product/tam_xoa">
                          <span className="sub-item">Sản phẩm tạm xóa</span>
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            )}

            {/* Quản Lý Bài Viết */}
            <li
              className={`nav-item ${isBlogManagementActive ? "active" : ""}`}
            >
              <NavLink
                to="#blogManagement"
                className="collapsed"
                aria-expanded={isBlogManagementActive.toString()}
                data-bs-toggle="collapse"
              >
                <i className="fa-solid fa-blog"></i>
                <p>Quản Lý Bài Viết</p>
                <span className="caret"></span>
              </NavLink>
              <div
                className={`collapse ${isBlogManagementActive ? "show" : ""}`}
                id="blogManagement"
              >
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/category-blog">
                      <span className="sub-item">Danh mục bài viết</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blogs">
                      <span className="sub-item">Bài viết</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog-lock">
                      <span className="sub-item">Bài viết tạm xóa</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Quản Lý Khác */}
            <li
              className={`nav-item ${isOtherManagementActive ? "active" : ""}`}
            >
              <NavLink
                to="#otherManagement"
                className="collapsed"
                aria-expanded={isOtherManagementActive.toString()}
                data-bs-toggle="collapse"
              >
                <i className="fa-solid fa-list"></i>
                <p>Quản Lý Khác</p>
                <span className="caret"></span>
              </NavLink>
              <div
                className={`collapse ${isOtherManagementActive ? "show" : ""}`}
                id="otherManagement"
              >
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/promotions">
                      <span className="sub-item">Quản lý khuyến mãi</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/customer-group">
                      <span className="sub-item">Quản lý nhóm khách hàng</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/places">
                      <span className="sub-item">Quản lý thứ hạng</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Quản Lý Tài khoản */}
            {hasPermission('Xem tài khoản') && (
              <li
                className={`nav-item ${
                  (hasPermission('Xem tài khoản') && (location.pathname.startsWith("/users"))) ? "active" : ""
                }`}
              >
                <NavLink
                  to="#accountManagement"
                  className="collapsed"
                  aria-expanded={isAccountManagementActive.toString()}
                  data-bs-toggle="collapse"
                >
                  <i className="fa-solid fa-users"></i>
                  <p>Quản Lý Tài khoản</p>
                  <span className="caret"></span>
                </NavLink>
                <div className={`collapse ${ (hasPermission('Xem tài khoản') && (location.pathname.startsWith("/users"))) ? "show" : "" }`} id="accountManagement">
                  <ul className="nav nav-collapse">
                    <li>
                      <NavLink to="/users">
                        <span className="sub-item">Tài khoản</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {/* Quản Lý Đơn Hàng */}
            <li
              className={`nav-item ${isOrderManagementActive ? "active" : ""}`}
            >
              <NavLink
                to="#orderManagement"
                className="collapsed"
                aria-expanded={isOrderManagementActive.toString()}
                data-bs-toggle="collapse"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <p>Quản Lý Đơn Hàng</p>
                <span className="caret"></span>
              </NavLink>
              <div
                className={`collapse ${isOrderManagementActive ? "show" : ""}`}
                id="orderManagement"
              >
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/order">
                      <span className="sub-item">Đơn hàng</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/order-detail">
                      <span className="sub-item">Chi tiết đơn hàng</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/pay-method">
                      <span className="sub-item">Quản lý thanh toán</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Quản Lý Đặt Bàn */}
            <li
              className={`nav-item ${isTableManagementActive ? "active" : ""}`}
            >
              <NavLink
                to="#tableManagement"
                className="collapsed"
                aria-expanded={isTableManagementActive.toString()}
                data-bs-toggle="collapse"
              >
                <i className="fa-solid fa-chair"></i>
                <p>Quản Lý Đặt Bàn</p>
                <span className="caret"></span>
              </NavLink>
              <div
                className={`collapse ${isTableManagementActive ? "show" : ""}`}
                id="tableManagement"
              >
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/tables">
                      <span className="sub-item">Quản lý bàn ăn</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/reservation">
                      <span className="sub-item">Quản lý đặt bàn</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Quản Lý Bình Luận */}
            <li
              className={`nav-item ${
                isCommentManagementActive ? "active" : ""
              }`}
            >
              <NavLink
                to="#commentManagement"
                className="collapsed"
                aria-expanded={isCommentManagementActive.toString()}
                data-bs-toggle="collapse"
              >
                <i className="fa-solid fa-comments"></i>
                <p>Quản Lý Bình Luận</p>
                <span className="caret"></span>
              </NavLink>
              <div
                className={`collapse ${
                  isCommentManagementActive ? "show" : ""
                }`}
                id="commentManagement"
              >
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/comment-products">
                      <span className="sub-item">Bình luận sản phẩm</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/comment-blog">
                      <span className="sub-item">Bình luận bài viết</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Quản Lý Quyền */}
            <li
              className={`nav-item ${isRoleManagementActive ? "active" : ""}`}
            >
              <NavLink
                to="#roleManagement"
                className="collapsed"
                aria-expanded={isRoleManagementActive.toString()}
                data-bs-toggle="collapse"
              >
                <i className="fa-solid fa-user-shield"></i>
                <p>Quản Lý Quyền</p>
                <span className="caret"></span>
              </NavLink>
              <div
                className={`collapse ${isRoleManagementActive ? "show" : ""}`}
                id="roleManagement"
              >
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/role">
                      <span className="sub-item">Vai trò</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/permissions">
                      <span className="sub-item">Phân quyền</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Quản Lý chat với khách hàng*/}
            {hasPermission('Tư vấn khách hàng') && (
              <li className={`nav-item ${(hasPermission('Tư vấn khách hàng') && location.pathname.startsWith("/user-chats")) ? "active" : ""}`}>
              <NavLink
                to="#chatManagement"
                className="collapsed"
                aria-expanded={isChatManagement.toString()}
                data-bs-toggle="collapse"
              >
                <i className="fa-regular fa-message"></i>
                <p>Tư vấn với khách hàng</p>
                <span className="caret"></span>
              </NavLink>
              <div
                className={`collapse ${(hasPermission('Tư vấn khách hàng') && location.pathname.startsWith("/user-chats")) ? "show" : ""}`}
                id="chatManagement"
              >
                <ul className="nav nav-collapse">
                  <li>
                    <NavLink to="/user-chats">
                      <span className="sub-item">Tư vấn với khách hàng</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
