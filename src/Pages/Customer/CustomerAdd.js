import { Link } from 'react-router-dom'

export default function CustomerAdd () {
    return (
        <div className="container">
            <div className="page-inner">
                <div class="row">
                    <form class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Thêm khách hàng</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="name">Tên</label>
                                            <input type="text" class="form-control" id="name" placeholder="Nhập tên"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <input type="email" class="form-control" id="email" placeholder="Nhập email"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="pass">Mật khẩu</label>
                                            <input type="text" class="form-control" id="pass" placeholder="Nhập mật khẩu"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="diaChi">Địa chỉ</label>
                                            <input type="text" class="form-control" id="diaChi" placeholder="Nhập địa chỉ"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="sdt">Số điện thoại</label>
                                            <input type="text" class="form-control" id="sdt" placeholder="Nhập số điện thoại"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1">Ảnh đại diện</label><br/>
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
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