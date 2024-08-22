import React from 'react';

export default function PermissionsList() {
    return (
        
        <div className="container">
            <div className="page-inner">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h4 className="fw-bold mb-3">Quản lý quyền hạn</h4>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Danh sách vai trò</div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="mb-3 col-md-4">
                                    <select className="form-select">
                                        <option selected>Chọn vai trò ...</option>
                                        <option value="1">Vai trò 1</option>
                                        <option value="2">Vai trò 2</option>
                                        <option value="3">Vai trò 3</option>
                                    </select>
                                </div>
                                <div className="mb-3 col-md-4">
                                    <input type="text" className="form-control" placeholder="Tìm kiếm chức năng ở đây..." />
                                </div>
                                <div className="row justify-content-around">
                                    {/* Hàng 1 */}
                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý sản phẩm</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="productCreate" />
                                            <label className="form-check-label" htmlFor="productCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="productEdit" />
                                            <label className="form-check-label" htmlFor="productEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="productDelete" />
                                            <label className="form-check-label" htmlFor="productDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="productView" />
                                            <label className="form-check-label" htmlFor="productView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="productRestore" />
                                            <label className="form-check-label" htmlFor="productRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý danh mục</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="categoryCreate" />
                                            <label className="form-check-label" htmlFor="categoryCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="categoryEdit" />
                                            <label className="form-check-label" htmlFor="categoryEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="categoryDelete" />
                                            <label className="form-check-label" htmlFor="categoryDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="categoryView" />
                                            <label className="form-check-label" htmlFor="categoryView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="categoryRestore" />
                                            <label className="form-check-label" htmlFor="categoryRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý bài viết</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="postCreate" />
                                            <label className="form-check-label" htmlFor="postCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="postEdit" />
                                            <label className="form-check-label" htmlFor="postEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="postDelete" />
                                            <label className="form-check-label" htmlFor="postDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="postView" />
                                            <label className="form-check-label" htmlFor="postView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="postRestore" />
                                            <label className="form-check-label" htmlFor="postRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý khuyến mãi</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="promotionCreate" />
                                            <label className="form-check-label" htmlFor="promotionCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="promotionEdit" />
                                            <label className="form-check-label" htmlFor="promotionEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="promotionDelete" />
                                            <label className="form-check-label" htmlFor="promotionDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="promotionView" />
                                            <label className="form-check-label" htmlFor="promotionView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="promotionRestore" />
                                            <label className="form-check-label" htmlFor="promotionRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý nhóm khách hàng</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerGroupCreate" />
                                            <label className="form-check-label" htmlFor="customerGroupCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerGroupEdit" />
                                            <label className="form-check-label" htmlFor="customerGroupEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerGroupDelete" />
                                            <label className="form-check-label" htmlFor="customerGroupDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerGroupView" />
                                            <label className="form-check-label" htmlFor="customerGroupView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerGroupRestore" />
                                            <label className="form-check-label" htmlFor="customerGroupRestore">Khôi phục</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-around mt-4">
                                    {/* Hàng 2 */}
                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý thứ hạng</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerCreate" />
                                            <label className="form-check-label" htmlFor="customerCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerEdit" />
                                            <label className="form-check-label" htmlFor="customerEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerDelete" />
                                            <label className="form-check-label" htmlFor="customerDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerView" />
                                            <label className="form-check-label" htmlFor="customerView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerRestore" />
                                            <label className="form-check-label" htmlFor="customerRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý khách hàng</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerCreate" />
                                            <label className="form-check-label" htmlFor="bannerCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerEdit" />
                                            <label className="form-check-label" htmlFor="bannerEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerDelete" />
                                            <label className="form-check-label" htmlFor="bannerDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerView" />
                                            <label className="form-check-label" htmlFor="bannerView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerRestore" />
                                            <label className="form-check-label" htmlFor="bannerRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý nhân viên</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemCreate" />
                                            <label className="form-check-label" htmlFor="systemCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemEdit" />
                                            <label className="form-check-label" htmlFor="systemEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemDelete" />
                                            <label className="form-check-label" htmlFor="systemDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemView" />
                                            <label className="form-check-label" htmlFor="systemView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemRestore" />
                                            <label className="form-check-label" htmlFor="systemRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý đơn hàng</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemCreate" />
                                            <label className="form-check-label" htmlFor="systemCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemEdit" />
                                            <label className="form-check-label" htmlFor="systemEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemDelete" />
                                            <label className="form-check-label" htmlFor="systemDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemView" />
                                            <label className="form-check-label" htmlFor="systemView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemRestore" />
                                            <label className="form-check-label" htmlFor="systemRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý chi tiết đơn hàng</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemCreate" />
                                            <label className="form-check-label" htmlFor="systemCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemEdit" />
                                            <label className="form-check-label" htmlFor="systemEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemDelete" />
                                            <label className="form-check-label" htmlFor="systemDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemView" />
                                            <label className="form-check-label" htmlFor="systemView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemRestore" />
                                            <label className="form-check-label" htmlFor="systemRestore">Khôi phục</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-around mt-4">
                                    {/* Hàng 3 */}
                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý thanh toán</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerCreate" />
                                            <label className="form-check-label" htmlFor="customerCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerEdit" />
                                            <label className="form-check-label" htmlFor="customerEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerDelete" />
                                            <label className="form-check-label" htmlFor="customerDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerView" />
                                            <label className="form-check-label" htmlFor="customerView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="customerRestore" />
                                            <label className="form-check-label" htmlFor="customerRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý bình luận sản phẩm</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerCreate" />
                                            <label className="form-check-label" htmlFor="bannerCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerEdit" />
                                            <label className="form-check-label" htmlFor="bannerEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerDelete" />
                                            <label className="form-check-label" htmlFor="bannerDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerView" />
                                            <label className="form-check-label" htmlFor="bannerView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="bannerRestore" />
                                            <label className="form-check-label" htmlFor="bannerRestore">Khôi phục</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý bình luận blog</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemDelete" />
                                            <label className="form-check-label" htmlFor="systemDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemView" />
                                            <label className="form-check-label" htmlFor="systemView">Xem</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý bình luận bàn ăn</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemDelete" />
                                            <label className="form-check-label" htmlFor="systemDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemView" />
                                            <label className="form-check-label" htmlFor="systemView">Xem</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className='fw-bold'>Quản lý đặt bàn</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemCreate" />
                                            <label className="form-check-label" htmlFor="systemCreate">Tạo mới</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemEdit" />
                                            <label className="form-check-label" htmlFor="systemEdit">Chỉnh sửa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemDelete" />
                                            <label className="form-check-label" htmlFor="systemDelete">Xóa</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemView" />
                                            <label className="form-check-label" htmlFor="systemView">Xem</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="systemRestore" />
                                            <label className="form-check-label" htmlFor="systemRestore">Khôi phục</label>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-3">Áp dụng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
