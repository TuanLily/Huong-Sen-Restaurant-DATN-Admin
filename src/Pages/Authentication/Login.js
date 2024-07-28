import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate () ;
    const handleSubmit = (e) => {
        e.preventDefault () ;
        navigate ('/dashboard') ;
    } ;

    return (
        <section className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#EEEEEE' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="login-wrap p-4 p-md-5 border rounded shadow bg-white">
                            <h3 className="mb-4 text-center">Đăng nhập</h3>
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" style={{ height: '100%', display: 'flex', alignItems: 'center', borderTopRightRadius: '0', borderBottomRightRadius: '0' }}>
                                                <i className="fa fa-user"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control rounded-right" placeholder="Username" required style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" style={{ height: '100%', display: 'flex', alignItems: 'center', borderTopRightRadius: '0', borderBottomRightRadius: '0' }}>
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                        <input type="password" className="form-control rounded-right" placeholder="Password" required style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}/>
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary rounded submit">Đăng nhập</button>
                                </div>
                                <div className="form-group mt-1">
                                    <p><Link to="/forgot">Quên mật khẩu?</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
