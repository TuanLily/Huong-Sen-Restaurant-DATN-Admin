import React, { useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    const expiryTime = localStorage.getItem('expiryTime');

    // Chuyển đổi expiryTime sang số
    const expiryTimeNumber = expiryTime ? Number(expiryTime) : null;

    // Kiểm tra xem token có tồn tại và chưa hết hạn
    const isAuthenticated = token && expiryTimeNumber && new Date().getTime() < expiryTimeNumber;

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.removeItem('token');
            localStorage.removeItem('expiryTime');
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;