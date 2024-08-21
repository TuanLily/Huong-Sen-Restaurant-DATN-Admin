import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { addCustomer, checkEmailExists } from "../../Actions/CustomerActions";
import ImageUploadComponent from "../../Components/ImageUpload/ImageUpload";
import { DangerAlert, SuccessAlert } from "../../Components/Alert/Alert";
import CustomSpinner from "../../Components/Spinner/CustomSpinner";

export default function UserAdd() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setError, watch } = useForm();

    const navigate = useNavigate();

    const [avatar, setAvatar] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState('Khách Hàng'); // Default to 'Khách Hàng'
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');

    const password = watch('password');

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setAvatar(fileNames[0]);
        }
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const handleErrorClose = () => {
        setOpenError(false);
    };

    // Hàm kiểm tra email có tồn tại trên hệ thống chưa.
    const validateEmailExists = async (email) => {
        try {
            const user = await checkEmailExists(email);
            if (user) {
                setError('email', {
                    type: 'manual',
                    message: 'Email đã tồn tại trên hệ thống',
                });
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };



    const handleUserTypeChange = (event) => {
        const selectedUserType = event.target.value;
        console.log("Selected User Type:", selectedUserType); // Debug log
        setUserType(selectedUserType);
        setRole(''); // Reset role
        setStatus(''); // Reset status
    };


    const onSubmit = async (data) => {
        console.log(data)
        // const emailIsValid = await validateEmailExists(data.email);
        // if (!emailIsValid) return;

        // setLoading(true);
        // data.avatar = avatar;
        // try {
        //     await dispatch(addCustomer(data));
        //     setOpenSuccess(true);
        //     setTimeout(() => {
        //         navigate('/customer');
        //     }, 2000);
        // } catch (error) {
        //     setOpenError(true); // Hiển thị thông báo lỗi
        //     console.error('Error adding customer:', error);
        // } finally {
        //     setLoading(false);
        // }
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
                                <div className="card-title">Thêm người dùng</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fullname">Tên đầy đủ</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fullname"
                                                placeholder="Nhập tên đầy đủ"
                                                {...register('fullname', { required: 'Tên là bắt buộc' })}
                                            />
                                            {errors.fullname && <p className="text-danger">{errors.fullname.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Tên đăng nhập</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                placeholder="Nhập tên đăng nhập"
                                                {...register('username', { required: 'Tên đăng nhập là bắt buộc' })}
                                            />
                                            {errors.username && <p className="text-danger">{errors.username.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Nhập email"
                                                {...register('email', {
                                                    required: 'Email là bắt buộc',
                                                    pattern: {
                                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                        message: 'Email không hợp lệ',
                                                    },
                                                })}
                                            />
                                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Số điện thoại</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tel"
                                                placeholder="Nhập số điện thoại"
                                                {...register('tel', {
                                                    required: 'Số điện thoại là bắt buộc',
                                                    pattern: {
                                                        value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                                        message: 'Số điện thoại không đúng định dạng',
                                                    },
                                                })}
                                            />
                                            {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userType">Loại người dùng</label>
                                            <select
                                                className="form-control"
                                                id="user_type"
                                                value={userType}
                                                onChange={handleUserTypeChange}
                                                {...register('user_type')}
                                            >
                                                <option value="Khách Hàng">Khách hàng</option>
                                                <option value="Nhân Viên">Nhân viên</option>
                                            </select>

                                        </div>

                                        {userType === 'Nhân Viên' && (
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="role_id">Vai trò</label>
                                                    <select
                                                        className="form-control"
                                                        id="role_id"
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                        {...register('role_id')}
                                                    >
                                                        <option value="1" selected>Nhân viên</option>
                                                        <option value="2">Quản trị viên</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="status">Trạng thái</label>
                                                    <select
                                                        className="form-control"
                                                        id="status"
                                                        value={status}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        {...register('status')}

                                                    >
                                                        <option value="active" selected>Đang đi làm</option>
                                                        <option value="inactive">Đã nghỉ làm</option>
                                                    </select>
                                                </div>
                                            </>
                                        )}
                                        {userType === 'Khách Hàng' && (
                                            <div className="form-group">
                                                <label htmlFor="status">Trạng thái</label>
                                                <select
                                                    className="form-control"
                                                    id="status"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    {...register('status')}

                                                >
                                                    <option value="active" selected>Hoạt động</option>
                                                    <option value="inactive">Ngưng hoạt động</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                placeholder="Nhập địa chỉ"
                                                {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                                            />
                                            {errors.address && <p className="text-danger">{errors.address.message}</p>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Mật khẩu</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Nhập mật khẩu"
                                                {...register('password', {
                                                    required: 'Mật khẩu là bắt buộc',
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Mật khẩu phải có ít nhất 8 ký tự',
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
                                                        message: 'Mật khẩu phải bao gồm chữ hoa, số và ký tự đặc biệt',
                                                    }
                                                })}
                                            />
                                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Mật khẩu xác nhận</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                placeholder="Nhập mật khẩu xác nhận"
                                                {...register('confirmPassword', {
                                                    required: 'Mật khẩu xác nhận là bắt buộc',
                                                    validate: (value) => value === password || 'Mật khẩu xác nhận không khớp',
                                                })}
                                            />
                                            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="avatar">Ảnh đại diện</label><br />
                                            <ImageUploadComponent id="avatar" onImageUpload={handleImageUpload} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="btn-group mt-3" role="group">
                                    <button type="submit" className="btn btn-success" disabled={loading}>Thêm mới</button>
                                    <button type="button" className="btn btn-danger" onClick={() => navigate('/users')}>Hủy</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={handleSuccessClose} message="Thêm khách hàng thành công!" vertical="top" horizontal="right" />
                    <DangerAlert open={openError} onClose={handleErrorClose} message="Có lỗi khi thêm tài khoản" vertical="top" horizontal="right" />
                </div>
            </div>
        </div>
    );
}