import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { addProduct , fetchProduct } from "../../Actions/ProductActions";
import { fetchProductCategory } from "../../Actions/ProductCategoryActions";
import ImageUploadComponent from "../../Components/ImageUpload/ImageUpload";
import { SuccessAlert } from "../../Components/Alert/Alert";

export default function ProductAdd () {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const productState = useSelector(state => state.product);
    const productCategoryState = useSelector(state => state.product_category);

    useEffect(() => {
        dispatch(fetchProductCategory());
        dispatch(fetchProduct());
    }, [dispatch]);


    const navigate = useNavigate();

    const [imageError, setImageError] = useState('');
    const [image, setImage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setImage(fileNames[0]);
        }
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {
        if (!image) {
            setImageError ('Vui lòng chọn ảnh sản phẩm!');
            return;
        }
        
        setImageError('');

        data.image = image;
        if (!data.description) {
            data.description = 'Không có mô tả';
        }
        dispatch(addProduct(data))
        setOpenSuccess(true);
        reset();
        setTimeout(() => {
            navigate('/product');
        }, 2000); // Điều hướng sau 2 giây để người dùng có thể xem thông báo

    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Thêm sản phẩm</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="name">Tên sản phẩm</label>
                                            <input type="text" className="form-control" id="name" placeholder="Nhập tên sản phẩm" {...register('name', { required: 'Vui lòng điền tên!' })}/>
                                            {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="code">Mã hiệu sản phẩm</label>
                                            <input type="text" className="form-control" id="product_code" placeholder="Nhập mã hiệu sản phẩm" {...register('product_code', { required: 'Vui lòng điền mã hiệu!' , validate: value => {const exists = productState.product.some (p => p.product_code == value) ; return !exists || 'Mã hiệu sản phẩm đã tồn tại!' } })}/>
                                            {errors.product_code && <div className="text-danger">{errors.product_code.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="price">Giá niêm yết</label>
                                            <input type="number" className="form-control" id="price" placeholder="Nhập giá niêm yết" {...register('price', { required: 'Vui lòng điền giá niêm yết!' })}/>
                                            {errors.price && <div className="text-danger">{errors.price.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Danh mục</label>
                                            <select className="form-select" id="category_id" {...register('category_id', { required: 'Vui lòng chọn danh mục!' })}>
                                                <option value="">---</option>
                                                {productCategoryState.product_category && productCategoryState.product_category
                                                    .filter(item => item.status == 1)
                                                    .map((item, index) => (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    ))
                                                }
                                            </select>
                                            {errors.category_id && <div className="text-danger">{errors.category_id.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Mô tả sản phẩm</label>
                                            <textarea className="form-control" id="description" rows="4" {...register('description')}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="saleEmail">Giá khuyến mãi</label>
                                            <input type="number" className="form-control" id="sale_price" placeholder="Nhập giá khuyến mãi" 
                                            {...register('sale_price', { required: 'Vui lòng điền giá khuyến mãi!' , validate: value => {const price = Number(watch('price')) ; const sale_price = Number(value) ; return sale_price <= price || 'Giá khuyến mãi không được lớn hơn giá niêm yết!' ;}})}/>
                                            {errors.sale_price && <div className="text-danger">{errors.sale_price.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select className="form-select" id="status" {...register('status', { required: 'Vui lòng chọn trạng thái!' })}>
                                                <option value="">---</option>
                                                <option value='1'>Đang kinh doanh</option>
                                                <option value='0'>Tạm ngưng bán</option>
                                            </select>
                                            {errors.status && <div className="text-danger">{errors.status.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlFile1">Ảnh sản phẩm</label><br/>
                                            <ImageUploadComponent id="image" onImageUpload={handleImageUpload} />
                                            {imageError && <div className="text-danger">{imageError}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="btn-group mt-3" role="group">
                                    <button className="btn btn-success">Submit</button>
                                    <button className="btn btn-danger" onClick={() => navigate('/product')}>Cancel</button>
                                </div>   
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Thêm sản phẩm thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    )
}