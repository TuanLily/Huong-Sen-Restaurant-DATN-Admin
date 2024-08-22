import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploadComponent from "../../Components/ImageUpload/ImageUpload";

export default function Acount() {

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm();

    const [activeTab, setActiveTab] = useState('updateInfo');

    const [profile, setProfile] = useState({
        fullname: '',
        email: '',
        avatar: '',
        tel: '',
        address: ''
    });

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setProfile(prev => ({ ...prev, avatar: fileNames[0] }));
        }
    };

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const handleChangePassword = async (data) => { };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-round">
                            <div className="card-header">
                                <div className="card-head-row card-tools-still-right">
                                    <div className="card-title">Thông tin của bạn</div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="container-xxl py-5">
                                    <div className="container">
                                        <div className="row g-4">
                                            <div className="col-md-4">
                                                <div className="bg-white p-0 rounded text-center">
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/huong-sen-restaurant.appspot.com/o/images%2Fhuong-sen-logo.png?alt=media&token=f117d5c3-ebc4-4449-a0c7-eaa903b2087a' alt="Avatar" className="img-fluid rounded-circle mb-3" width={110} />
                                                    <br />
                                                    <div className='d-flex justify-content-around'>
                                                        <div className='col-5'>
                                                            <h5 className="section-title ff-secondary fw-normal text-primary">Họ và Tên</h5>
                                                            <p>Nguyễn Quốc Trạng </p>
                                                            <h5 className="section-title ff-secondary fw-normal text-primary">Email</h5>
                                                            <p>dtd984925@gmail</p>
                                                            <h5 className="section-title ff-secondary fw-normal text-primary">Số Điện Thoại</h5>
                                                            <p>0293933022</p>
                                                        </div>
                                                        <div>
                                                            <div className="border-start h-100" style={{ height: '100%', margin: '0 8px' }}></div>
                                                        </div>
                                                        <div className='col-5'>
                                                            <h5 className="section-title ff-secondary fw-normal text-primary">Tên đăng nhập</h5>
                                                            <p>Nguyễn Quốc Trạng </p>
                                                            <h5 className="section-title ff-secondary fw-normal text-primary">Địa chỉ</h5>
                                                            <p>Phong thạnh A </p>
                                                            <h5 className="section-title ff-secondary fw-normal text-primary">Trạng thái làm</h5>
                                                            <p>Đang làm việc</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <ul className="nav nav-tabs mb-3">
                                                    <li className="nav-item">
                                                        <button className={`nav-link ${activeTab == 'updateInfo' ? 'active text-primary' : 'text-dark'}`} onClick={() => setActiveTab('updateInfo')}>
                                                            CẬP NHẬT THÔNG TIN
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button className={`nav-link ${activeTab == 'changePassword' ? 'active text-primary' : 'text-dark'}`} onClick={() => setActiveTab('changePassword')}>
                                                            THAY ĐỔI MẬT KHẨU
                                                        </button>
                                                    </li>
                                                </ul>
                                                <div className="tab-content bg-white rounded-bottom">
                                                    {activeTab === 'updateInfo' && (
                                                        <form>
                                                            <div className="row g-3">

                                                                <div className="col-md-6">
                                                                    <div className="form-floating">
                                                                        <input type="text" className="form-control" id="fullname" placeholder="Họ và Tên"/>
                                                                        <label htmlFor="fullname">Họ và Tên</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-floating">
                                                                        <input type="tel" className="form-control" id="username" placeholder="Tên đăng nhập" />
                                                                        <label htmlFor="tel">Tên đăng nhập</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-floating">
                                                                        <input type="email" className="form-control" id="email" placeholder="Email" defaultValue={profile.email} />
                                                                        <label htmlFor="email">Email</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-floating">
                                                                        <input type="tel" className="form-control" id="tel" placeholder="Số Điện Thoại" />
                                                                        <label htmlFor="tel">Số Điện Thoại</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-floating">
                                                                        <label htmlFor="avatar">Avatar</label>
                                                                        <ImageUploadComponent id="avatar" onImageUpload={handleImageUpload}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-floating">
                                                                        <input type="text" className="form-control" id="address" placeholder="Địa Chỉ" />
                                                                        <label htmlFor="address">Địa Chỉ</label>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="btn-group" role="group">
                                                                        <button className="btn btn-success">Cập nhật</button>
                                                                        <button className="btn btn-danger">Đặt lại</button>
                                                                    </div>   
                                                                </div>
                                                            </div>
                                                        </form>
                                                    )}
                                                    {activeTab === 'changePassword' && (
                                                        <form onSubmit={handleSubmit(handleChangePassword)}>
                                                            <div className="row g-3">
                                                                <div className="col-12 position-relative">
                                                                    <div className="form-floating">
                                                                        <input type={showPassword.currentPassword ? "text" : "password"} className="form-control" id="currentPassword" placeholder="Mật Khẩu Cũ" />
                                                                        <label htmlFor="currentPassword">Mật Khẩu Cũ</label>
                                                                        <i
                                                                            className={`fa ${showPassword.currentPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y pe-3`}
                                                                            onClick={() => togglePasswordVisibility('currentPassword')}
                                                                            style={{ cursor: 'pointer' }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 position-relative">
                                                                    <div className="form-floating">
                                                                        <input type={showPassword.newPassword ? "text" : "password"} className="form-control" id="newPassword" placeholder="Mật Khẩu Mới" />
                                                                        <label htmlFor="newPassword">Mật Khẩu Mới</label>
                                                                        <i
                                                                            className={`fa ${showPassword.newPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y pe-3`}
                                                                            onClick={() => togglePasswordVisibility('newPassword')}
                                                                            style={{ cursor: 'pointer' }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 position-relative">
                                                                    <div className="form-floating">
                                                                        <input type={showPassword.confirmNewPassword ? "text" : "password"} className="form-control" id="confirmNewPassword" placeholder="Nhập Lại Mật Khẩu Mới" />
                                                                        <label htmlFor="confirmNewPassword">Nhập Lại Mật Khẩu Mới</label>
                                                                        <i
                                                                            className={`fa ${showPassword.confirmNewPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y pe-3`}
                                                                            onClick={() => togglePasswordVisibility('confirmNewPassword')}
                                                                            style={{ cursor: 'pointer' }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="btn-group" role="group">
                                                                        <button className="btn btn-success">Cập nhật</button>
                                                                        <button className="btn btn-danger">Đặt lại</button>
                                                                    </div>   
                                                                </div>
                                                            </div>
                                                        </form>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}