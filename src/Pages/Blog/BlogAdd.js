import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import ImageUploadComponent from "../../Components/ImageUpload/ImageUpload";
import { fetchCategoryBlog } from "../../Actions/BlogsCategoriesActions";
import { addBlog } from "../../Actions/BlogActions";
import { SuccessAlert } from "../../Components/Alert/Alert";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";

export default function BlogAdd() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const blogCategoryState = useSelector(state => state.categories)
    
    useEffect(() => {
        dispatch(fetchCategoryBlog());
    }, [dispatch]);
    
    const navigate = useNavigate();

    const [poster, setPoster] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setPoster(fileNames[0]);
        }
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = async (data) => {
        setLoading(true); 
        data.poster = poster;
        try {
            await dispatch(addBlog(data));
            setOpenSuccess(true);
            setTimeout(() => {
                navigate('/blogs');
            }, 2000); 
        } catch (error) {
            setOpenError(true); 
            console.error('Error adding blog:', error);
        } finally {
            setLoading(false); 
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
                                <div className="card-title">Thêm bài viết</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="title">Tiêu đề bài viết</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                placeholder="Nhập tiêu đề"
                                                {...register('title', { required: 'Tiêu đề là bắt buộc' })}
                                            />
                                            {errors.title && <p className="text-danger">{errors.title.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="author">Tác giả</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="author"
                                                placeholder="Nhập tác giả"
                                                {...register('author', { required: 'Tác giả là bắt buộc' })}
                                            />
                                            {errors.author && <p className="text-danger">{errors.author.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="content">Nội dung</label>
                                            <textarea
                                                className="form-control"
                                                id="content"
                                                rows="4"
                                                {...register('content', { required: 'Nội dung là bắt buộc' })}
                                            ></textarea>
                                            {errors.content && <p className="text-danger">{errors.content.message}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group">
                                            <label>Danh mục</label>
                                            <select className="form-select" id="blog_category_id" {...register('blog_category_id', { required: 'Vui lòng chọn danh mục!' })}>
                                                {blogCategoryState.categories && blogCategoryState.categories.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                            {errors.category_id && <p className="text-danger">{errors.category_id.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="poster">Ảnh poster</label><br />
                                            <ImageUploadComponent id="poster" onImageUpload={handleImageUpload} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="btn-group mt-3" role="group">
                                <button type="submit" className="btn btn-success" disabled={loading}>Thêm mới</button>
                                <button type="button" className="btn btn-danger" onClick={() => navigate('/customer')}>Hủy</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Thêm bài viết thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    );
}
