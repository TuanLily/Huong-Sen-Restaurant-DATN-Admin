import { Link } from 'react-router-dom'

export default function PlacesAdd () {
    return (
        <div className="container">
            <div className="page-inner">
                <div class="row">
                    <form class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Thêm thứ hạng khách hàng</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="name">Mã khách hàng</label>
                                            <input type="text" class="form-control" id="name" placeholder="Nhập tên mã khách hàng"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Thứ hạng</label>
                                            <select class="form-select">
                                                <option>Bạc</option>
                                                <option>Vàng</option>
                                                <option>Kim Cương</option>
                                            </select>
                                        </div>
                                        
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="price">Điểm tích lũy</label>
                                            <input type="text" class="form-control" id="price" placeholder="Nhập điểm tích lũy"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                            <label for="description">Mô tả</label>
                                            <textarea class="form-control" id="description" rows="4"></textarea>
                                        </div>
                            </div>
                            <div class="card-action">
                                <div className="btn-group mt-3" role="group">
                                    <button class="btn btn-success">Xác nhận</button>
                                    <button class="btn btn-danger">Hủy</button>
                                </div>   
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}