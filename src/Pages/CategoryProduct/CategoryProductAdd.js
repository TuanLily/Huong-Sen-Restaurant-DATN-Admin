import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { addProductCategory } from "../../Actions/ProductCategoryActions";
import { SuccessAlert } from "../../Components/Alert/Alert";

export default function CategoryProductAdd () {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    const navigate = useNavigate();

    const [openSuccess, setOpenSuccess] = useState(false);

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {
        console.log (data);
        dispatch(addProductCategory(data))
        setOpenSuccess(true);
        reset();
        setTimeout(() => {
            navigate('/category-product');
        }, 2000); // Điều hướng sau 2 giây để người dùng có thể xem thông báo

    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Thêm danh mục</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="name">Tên danh mục</label>
                                            <input type="text" className="form-control" id="name" placeholder="Nhập tên danh mục" {...register('name', { required: 'Vui lòng điền tên danh mục!' })}/>
                                            {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group h-75">
                                            <label>Trạng thái</label>
                                            <select className="form-select h-75" id='status' {...register('status')}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Ngưng hoạt động</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="btn-group mt-3" role="group">
                                    <button className="btn btn-success">Submit</button>
                                    <button className="btn btn-danger" onClick={() => navigate('/category-product')}>Cancel</button>
                                </div>   
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Thêm danh mục thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    )
}