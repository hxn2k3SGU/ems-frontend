import { useEffect, useState } from 'react';
import './ListEmployeeComponent.css';
import { getEmployeeById, listEmployees, deleteEmployeeById } from '../serivice/EmployService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [searchId, setSearchId] = useState('');
    const navToAddEmployee = useNavigate();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1); // ✅ Thêm: Phân trang
    const itemsPerPage = 3;

    const [sortOrder, setSortOrder] = useState('asc'); // ✅ Thêm: Sắp xếp tăng/giảm
    const [isSorted, setIsSorted] = useState(false);   // ✅ Thêm: Cờ bật/tắt sắp xếp

    useEffect(() => {
        listEmployees().then(response => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    function addNewEmployee() {
        navToAddEmployee('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function deleteEmployee(id) {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
            deleteEmployeeById(id).then(() => {
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
                setEmployees([res.data]);
                setCurrentPage(1);
                setIsSorted(false); // ✅ Tắt sắp xếp khi tìm
            })
            .catch(() => {
                alert("Không tìm thấy nhân viên!");
                setEmployees([]);
            });
    };

    const handleShowAll = () => {
        listEmployees()
            .then((res) => {
                setEmployees(res.data);
                setSearchId('');
                setCurrentPage(1);
                setIsSorted(false); // ✅ Tắt sắp xếp khi bấm "Xem tất cả"
            })
            .catch(() => {
                console.error("Lỗi khi tải danh sách nhân viên:");
            });
    };

    const toggleSortOrder = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        setIsSorted(true); // ✅ Bật sắp xếp khi click
    };

    // ✅ Sắp xếp nếu isSorted === true
    const displayedEmployees = isSorted
        ? [...employees].sort((a, b) => {
            const nameA = a.firstName.toLowerCase();
            const nameB = b.firstName.toLowerCase();
            return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        })
        : employees;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = displayedEmployees.slice(indexOfFirstItem, indexOfLastItem); // ✅ Sửa: dùng danh sách đã xử lý

    const totalPages = Math.ceil(employees.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center' style={{ marginTop: "10px" }}>Danh sách nhân viên</h2>

            <button className='btn btn-outline-primary' style={{ backgroundColor: "#00ffff", marginBottom: "20px" }} onClick={addNewEmployee}>
                Thêm nhân viên
            </button>

            <div className="d-flex align-items-center mb-3 gap-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Nhập ID nhân viên cần tìm"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{ maxWidth: "250px" }}
                />
                <button className="btn btn-outline-success" onClick={handleSearchById}>Tìm kiếm</button>
                <button className="btn btn-outline-secondary" onClick={handleShowAll}>Xem tất cả</button>
            </div>

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th onClick={toggleSortOrder} style={{ cursor: 'pointer' }}>
                            Employee First Name {isSorted ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => updateEmployee(employee.id)}>Sửa</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(employee.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="d-flex justify-content-center mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn btn-sm mx-1 ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ListEmployeeComponent;
// ✅ Thêm các tính năng: phân trang, tìm kiếm theo ID, sắp xếp theo tên
// ✅ Sửa lỗi: không hiển thị đúng danh sách nhân viên sau khi tìm kiếm hoặc sắp xếp    