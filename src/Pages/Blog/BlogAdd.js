import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import ImageUploadComponent from "../../Components/ImageUpload/ImageUpload";
import { addBlog } from "../../Actions/BlogActions";
import { SuccessAlert } from "../../Components/Alert/Alert";

export default function BlogAdd() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const [poster, setPoster] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/category_blogs'); // Adjust the endpoint as needed
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setPoster(fileNames[0]);
        }
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {
        data.poster = poster;
        dispatch(addBlog(data));
        setOpenSuccess(true);
        reset();
        setTimeout(() => {
            navigate('/blogs');
        }, 2000); // Điều hướng sau 2 giây để người dùng có thể xem thông báo
    };

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
                                            <label htmlFor="poster">Ảnh poster</label><br />
                                            <ImageUploadComponent id="poster" onImageUpload={handleImageUpload} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="btn-group mt-3" role="group">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => navigate('/blogs')}>Cancel</button>
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
