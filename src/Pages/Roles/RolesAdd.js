import { Link } from 'react-router-dom'

export default function RolesAdd() {
    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Thêm vai trò</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div>
                                        <div className="form-group">
                                            <label for="name">Tên vai trò</label>
                                            <input type="text" className="form-control" id="name" placeholder="Nhập tên vai trò" />
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group">
                                    <label for="description">Mô tả</label>
                                    <textarea className="form-control" id="description" rows="4"></textarea>
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