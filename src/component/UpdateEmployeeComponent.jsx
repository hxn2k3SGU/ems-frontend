import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../serivice/EmployService';

const UpdateEmployeeComponent = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();

    useEffect(() => {
        getEmployeeById(id).then(response => {
            setEmployee(response.data);
        }).catch(error => {
            console.error("Lỗi khi load dữ liệu:", error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(id, employee);
            setShowModal(true); // ✅ hiển thị popup thành công
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/employees'); // ✅ chuyển về danh sách sau khi đóng
    };

    return (
        <div className="container mt-4">
            <h2>Cập nhật thông tin nhân viên</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Họ</label>
                    <input type="text" className="form-control" name="firstName" value={employee.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tên</label>
                    <input type="text" className="form-control" name="lastName" value={employee.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success">Lưu</button>
            </form>
            {/* ✅ Modal thông báo sửa thành công */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">Thành công</h5>
                            </div>
                            <div className="modal-body">
                                <p>✅ Cập nhật thông tin nhân viên thành công!</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={handleCloseModal}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateEmployeeComponent;
