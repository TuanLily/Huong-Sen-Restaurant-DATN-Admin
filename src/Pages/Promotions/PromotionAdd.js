import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { addPromotion } from "../../Actions/PromotionActions";
import { SuccessAlert } from "../../Components/Alert/Alert";

export default function PromotionAdd () {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    const navigate = useNavigate();

    const [openSuccess, setOpenSuccess] = useState(false);

    const watchValidFrom = watch('valid_from');

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {
        const addOneDay = (date) => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1);
            return newDate.toLocaleDateString('en-CA');
        };
    
        const validFromDate = addOneDay(data.valid_from);
        const validToDate = addOneDay(data.valid_to);
        const promotionData = {
            ...data,
            valid_from: validFromDate,
            valid_to: validToDate,
        };

        dispatch(addPromotion(promotionData))
        setOpenSuccess(true);
        reset();
        setTimeout(() => {
            navigate('/promotions');
        }, 2000);

    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Thêm mã khuyến mãi</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="">Tên khuyến mãi</label>
                                            <input type="text" className="form-control" id="" placeholder="Nhập tên khuyến mãi" {...register('name', { required: 'Vui lòng điền tên!' })}/>
                                            {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Phần trăm giảm</label>
                                            <input type="number" className="form-control" id="" placeholder="Nhập số phần trăm" {...register('discount', { required: 'Vui lòng nhập phần trăm giảm!' , min: {value: 1, message: 'Phần trăm giảm phải lớn hơn hoặc bằng 1!'} , max: {value: 99, message: 'Phần trăm giảm phải nhỏ hơn hoặc bằng 99!'} })}/>
                                            {errors.discount && <div className="text-danger">{errors.discount.message}</div>}
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="">Ngày bắt đầu</label>
                                            <input type="date" className="form-control" id="" {...register('valid_from', { required: 'Vui lòng nhập ngày bắt đầu!' })}/>
                                            {errors.valid_from && <div className="text-danger">{errors.valid_from.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Ngày kết thúc</label>
                                            <input type="date" className="form-control" id="" {...register('valid_to', { required: 'Vui lòng nhập ngày kết thúc!' , validate: value => {if (new Date(value) <= new Date(watchValidFrom)) {return 'Ngày kết thúc không hợp lệ!';}return true;} })}/>
                                            {errors.valid_to && <div className="text-danger">{errors.valid_to.message}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="btn-group mt-3" role="group">
                                    <button className="btn btn-success">Submit</button>
                                    <button className="btn btn-danger" onClick={() => navigate('/promotions')}>Cancel</button>
                                </div>   
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Thêm khuyến mãi thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    )
}