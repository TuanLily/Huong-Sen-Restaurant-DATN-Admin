import { Link } from 'react-router-dom'

export default function PromotionEdit () {
    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Cập nhật mã khuyến mãi</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="">Tên khuyến mãi</label>
                                            <input type="text" className="form-control" id="" placeholder="Nhập tên khuyến mãi"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="">Phần trăm</label>
                                            <input type="text" className="form-control" id="" placeholder="Nhập số phần trăm"/>
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="">Ngày bắt đầu</label>
                                            <input type="date" className="form-control" id="" />
                                        </div>
                                        <div className="form-group">
                                            <label for="">Ngày kết thúc</label>
                                            <input type="date" className="form-control" id=""/>
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