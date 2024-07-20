import { Link } from 'react-router-dom'

export default function PermissionsEdit () {
    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Sửa quyền hạn</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div>
                                        <div className="form-group">
                                            <label for="name">Tên quyền hạn</label>
                                            <input type="text" className="form-control" id="name" placeholder="Nhập tên quyền hạn"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="btn-group mt-3" role="group">
                                    <button className="btn btn-success">Xác nhận</button>
                                    <button className="btn btn-danger">Hủy</button>
                                </div>   
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}