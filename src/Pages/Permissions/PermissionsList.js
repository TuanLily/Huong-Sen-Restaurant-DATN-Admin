import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRolePermisson, updateRole } from '../../Actions/RoleActions';
import { DangerAlert, SuccessAlert } from '../../Components/Alert/Alert';
import { useForm } from 'react-hook-form';

const permissionsData = [
    {
        title: 'Quản lý sản phẩm',
        options: [
            { id: 'productCreate', label: 'Tạo mới' },
            { id: 'productEdit', label: 'Chỉnh sửa' },
            { id: 'productDelete', label: 'Xóa' },
            { id: 'productView', label: 'Xem' },
            { id: 'productRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý danh mục',
        options: [
            { id: 'categoryCreate', label: 'Tạo mới' },
            { id: 'categoryEdit', label: 'Chỉnh sửa' },
            { id: 'categoryDelete', label: 'Xóa' },
            { id: 'categoryView', label: 'Xem' },
            { id: 'categoryRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý bài viết',
        options: [
            { id: 'articleCreate', label: 'Tạo mới' },
            { id: 'articleEdit', label: 'Chỉnh sửa' },
            { id: 'articleDelete', label: 'Xóa' },
            { id: 'articleView', label: 'Xem' },
            { id: 'articleRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý vai trò',
        options: [
            { id: 'roleCreate', label: 'Tạo mới' },
            { id: 'roleEdit', label: 'Chỉnh sửa' },
            { id: 'roleDelete', label: 'Xóa' },
            { id: 'roleView', label: 'Xem' },
            { id: 'roleRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý người dùng',
        options: [
            { id: 'userCreate', label: 'Tạo mới' },
            { id: 'userEdit', label: 'Chỉnh sửa' },
            { id: 'userDelete', label: 'Xóa' },
            { id: 'userView', label: 'Xem' },
            { id: 'userRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý khuyến mãi',
        options: [
            { id: 'promotionCreate', label: 'Tạo mới' },
            { id: 'promotionEdit', label: 'Chỉnh sửa' },
            { id: 'promotionDelete', label: 'Xóa' },
            { id: 'promotionView', label: 'Xem' },
            { id: 'promotionRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý nhóm khách hàng',
        options: [
            { id: 'ctgCreate', label: 'Tạo mới' },
            { id: 'ctgEdit', label: 'Chỉnh sửa' },
            { id: 'ctgDelete', label: 'Xóa' },
            { id: 'ctgView', label: 'Xem' },
            { id: 'ctgRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý thứ hạng',
        options: [
            { id: 'rankCreate', label: 'Tạo mới' },
            { id: 'rankEdit', label: 'Chỉnh sửa' },
            { id: 'rankDelete', label: 'Xóa' },
            { id: 'rankView', label: 'Xem' },
            { id: 'rankRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý đơn hàng',
        options: [
            { id: 'orderCreate', label: 'Tạo mới' },
            { id: 'orderEdit', label: 'Chỉnh sửa' },
            { id: 'orderDelete', label: 'Xóa' },
            { id: 'orderView', label: 'Xem' },
            { id: 'orderRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý chi tiết đơn hàng',
        options: [
            { id: 'orderdetailsCreate', label: 'Tạo mới' },
            { id: 'orderdetailsEdit', label: 'Chỉnh sửa' },
            { id: 'orderdetailsDelete', label: 'Xóa' },
            { id: 'orderdetailsView', label: 'Xem' },
            { id: 'orderdetailsRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý thanh toán',
        options: [
            { id: 'payCreate', label: 'Tạo mới' },
            { id: 'payEdit', label: 'Chỉnh sửa' },
            { id: 'payDelete', label: 'Xóa' },
            { id: 'payView', label: 'Xem' },
            { id: 'payRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý bình luận sản phẩm',
        options: [
            { id: 'productcommentsDelete', label: 'Xóa' },
            { id: 'productcommentsView', label: 'Xem' },
        ]
    },
    {
        title: 'Quản lý bình luận blog',
        options: [
            { id: 'blogcommentsDelete', label: 'Xóa' },
            { id: 'blogcommentsView', label: 'Xem' },
        ]
    },
    {
        title: 'Quản lý bàn ăn',
        options: [
            { id: 'tableCreate', label: 'Tạo mới' },
            { id: 'tableEdit', label: 'Chỉnh sửa' },
            { id: 'tableDelete', label: 'Xóa' },
            { id: 'tableView', label: 'Xem' },
            { id: 'tableRestore', label: 'Khôi phục' }
        ]
    },
    {
        title: 'Quản lý đặt bàn',
        options: [
            { id: 'ReservationsCreate', label: 'Tạo mới' },
            { id: 'ReservationsEdit', label: 'Chỉnh sửa' },
            { id: 'ReservationsDelete', label: 'Xóa' },
            { id: 'ReservationsView', label: 'Xem' },
            { id: 'ReservationsRestore', label: 'Khôi phục' }
        ]
    },
];
export default function RolesEdit() {
    const { handleSubmit } = useForm();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const roleState = useSelector((state) => state.role);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedRoleName, setSelectedRoleName] = useState(''); // New state for role name

    const [searchTerm, setSearchTerm] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        dispatch(fetchRolePermisson()); // Fetch all roles for selection
    }, [dispatch]);

    useEffect(() => {
        if (selectedRole) {
            dispatch(fetchRolePermisson(selectedRole)); // Fetch the selected role details
        }
    }, [selectedRole, dispatch]);

    useEffect(() => {
        const role = roleState.role.find((r) => r.id === parseInt(id));
        if (role) {
            setSelectedRole(role.id);
            setSelectedRoleName(role.name); // Set role name
            setSelectedPermissions(role.permissions || '');
        }
    }, [roleState.role, id]);

    const handleCheckboxChange = (id) => {
        setSelectedPermissions((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((permission) => permission !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = (group) => {
        const allSelected = group.options.every((option) =>
            selectedPermissions.includes(option.id)
        );

        const updatedPermissions = allSelected
            ? selectedPermissions.filter(
                (permission) =>
                    !group.options.some((option) => option.id === permission)
            )
            : [
                ...selectedPermissions,
                ...group.options
                    .filter((option) => !selectedPermissions.includes(option.id))
                    .map((option) => option.id)
            ];

        setSelectedPermissions(updatedPermissions);
    };

    const onSubmit = async () => {
        const updatedData = {
            name: selectedRoleName, // Include role name
            permissions: selectedPermissions.join(','), // Include selected permissions
        };
        console.log(updatedData);

        try {
            await dispatch(updateRole(selectedRole, updatedData));
            setOpenSuccess(true);
            setTimeout(() => {
                navigate('/role');
            }, 2000);
        } catch (error) {
            setErrorMessage(error.response?.data?.error || error.message);
            setOpenError(true);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPermissionsData = permissionsData.map(group => ({
        ...group,
        options: group.options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }));

    return (
        <div className="container">
            <div className="page-inner">
                <div className="row">
                    <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Cập nhật vai trò</div>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-primary mt-3 float-end">Áp dụng</button>
                                <div className="mb-3 col-md-4">
                                    <select
                                        className="form-select"
                                        onChange={(e) => {
                                            const selectedId = parseInt(e.target.value);
                                            const selectedRole = roleState.role.find(role => role.id === selectedId);
                                            setSelectedRole(selectedId);
                                            setSelectedRoleName(selectedRole ? selectedRole.name : ''); // Update role name
                                        }}
                                        value={selectedRole || ''}
                                    >
                                        <option value="">Chọn vai trò ...</option>
                                        {roleState.role.map(role => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm chức năng ở đây..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <h2 className="text-center my-4">Quản lý phân quyền</h2>
                                <div className="row row-cols-1 row-cols-md-5">
                                    {filteredPermissionsData.map((group, index) => (
                                        <div key={index} className="col mb-4">
                                            <h4 className="fw-bold fs-6">{group.title}</h4>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`selectAll-${index}`}
                                                    onChange={() => handleSelectAll(group)}
                                                    checked={group.options.every((option) =>
                                                        selectedPermissions.includes(option.id)
                                                    )}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`selectAll-${index}`}
                                                >
                                                    Chọn tất cả
                                                </label>
                                            </div>
                                            {group.options.map((option) => (
                                                <div key={option.id} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={option.id}
                                                        id={option.id}
                                                        checked={selectedPermissions.includes(option.id)}
                                                        onChange={() => handleCheckboxChange(option.id)}
                                                    />
                                                    <label className="form-check-label" htmlFor={option.id}>
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                    <SuccessAlert open={openSuccess} onClose={() => setOpenSuccess(false)} message="Cập nhật vai trò thành công!" vertical="top" horizontal="right" />
                    <DangerAlert
                        open={openError}
                        onClose={() => setOpenError(false)}
                        message={errorMessage}
                        vertical="top"
                        horizontal="right"
                    />
                </div>
            </div>
        </div>
    );
}
