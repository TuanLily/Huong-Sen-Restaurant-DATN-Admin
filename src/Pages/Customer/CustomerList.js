import React from 'react'
import { Link } from 'react-router-dom'

export default function CustomerList () {
    return (
        <div className="container">
            <div className="page-inner">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="fw-bold mb-3">Quản lý khách hàng</h3>
                        <h6 className="op-7 mb-2">Hương Sen Admin Dashboard</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <Link to="" className="btn btn-label-info btn-round me-2">Manage</Link>
                        <Link to="/customer/add" className="btn btn-primary btn-round">Thêm khách hàng</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Danh sách</div>
                                    <div className="card-tools">
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-icon btn-clean me-0"
                                                type="button"
                                                id="dropdownMenuButton"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="fas fa-ellipsis-h"></i>
                                            </button>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton"
                                            >
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive text-center">
                                    <table className="table align-items-center mb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th className='w-10' scope="col">Ảnh đại diện</th>
                                                <th scope="col">Tên</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Sdt</th>
                                                <th scope="col">Địa chỉ</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>01</td>
                                                <td>
                                                    <img className="img-fluid rounded w-100" src='../Assets/Images/a1.jpg'/>
                                                </td>
                                                <td>Nguyễn Văn Â</td>
                                                <td>dtd872938@gmail.com</td>
                                                <td>
                                                    07878372822
                                                </td>
                                                <td>
                                                    Dộng bàn tơ Việt Nam...
                                                </td>
                                                <td>
                                                    <div className="btn-group mt-3" role="group">
                                                        <button type="button" className="btn btn-outline-success">
                                                            <Link to='/customer/edit'><span className='text-success'>Sửa</span></Link>
                                                        </button>
                                                        <button type="button" className="btn btn-outline-danger">
                                                            <Link to='/customer/delete'><span className='text-danger'>Xóa</span></Link>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>01</td>
                                                <td>
                                                    <img className="img-fluid rounded w-100" src='../Assets/Images/a1.jpg'/>
                                                </td>
                                                <td>Nguyễn Văn Â</td>
                                                <td>dtd872938@gmail.com</td>
                                                <td>
                                                    07878372822
                                                </td>
                                                <td>
                                                    Dộng bàn tơ Việt Nam...
                                                </td>
                                                <td>
                                                    <div className="btn-group mt-3" role="group">
                                                        <button type="button" className="btn btn-outline-success">
                                                            <Link to='/customer/edit'><span className='text-success'>Sửa</span></Link>
                                                        </button>
                                                        <button type="button" className="btn btn-outline-danger">
                                                            <Link to='/customer/delete'><span className='text-danger'>Xóa</span></Link>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>01</td>
                                                <td>
                                                    <img className="img-fluid rounded w-100" src='../Assets/Images/a1.jpg'/>
                                                </td>
                                                <td>Nguyễn Văn Â</td>
                                                <td>dtd872938@gmail.com</td>
                                                <td>
                                                    07878372822
                                                </td>
                                                <td>
                                                    Dộng bàn tơ Việt Nam...
                                                </td>
                                                <td>
                                                    <div className="btn-group mt-3" role="group">
                                                        <button type="button" className="btn btn-outline-success">
                                                            <Link to='/customer/edit'><span className='text-success'>Sửa</span></Link>
                                                        </button>
                                                        <button type="button" className="btn btn-outline-danger">
                                                            <Link to='/customer/delete'><span className='text-danger'>Xóa</span></Link>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}