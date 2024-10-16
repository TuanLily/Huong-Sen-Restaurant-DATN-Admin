import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlog, updateBlog } from '../../Actions/BlogActions';
import ImageUploadComponent from '../../Components/ImageUpload/ImageUpload';
import { SuccessAlert } from '../../Components/Alert/Alert';
import { useForm } from 'react-hook-form';

export default function BlogEdit() {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const blogState = useSelector((state) => state.blog);

    const [initialPoster, setInitialPoster] = useState(null);
    const [poster, setPoster] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchBlog());
    }, [dispatch]);

    useEffect(() => {
        const blog = blogState.blog.find((b) => b.id === parseInt(id));
        if (blog) {
            setValue('title', blog.title);
            setValue('author', blog.author);
            setValue('content', blog.content);
            setInitialPoster(blog.poster);
            setPoster(blog.poster);
        }
    }, [blogState.blog, id, setValue]);

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {
        const updatedData = {
            ...data,
            poster: poster || initialPoster,
        };

        dispatch(updateBlog(id, updatedData));

        setOpenSuccess(true);
        setTimeout(() => {
            navigate('/blogs');
        }, 2000);
    };

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setPoster(fileNames[0]);
            setValue('poster', fileNames[0]);
        }
    };

    if (blogState.error) {
        return <p>Error: {blogState.error}</p>;
    }

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Chỉnh sửa bài viết</div>
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
                                            {initialPoster && (
                                                <div>
                                                    <img src={initialPoster} alt="Poster" style={{ maxWidth: '100px', marginTop: '10px' }} />
                                                </div>
                                            )}
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
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Cập nhật bài viết thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    );
}
