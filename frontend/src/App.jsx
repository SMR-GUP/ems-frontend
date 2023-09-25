import React from 'react'
import Login from './Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Attendance from './Attendance'
import Home from './Home'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import AddAttendance from './AddAttendance'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}> 
      <Route path='' element={<Home />}> </Route>

      <Route path='/employee' element={<Employee />}> </Route>
      <Route path='/attendance' element={<Attendance />}> </Route>
      <Route path='/create' element={<AddEmployee />}> </Route>
      <Route path='/employeeEdit/:id' element={<EditEmployee />}> </Route>
      <Route path='/addAttendance/:id' element={<AddAttendance/>}> </Route>

      </Route>

      <Route path='/login' element={<Login />}> </Route>
    </Routes>
    </BrowserRouter>
  )
}
import EmployeeEdit from './EditEmployee'

export default App
