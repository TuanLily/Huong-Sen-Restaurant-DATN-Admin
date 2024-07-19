import { Link } from 'react-router-dom'

export default function ReservationEdit () {
    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Cập nhật bàn đặt</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6">
                                    <div className="form-group">
                                            <label>Mã khách hàng</label>
                                            <select className="form-select">
                                                <option>1</option>
                                                <option>3</option>
                                                <option>5</option>
                                                <option>7</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Mã bàn</label>
                                            <select className="form-select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="">Ngày đặt</label>
                                            <input type="date" className="form-control" id=""/>
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="">Số lượng</label>
                                            <input type="number" className="form-control" id="" placeholder="Nhập số lượng người"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select className="form-select">
                                                <option>Đang chờ xác nhận</option>
                                                <option>Đã xác nhận</option>
                                                <option>Đã hủy</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="btn-group mt-3" role="group">
                                    <button className="btn btn-success">Submit</button>
                                    <button className="btn btn-danger">Cancel</button>
                                </div>   
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}