import { Link } from 'react-router-dom'

export default function TableEdit () {
    return (
        <div className="container">
            <div className="page-inner">
                <div class="row">
                    <form class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Cập nhật bàn ăn</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="name">Số bàn</label>
                                            <input type="text" class="form-control" id="name" placeholder="Nhập số bàn"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="code">Loại bàn</label>
                                            <input type="text" class="form-control" id="code" placeholder="Nhập loại bàn"/>
                                        </div>
                                    </div>
                                        <div className="col-md-6">
                                        <div class="form-group">
                                            <label for="price">Số lượng</label>
                                            <input type="text" class="form-control" id="price" placeholder="Nhập số lượng người"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Trạng thái</label>
                                            <select class="form-select">
                                                <option>Trống</option>
                                                <option>Đặt trước</option>
                                                <option>Đang sử dụng</option>
                                                <option>Bảo trì</option>
                                            </select>
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