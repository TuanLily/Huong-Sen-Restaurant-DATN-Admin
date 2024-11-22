import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { addProduct , fetchProduct } from "../../Actions/ProductActions";
import { fetchProductCategory } from "../../Actions/ProductCategoryActions";
import ImageUploadComponent from "../../Components/ImageUpload/ImageUpload";
import { SuccessAlert } from "../../Components/Alert/Alert";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";

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
    const [loading, setLoading] = useState(false);
    const [randomCode, setRandomCode] = useState(generateRandomCode());

    function generateRandomCode() {
        return `HS${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const regenerateCode = (e) => {
        e.preventDefault();
        setRandomCode(generateRandomCode());
    };

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setImage(fileNames[0]);
        }
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = async (data) => {
        if (!image) {
            setImageError ('Vui lòng chọn ảnh sản phẩm!');
            return;
        }
        
        setImageError('');

        data.image = image;
        if (!data.description) {
            data.description = 'Không có mô tả';
        }

        setLoading(true); // Bắt đầu spinner
        try {
            await dispatch(addProduct(data));
            setOpenSuccess(true);
            reset();
            setTimeout(() => {
                navigate('/product');
            }, 2000); // Điều hướng sau 2 giây để người dùng có thể xem thông báo
        } catch (error) {
            setOpenError(true); // Hiển thị thông báo lỗi
            console.error('Error adding product:', error);
        } finally {
            setLoading(false); // Dừng spinner
        }
    };

    if (loading) {
        return (
            <div className="container">
                <CustomSpinner />
            </div>
        );
    }

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
                                            <div className="input-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="product_code" 
                                                    value={randomCode}
                                                    readOnly
                                                    {...register('product_code', { 
                                                        required: 'Vui lòng điền mã hiệu!',
                                                        validate: value => {
                                                            const exists = productState.product.some(p => p.product_code === value);
                                                            return !exists || 'Mã hiệu sản phẩm đã tồn tại!';
                                                        }
                                                    })}
                                                />
                                                <button 
                                                    className="btn btn-outline-secondary" 
                                                    type="button"
                                                    onClick={regenerateCode}
                                                >
                                                    <i className="fas fa-sync-alt"></i>
                                                </button>
                                            </div>
                                            {errors.product_code && <div className="text-danger">{errors.product_code.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="price">Giá niêm yết</label>
                                            <input type="number" className="form-control" id="price" placeholder="Nhập giá niêm yết" {...register('price', { required: 'Vui lòng điền giá niêm yết!', validate: value => value >= 0 || 'Giá niêm yết không được là số âm!' })}/>
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
                                            {...register('sale_price', { required: 'Vui lòng điền giá khuyến mãi!' , validate: value => {const price = Number(watch('price')) ; const sale_price = Number(value) ; if (sale_price < 0) {return 'Giá khuyến mãi không được là số âm!'} if (sale_price >= price) {return 'Giá khuyến mãi không hợp lệ!'}}})}/>
                                            {errors.sale_price && <div className="text-danger">{errors.sale_price.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select className="form-select" id="status" defaultValue="1" {...register('status')}>
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
                                    <button className="btn btn-success">Thêm</button>
                                    <button className="btn btn-danger" onClick={() => navigate('/product')}>Hủy</button>
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