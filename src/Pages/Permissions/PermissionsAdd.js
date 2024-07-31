import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { addPermissions } from "../../Actions/PermissionsActions";
import { SuccessAlert } from "../../Components/Alert/Alert";

export default function PermissionsAdd() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const navigate = useNavigate();

    const [openSuccess, setOpenSuccess] = useState(false);

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {
        dispatch(addPermissions(data));
        setOpenSuccess(true);
        reset();
        setTimeout(() => {
            navigate('/permissions');
        }, 2000); // Navigate after 2 seconds to allow the user to see the alert
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Thêm quyền hạn</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Tên quyền hạn</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Nhập tên quyền hạn"
                                                {...register('name', { required: 'Tên là bắt buộc' })}
                                            />
                                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="btn-group mt-3" role="group">
                                    <button type="submit" className="btn btn-success">Xác nhận</button>
                                    <button type="button" className="btn btn-danger" onClick={() => navigate('/permissions')}>Hủy</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Thêm quyền hạn thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    );
}
