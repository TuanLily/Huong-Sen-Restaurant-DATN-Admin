import { Link } from 'react-router-dom'

export default function CustomerGroupEdit () {
    return (
        <div className="container">
            <div className="page-inner">
                <div class="row">
                    <form class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Thêm nhóm khách hàng</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="name">Tên nhóm khách hàng</label>
                                            <input type="text" class="form-control" id="name" placeholder="Nhập tên sản phẩm"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Phần trăm ưu đãi</label>
                                            <select class="form-select">
                                                <option>10%</option>
                                                <option>15%</option>
                                                <option>20%</option>
                                                <option>25%</option>
                                                <option>30%</option>
                                            </select>
                                        </div>
                                        
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="price">Điểm tích lũy</label>
                                            <input type="text" class="form-control" id="price" placeholder="Nhập giá niêm yết"/>
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