import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct, updateProduct } from '../../Actions/ProductActions';
import { fetchProductCategory } from "../../Actions/ProductCategoryActions";
import ImageUploadComponent from '../../Components/ImageUpload/ImageUpload';
import { SuccessAlert } from '../../Components/Alert/Alert';
import { useForm } from 'react-hook-form';

export default function ProductEdit () {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productState = useSelector((state) => state.product);
    const productCategoryState = useSelector(state => state.product_category);

    const [initialImage, setInitialImage] = useState(null);
    const [image, setImage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(fetchProductCategory());
    }, [dispatch]);

    useEffect(() => {
        const product = productState.product.find((cust) => cust.id === parseInt(id));
        if (product) {
            setValue('name', product.name);
            setValue('product_code', product.product_code);
            setValue('price', product.price);
            setValue('sale_price', product.sale_price);
            setValue('description', product.description);
            setValue('categories_id', product.categories_id);
            setValue('status', product.status);
            setInitialImage(product.image);
            setImage(product.image);
        }
    }, [productState.product, id, setValue]);

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {
        const updatedData = {
            ...data,
            image: image || initialImage // Cập nhật image nếu có ảnh mới
        };

        dispatch(updateProduct(id, updatedData));

        setOpenSuccess(true);
        setTimeout(() => {
            navigate('/product');
        }, 2000);
    };

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setImage(fileNames[0]); // Cập nhật avatar với file mới
            setValue('image', fileNames[0]); // Cập nhật giá trị của avatar trong form
        }
    };

    if (productState.error) {
        return <p>Error: {productState.error}</p>;
    }

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Cập nhật sản phẩm</div>
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
                                            <input type="text" className="form-control" id="product_code" placeholder="Nhập mã hiệu sản phẩm" {...register('product_code', { required: 'Vui lòng điền mã hiệu!' })}/>
                                            {errors.product_code && <div className="text-danger">{errors.product_code.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="price">Giá niêm yết</label>
                                            <input type="number" className="form-control" id="price" placeholder="Nhập giá niêm yết" {...register('price', { required: 'Vui lòng điền giá niêm yết!' })}/>
                                            {errors.price && <div className="text-danger">{errors.price.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Danh mục</label>
                                            <select className="form-select" id="categories_id" {...register('categories_id', { required: 'Vui lòng chọn danh mục!' })}>
                                                {productCategoryState.product_category && productCategoryState.product_category.map((item) => {
                                                    const isSelected = item.id === parseInt(productState.product.find((prod) => prod.id === parseInt(id))?.categories_id);
                                                    return (
                                                        <option key={item.id} value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Mô tả sản phẩm</label>
                                            <textarea className="form-control" id="description" rows="4" {...register('description')}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="saleEmail">Giá khuyến mãi</label>
                                            <input type="number" className="form-control" id="sale_price" placeholder="Nhập giá khuyến mãi" {...register('sale_price', { required: 'Vui lòng điền giá khuyến mãi!' })}/>
                                            {errors.sale_price && <div className="text-danger">{errors.sale_price.message}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select className="form-select" id="status" {...register('status', { required: 'Vui lòng chọn trạng thái!' })}>
                                                <option value='1'>Đang kinh doanh</option>
                                                <option value='0'>Tạm ngưng bán</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlFile1">Ảnh sản phẩm</label><br/>
                                            <ImageUploadComponent id="image" onImageUpload={handleImageUpload} />
                                            {initialImage && (
                                                <div>
                                                    <img src={initialImage} alt="Image" style={{ maxWidth: '100px', marginTop: '10px' }} />
                                                </div>
                                            )}
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
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Cập nhật thông tin sản phẩm thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    )
}