// import React, { useState } from 'react';
// import { createEmployee } from '../serivice/EmployService';

// const EmployeeComponent = () => {
//     const [message, setMessage] = useState('');
//     const [employee, setEmployee] = useState({
//         firstName: '',
//         lastName: '',
//         email: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmployee({ ...employee, [name]: value });
//     };

//     //   const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     console.log("Nhân viên mới:", employee);


//     //     // TODO: Gửi dữ liệu đến backend hoặc xử lý lưu trữ
//     //   };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await createEmployee(employee);
//             console.log('Đã thêm nhân viên:', response.data);

//             setMessage('✅ Nhân viên đã được thêm thành công!');
//             // Reset form
//             setEmployee({ firstName: '', lastName: '', email: '' });
//         } catch (error) {
//             console.error('❌ Lỗi khi thêm nhân viên:', error);
//             setMessage('❌ Thêm nhân viên thất bại. Vui lòng kiểm tra lại.');
//         }
//     };



//     return (
//         <div className="container mt-4">
//             <h2>Thêm nhân viên</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label">Họ (First Name)</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="firstName"
//                         value={employee.firstName}
//                         onChange={handleChange}
//                         placeholder="Nhập họ"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Tên (Last Name)</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="lastName"
//                         value={employee.lastName}
//                         onChange={handleChange}
//                         placeholder="Nhập tên"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         name="email"
//                         value={employee.email}
//                         onChange={handleChange}
//                         placeholder="Nhập email"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Lưu</button>
//             </form>
//         </div>
//     );
// };

// export default EmployeeComponent;


// import React, { useState } from 'react';
// import { createEmployee } from '../serivice/EmployService';
// import { useNavigate } from 'react-router-dom'; // ✅ Đã thêm

// const EmployeeComponent = () => {
//     const [message, setMessage] = useState('');
//     const [employee, setEmployee] = useState({
//         firstName: '',
//         lastName: '',
//         email: ''
//     });

//     const [showModal, setShowModal] = useState(false); // ✅ Đã thêm
//     const navigate = useNavigate(); // ✅ Đã thêm

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmployee({ ...employee, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await createEmployee(employee);
//             console.log('Đã thêm nhân viên:', response.data);
//             setMessage('✅ Nhân viên đã được thêm thành công!');
//             setShowModal(true); // ✅ Đã thêm
//             setEmployee({ firstName: '', lastName: '', email: '' });
//         } catch (error) {
//             console.error('❌ Lỗi khi thêm nhân viên:', error);
//             setMessage('❌ Thêm nhân viên thất bại. Vui lòng kiểm tra lại.');
//         }
//     };

//     const handleClose = () => {
//         setShowModal(false); // ✅ Đã thêm
//         navigate('/employees'); // ✅ Đã thêm: chuyển về danh sách nhân viên
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Thêm nhân viên</h2>

//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label">Họ (First Name)</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="firstName"
//                         value={employee.firstName}
//                         onChange={handleChange}
//                         placeholder="Nhập họ"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Tên (Last Name)</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="lastName"
//                         value={employee.lastName}
//                         onChange={handleChange}
//                         placeholder="Nhập tên"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         name="email"
//                         value={employee.email}
//                         onChange={handleChange}
//                         placeholder="Nhập email"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Lưu</button>
//             </form>

//             {/* ✅ Đã thêm: Modal xác nhận */}
//             {showModal && (
//                 <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Thành công</h5>
//                             </div>
//                             <div className="modal-body">
//                                 <p>{message}</p>
//                             </div>
//                             <div className="modal-footer">
//                                 <button className="btn btn-success" onClick={handleClose}>Đóng</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EmployeeComponent;


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
