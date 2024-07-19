import { Link } from 'react-router-dom'

export default function  PayMethodAdd () {
    return (
        <div className="container">
            <div className="page-inner">
                <div class="row">
                    <form class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Thêm hóa đơn thanh toán</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                    <div class="form-group">
                                            <label>Mã đơn hàng</label>
                                            <select class="form-select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>
                                    </div>
                                    <div class="form-group">
                                            <label>Mã khách hàng</label>
                                            <select class="form-select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>
                                    </div>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="form-group">
                                            <label>Phương thức thanh toán</label>
                                            <select class="form-select">
                                                <option>Tiền mặt</option>
                                                <option>Chuyển khoản</option>
                                            </select>
                                    </div>
                                        <div class="form-group">
                                            <label for="price">Số tiền thanh toán</label>
                                            <input type="text" class="form-control" id="price" placeholder="Nhập số lượng người"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-action">
                                <div className="btn-group mt-3" role="group">
                                    <button class="btn btn-success">Submit</button>
                                    <button class="btn btn-danger">Cancel</button>
                                </div>   
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}