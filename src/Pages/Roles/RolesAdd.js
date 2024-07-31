import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { addRole } from "../../Actions/RoleActions";
import { SuccessAlert } from "../../Components/Alert/Alert";

export default function RolesAdd() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const navigate = useNavigate();

    const [openSuccess, setOpenSuccess] = useState(false);

    const onSubmit = (data) => {
        dispatch(addRole(data));
        setOpenSuccess(true);
        reset();
        setTimeout(() => {
            navigate('/role');
        }, 2000); // Điều hướng sau 2 giây để người dùng có thể xem thông báo
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Thêm vai trò</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">Tên vai trò</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Nhập tên vai trò"
                                                {...register('name', { required: 'Tên vai trò là bắt buộc' })}
                                            />
                                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Mô tả</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                placeholder="Nhập mô tả"
                                                {...register('description', { required: 'Mô tả là bắt buộc' })}
                                            />
                                            {errors.description && <p className="text-danger">{errors.description.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="btn-group mt-3" role="group">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => navigate('/role')}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Thêm vai trò thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    );
}
