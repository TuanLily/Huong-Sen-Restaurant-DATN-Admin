import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../../Actions/EmployeeActions";
import { fetchRole } from "../../Actions/RoleActions";
import ImageUploadComponent from "../../Components/ImageUpload/ImageUpload";
import { SuccessAlert } from "../../Components/Alert/Alert";

export default function EmployeeAdd () {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const roleState = useSelector(state => state.role);

    useEffect(() => {
        dispatch(fetchRole());
    }, [dispatch]);

    const navigate = useNavigate();

    const [avatar, setAvatar] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);


    const password = watch('password');

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setAvatar(fileNames[0]);
        }
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {
        data.avatar = avatar;
        dispatch(addEmployee(data))
        setOpenSuccess(true);
        reset();
        setTimeout(() => {
            navigate('/employee');
        }, 2000);
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Thêm nhân viên</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="fullname">Họ và tên</label>
                                            <input type="text" className="form-control" id="fullname" placeholder="Nhập họ và tên" {...register('fullname', { required: 'Vui lòng điền họ và tên!' })}/>
                                            {errors.fullname && <div className="text-danger">{errors.fullname.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="Nhập email" {...register('email', { required: 'Vui lòng điền email!' })}/>
                                            {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Số điện thoại</label>
                                            <input type="text" className="form-control" id="tel" placeholder="Nhập số điện thoại" {...register('tel', { required: 'Vui lòng điền số điện thoại!' })}/>
                                            {errors.tel && <div className="text-danger">{errors.tel.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Vai trò</label>
                                            <select className="form-select" id="role_id" {...register('role_id', { required: 'Vui lòng chọn vai trò!' })}>
                                                {roleState.role && roleState.role.map((item, index) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input type="text" className="form-control" id="address" placeholder="Nhập địa chỉ" {...register('address', { required: 'Vui lòng điền địa chỉ!' })}/>
                                            {errors.address && <div className="text-danger">{errors.address.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Mật khẩu</label>
                                            <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" {...register('password', { required: 'Vui lòng điền mật khẩu!' })}/>
                                            {errors.password && <div className="text-danger">{errors.password.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select className="form-select" id="status" {...register('status', { required: 'Vui lòng chọn trạng thái!' })}>
                                                <option value='1'>Đang làm việc</option>
                                                <option value='0'>Nghỉ việc</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="avatar">Ảnh nhân viên</label><br/>
                                            <ImageUploadComponent id="avatar" onImageUpload={handleImageUpload} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="btn-group mt-3" role="group">
                                    <button className="btn btn-success">Submit</button>
                                    <button className="btn btn-danger" onClick={() => navigate('/employee')}>Cancel</button>
                                </div>   
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Thêm nhân viên thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    )
}
