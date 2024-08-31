import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";

import { setCurrentPage } from "../../Actions/CustomerActions";
import DialogConfirm from "../../Components/Dialog/Dialog";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";
import { SuccessAlert } from "../../Components/Alert/Alert";
import { deleteUsers, fetchUsers } from "../../Actions/UsersAction";
import { fetchRole } from "../../Actions/RoleActions";


export default function UserChatsList() {
  return (
    <div className="container">
      <div className="page-inner bg-light rounded p-4 shadow-sm">
        <div className="d-flex align-items-center flex-column flex-md-row mb-4">
          <div>
            <h3 className="fw-bold mb-2">Quản lý chat khách hàng</h3>
            <h6 className="text-muted mb-3">Hương Sen Admin Dashboard</h6>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-4 p-3">
            <div
              className="border-start bg-white"
              style={{ height: "640px", overflowY: "auto" }} // Tùy chỉnh kích thước khung hiển thị tài khoản
            >
              <div
                className="sticky-top bg-light p-3"
                style={{ top: 0, zIndex: 100 }}
              >
                <h5 className="fw-bold mb-3"># Danh sách tin nhắn</h5>
                <form className="form-action">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm..."
                    style={{ width: "100%" }}
                  />
                </form>
              </div>
              <div className="list-group">
                {Array(10)
                  .fill()
                  .map((_, i) => (
                    <a
                      href="#"
                      className="list-group-item list-group-item-action d-flex align-items-center p-3 border-bottom"
                      key={i}
                    >
                      <img
                        src="../../Assets/Images/profile.jpg"
                        alt="Avatar"
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px" }}
                      />
                      <div className="flex-grow-1">
                        <p className="mb-0">
                          <strong>Anh Long</strong>{" "}
                          <i
                            className="fa-solid fa-circle-dot"
                            style={{ color: "blue", fontSize: "small" }}
                          ></i>
                        </p>
                        <small className="text-muted">Có tin nhắn mới</small>
                      </div>
                      <span className="text-muted ms-auto">12:49</span>
                    </a>
                  ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className="border bg-white rounded">
              <div className="d-flex align-items-center p-3 border-bottom">
                <img
                  src="../../Assets/Images/profile.jpg"
                  alt="Logo"
                  className="me-3 rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />
                <p className="mb-0">
                  <strong>Anh Long</strong>
                </p>
                <div className="ms-auto">
                  <div className="dropdown">
                    <button
                      className="btn btn-light"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <Link className="dropdown-item" to="#">
                          Kết thúc trò chuyện
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          <span className="text-danger">Xóa lịch sử chat</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="d-flex flex-column border"
                style={{ height: "500px", overflowY: "auto" }}
              >
                <div className="d-flex align-items-start mb-3 p-2">
                  <img
                    src="../../Assets/Images/profile.jpg"
                    alt="Avatar"
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <div
                      className="bg-light p-3 rounded"
                      style={{ maxWidth: "60%" }}
                    >
                      <p className="mb-1">Xin chào</p>
                    </div>
                    <small className="text-muted d-block mt-1">
                      Đã gửi • 12:30 22/08/2024
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-end justify-content-end mb-3 p-2">
                  <div className="text-end">
                    <div className="bg-warning text-dark p-3 rounded">
                      <p className="mb-1">
                        Xin chào, mình là Long bạn cần Nhà hàng hỗ trợ gì ạ?
                      </p>
                    </div>
                    <small className="text-muted mt-1">
                      Đã gửi • 12:32 22/08/2024
                    </small>
                  </div>
                  <img
                    src="../../Assets/Images/huong-sen-logo.png"
                    alt="Admin Avatar"
                    className="rounded-circle ms-2"
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center p-3 border-top bg-light">
                <input
                  type="text"
                  className="form-control me-3"
                  placeholder="Nhập nội dung..."
                  style={{ flex: 1 }}
                />
                <button className="btn btn-warning">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
