import axios from "axios";
// Tạo một biến lưu địa chỉ gốc của API đã viết trong backend
const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// Xuất ra hàm listEmployees để có thể chỗ khác gọi lại được
// Nó sử dụng thằng axios để gửi request đến API với phương thức GET
export const listEmployees = () => axios.get(REST_API_BASE_URL);

// hàm thêm nhân viên nhận một obj là nhân viên 
// sau đó dùng thằng axios để gửi lên backend xử lý để thêm vo dtb
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const deleteEmployeeById = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/${id}`);
};
export const getEmployeeById = (id) => {
  return axios.get(`${REST_API_BASE_URL}/${id}`);
};
export const updateEmployee = (id, employee) => {
    return axios.put(`${REST_API_BASE_URL}/${id}`, employee);
};