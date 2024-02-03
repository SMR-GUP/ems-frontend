import React from 'react';
import './Dashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-1 col-xl-2 px-sm-3 px-3 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-1 pt-4 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline bolder">Admin Dashboard</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <Link to="/login" class="nav-link align-middle px-0 text-white">
                            <i class="fs-4 bi bi-door-closed-fill"></i> <span class="ms-1 d-none d-sm-inline">Logout</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" data-bs-toggle="collapse" class="nav-link px-0 align-middle  text-white">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Progress Tracker</span> </Link>
                    </li>
                    <li>
                        <Link to="/attendance" class="nav-link px-0 align-middle  text-white">
                            <i class="fs-4 bi bi-person-square"></i> <span class="ms-1 d-none d-sm-inline">Attendance</span></Link>
                    </li>
                    
                    
                    <li>
                        <Link to="/employee" class="nav-link px-0 align-middle  text-white">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Manage Employees</span> </Link>
                    </li>
                </ul>
               
            </div>
        </div>
        <div class="col p-0 m-0">
            <div className='p-2 d-flex justify-content-centre shadow'>
            <h3 style={{marginLeft:'356px'}}>Employee Management System</h3>
            </div>
           <Outlet/>
       
        </div>
    </div>
</div>
  );
}

export default Dashboard;
