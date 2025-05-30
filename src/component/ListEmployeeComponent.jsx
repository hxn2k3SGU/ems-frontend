import { useEffect, useState } from 'react';
import './ListEmployeeComponent.css';
// import { listEmployees } from '../serivice/EmployService';
import { listEmployees,deleteEmployeeById } from '../serivice/EmployService';

import { useNavigate } from 'react-router-dom';
const ListEmployeeComponent = () => {
    // sử dụng useState để tạo mảng rổng xíu đổ data vào
    const [employees, setEmployees] = useState([]);

    const navToAddEmployee = useNavigate();
    const navigate = useNavigate();
    // Thằng useEffect chỉ chạy 1 lần cho thằng dependenci của nó là mảng rỗng
    useEffect(() => {
        listEmployees().then(response => {
            console.log('Employee data:', response.data);
            setEmployees(response.data); // lấy dữ liệu để hiển thị
        }).catch(error => {
            console.error(error); // xử lý lỗi
        });
    }, []);

    function addNewEmployee() {
        navToAddEmployee('/add-employee')
    }
    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function deleteEmployee(id) {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
            // Gọi API xóa
            deleteEmployeeById(id).then(() => {
                // Cập nhật lại danh sách
                setEmployees(prev => prev.filter(emp => emp.id !== id));
            }).catch(err => {
                console.error("Lỗi khi xóa:", err);
            });
        }
    }
    return (
        <div className='container'>
            <h2 style={{
                marginTop: "10px"
            }} className='text-center'>Danh sách nhân viên</h2>
            <button className='btn btn-outline-primary' style={
                {
                    backgroundColor: "#00ffff",
                    marginBottom: "20px"
                }
            } onClick={addNewEmployee} >Thêm nhân viên</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Action</th> {/* ✅ Thêm cột Action */}
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    {/* ✅ Nút Sửa và Xóa */}
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => updateEmployee(employee.id)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => deleteEmployee(employee.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ListEmployeeComponent

