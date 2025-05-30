import React, { useState } from 'react';
import { createEmployee } from '../serivice/EmployService';
import { useNavigate } from 'react-router-dom';

const EmployeeComponent = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [modal, setModal] = useState({
        show: false,
        title: '',
        message: '',
        success: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEmployee(employee);
            // Thành công
            setModal({
                show: true,
                title: 'Thành công',
                message: '✅ Nhân viên đã được thêm thành công!',
                success: true
            });
            setEmployee({ firstName: '', lastName: '', email: '' });
        } catch (error) {
            console.error('❌ Lỗi khi thêm nhân viên:', error);

            // Thất bại
            let errorMsg = '❌ Thêm nhân viên thất bại. Vui lòng kiểm tra lại.';
            if (error.response && error.response.status === 409) {
                errorMsg = '❌ Email đã tồn tại trong hệ thống.';
            }

            setModal({
                show: true,
                title: 'Lỗi',
                message: errorMsg,
                success: false
            });
        }
    };

    const handleCloseModal = () => {
        setModal({ ...modal, show: false });
        if (modal.success) {
            navigate('/employees'); // Chuyển trang nếu thêm thành công
        }
    };

    return (
        <div className="container mt-4">
            <h2>Thêm nhân viên</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Họ (First Name)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tên (Last Name)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
            </form>

            {/* ✅ Modal thành công hoặc thất bại */}
            {modal.show && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className={`modal-header ${modal.success ? 'bg-success' : 'bg-danger'} text-white`}>
                                <h5 className="modal-title">{modal.title}</h5>
                            </div>
                            <div className="modal-body">
                                <p>{modal.message}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleCloseModal}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeComponent;
