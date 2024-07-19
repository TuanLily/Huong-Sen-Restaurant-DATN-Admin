import { Link } from 'react-router-dom'

export default function PromotionAdd () {
    return (
        <div className="container">
            <div className="page-inner">
                <div class="row">
                    <form class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Thêm mã khuyến mãi</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="">Tên khuyến mãi</label>
                                            <input type="text" class="form-control" id="" placeholder="Nhập tên khuyến mãi"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Phần trăm</label>
                                            <input type="text" class="form-control" id="" placeholder="Nhập số phần trăm"/>
                                        </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="">Ngày bắt đầu</label>
                                            <input type="date" class="form-control" id="" />
                                        </div>
                                        <div class="form-group">
                                            <label for="">Ngày kết thúc</label>
                                            <input type="date" class="form-control" id=""/>
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