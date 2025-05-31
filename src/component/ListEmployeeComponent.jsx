import { useEffect, useState } from 'react';
import './ListEmployeeComponent.css';
// import { listEmployees } from '../serivice/EmployService';
import { getEmployeeById, listEmployees, deleteEmployeeById } from '../serivice/EmployService';

import { useNavigate } from 'react-router-dom';
const ListEmployeeComponent = () => {
    // sử dụng useState để tạo mảng rổng xíu đổ data vào
    const [employees, setEmployees] = useState([]);
    const [searchId, setSearchId] = useState('');
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
    const handleSearchById = () => {
        if (!searchId) return;

        getEmployeeById(searchId)
            .then(res => {
                setEmployees([res.data]); // Hiển thị đúng 1 nhân viên
            })
            .catch(() => {
                alert("Không tìm thấy nhân viên!");
                setEmployees([]); // Xoá danh sách hiện tại
            });
    };
    const handleShowAll = () => {
        listEmployees()
            .then((res) => {
                setEmployees(res.data);     // cập nhật danh sách
                setSearchId('');            // reset ô tìm kiếm nếu có
            })
            .catch(() => {
                console.error("Lỗi khi tải danh sách nhân viên:");
            });
    };

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
            <div className="d-flex align-items-center mb-3 gap-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Nhập ID nhân viên cần tìm"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{ maxWidth: "250px" }}
                />

                <button
                    className="btn btn-outline-success"
                    onClick={handleSearchById}
                >
                    Tìm kiếm
                </button>

                <button
                    className="btn btn-outline-secondary"
                    onClick={handleShowAll}
                >
                    Xem tất cả
                </button>
            </div>


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

