import ListEmployeeComponent from "./component/ListEmployeeComponent"
import HeaderComponent from "./component/HeaderComponent"
import FooterComponent from "./component/FooterComponent"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeComponent from "./component/EmployeeComponent";
import UpdateEmployeeComponent from './component/UpdateEmployeeComponent';
// import UpdateEmployeeComponent from "./component/UpdateEmployeeComponent";
function App() {
  return (
    <BrowserRouter >
      <HeaderComponent />
      <Routes>
        {/* http://localhost:3000 */}
        <Route path='/' element={<ListEmployeeComponent />} />
        {/* http://localhost:3000/employees */}

        <Route path='/employees' element={<ListEmployeeComponent />} />
        {/* http://localhost:3000/add-employee  */}
        <Route path='/add-employee' element={<EmployeeComponent />} />
        <Route path="/edit-employee/:id" element={<UpdateEmployeeComponent />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter >
  )
}
export default App