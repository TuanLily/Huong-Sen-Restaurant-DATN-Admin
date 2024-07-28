import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomer, updateCustomer } from '../../Actions/CustomerActions';
import ImageUploadComponent from '../../Components/ImageUpload/ImageUpload';
import { SuccessAlert } from '../../Components/Alert/Alert';
import { useForm } from 'react-hook-form';

export default function CustomerEdit() {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const customerState = useSelector((state) => state.customer);
    
    const [initialAvatar, setInitialAvatar] = useState(null);
    const [avatar, setAvatar] = useState('');
    const [initialPassword, setInitialPassword] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchCustomer());
    }, [dispatch]);

    useEffect(() => {
        const customer = customerState.customer.find((cust) => cust.id === parseInt(id));
        if (customer) {
            setValue('fullname', customer.fullname);
            setValue('email', customer.email);
            setValue('address', customer.address);
            setValue('tel', customer.tel);
            setValue('password', ''); // Đặt giá trị mật khẩu mặc định rỗng
            setInitialAvatar(customer.avatar);
            setAvatar(customer.avatar); // Đặt avatar để hiển thị
            setInitialPassword(customer.password);
        }
    }, [customerState.customer, id, setValue]);

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const onSubmit = (data) => {
        // Nếu không có mật khẩu mới, giữ lại mật khẩu ban đầu
        const updatedData = {
            ...data,
            password: data.password || initialPassword, // Cập nhật mật khẩu nếu có
            avatar: avatar || initialAvatar // Cập nhật avatar nếu có ảnh mới
        };

        // Gửi dữ liệu cập nhật
        dispatch(updateCustomer(id, updatedData));

        // Hiển thị thông báo thành công và điều hướng
        setOpenSuccess(true);
        setTimeout(() => {
            navigate('/customer');
        }, 2000); // Điều hướng sau 2 giây để người dùng có thể xem thông báo
    };

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setAvatar(fileNames[0]); // Cập nhật avatar với file mới
            setValue('avatar', fileNames[0]); // Cập nhật giá trị của avatar trong form
        }
    };

    if (customerState.error) {
        return <p>Error: {customerState.error}</p>;
    }

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Cập nhật khách hàng</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="fullname">Tên</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fullname"
                                                {...register('fullname', { required: 'Tên là bắt buộc' })}
                                                placeholder="Nhập tên"
                                            />
                                            {errors.fullname && <p>{errors.fullname.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                {...register('email', { required: 'Email là bắt buộc' })}
                                                placeholder="Nhập email"
                                            />
                                            {errors.email && <p>{errors.email.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Mật khẩu</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                {...register('password')}
                                                placeholder="Nhập mật khẩu"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                                                placeholder="Nhập địa chỉ"
                                            />
                                            {errors.address && <p>{errors.address.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Số điện thoại</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tel"
                                                {...register('tel', { required: 'Số điện thoại là bắt buộc' })}
                                                placeholder="Nhập số điện thoại"
                                            />
                                            {errors.tel && <p>{errors.tel.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="avatar">Ảnh đại diện</label><br />
                                            <ImageUploadComponent id="avatar" onImageUpload={handleImageUpload} />
                                            {initialAvatar && (
                                                <div>
                                                    <img src={initialAvatar} alt="Avatar" style={{ maxWidth: '100px', marginTop: '10px' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="btn-group mt-3" role="group">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => navigate('/customer')}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Cập nhật thông tin khách hàng thành công!" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    );
}