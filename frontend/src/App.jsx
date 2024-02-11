import React from 'react'
import Login from './Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Attendance from './Attendance'
import Progress from './Progress'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import ViewStats from './ViewStats'
import NewAttendance from './NewAttendance'
import AddProgress from './AddProgress'
import ViewPacking from './ViewPacking'
import SizeEntry from './SizeEntry'
import MonthlyData from './MonthlyData'
import ProductionData from './ProductionData'
import PackingData from './PackingData'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}> 
      <Route path='' element={<Progress />}> </Route>

      <Route path='/employee' element={<Employee />}> </Route>
      <Route path='/attendance' element={<Attendance />}> </Route>
      <Route path='/create' element={<AddEmployee />}> </Route>
      <Route path='/employeeEdit/:id' element={<EditEmployee/>}> </Route>
      <Route path='/viewStats/:id' element={<ViewStats/>}> </Route>
      <Route path='/newAttendance/:id' element={<NewAttendance/>}> </Route>
      <Route path='/addProgress/:id' element={<AddProgress/>}></Route>
      <Route path='/viewPacking/:id' element={<ViewPacking/>}></Route>
      <Route path='/sizes' element={<SizeEntry />}> </Route>
      <Route path='/monthly' element={<MonthlyData />}> </Route>
      <Route path='/productionData/:id' element={<ProductionData />}> </Route>
      <Route path='/packingData/:id' element={<PackingData />}> </Route>


      </Route>

      <Route path='/login' element={<Login />}> </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
