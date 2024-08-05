import { Link } from 'react-router-dom'

export default function EmployeeEdit () {
    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Cập nhật nhân viên</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label for="name">Họ và tên</label>
                                            <input type="text" className="form-control" id="name" placeholder="Nhập họ và tên"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="Nhập email" {...register('email', { 
                                                required: 'Vui lòng điền email!',
                                                pattern: {
                                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                        message: 'Email không hợp lệ',
                                                    }, 
                                                })}/>
                                            {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Số điện thoại</label>
                                            <input type="text" className="form-control" id="tel" placeholder="Nhập số điện thoại" {...register('tel', { 
                                                required: 'Vui lòng điền số điện thoại!',
                                                pattern: {
                                                        value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                                        message: 'Số điện thoại không không đúng định dạng',
                                                    },
                                                })}/>
                                            {errors.tel && <div className="text-danger">{errors.tel.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Vai trò</label>
                                            <select className="form-select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label for="diaChi">Địa chỉ</label>
                                            <input type="text" className="form-control" id="diaChi" placeholder="Nhập địa chỉ"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="sdt">Số điện thoại</label>
                                            <input type="text" className="form-control" id="sdt" placeholder="Nhập số điện thoại"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select className="form-select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleFormControlFile1">Ảnh đại diện</label><br/>
                                            <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
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