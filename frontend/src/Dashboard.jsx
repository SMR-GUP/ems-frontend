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
                    <span class="fs-5 d-none d-sm-inline bolder"  style={{fontFamily: "Open Sans, sans-serif"}}>Admin Dashboard</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <Link to="/login" class="nav-link align-middle px-1 text-white">
                            <i class="fs-3 bi bi-door-closed-fill"></i> <span class="ms-1 d-none d-sm-inline" style={{fontFamily: "Open Sans, sans-serif",fontSize:"18px"}}>Logout</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" data-bs-toggle="collapse" class="nav-link px-1 align-middle  text-white">
                            <i class="fs-4 bi bi-calendar-check-fill"></i> <span class="ms-1 d-none d-sm-inline" style={{fontFamily: "Open Sans, sans-serif",fontSize:"18px"}}>Daily Entry</span> </Link>
                    </li>
                    <li>
                        <Link to="/attendance" class="nav-link px-1 align-middle  text-white">
                            <i class="fs-3 bi bi-person-raised-hand"></i> <span class="ms-1 d-none d-sm-inline" style={{fontFamily: "Open Sans, sans-serif",fontSize:"18px"}}>Attendance</span></Link>
                    </li>
                    
                    
                    <li>
                        <Link to="/employee" class="nav-link px-1 align-middle  text-white">
                            <i class="fs-3 bi bi-person-fill-gear"></i> <span class="ms-1 d-none d-sm-inline" style={{fontFamily: "Open Sans, sans-serif",fontSize:"18px"}}>Manage Employees</span> </Link>
                    </li>

                    <li>
                        <Link to="/sizes" class="nav-link px-1 align-middle  text-white">
                            <i class="fs-3 bi bi-book-fill"></i> <span class="ms-1 d-none d-sm-inline" style={{fontFamily: "Open Sans, sans-serif",fontSize:"18px"}}>Size Entries</span> </Link>
                    </li>

                    <li>
                        <Link to="/monthly" class="nav-link px-1 align-middle  text-white">
                            <i class="fs-3 bi-bar-chart-line"></i> <span class="ms-1 d-none d-sm-inline" style={{fontFamily: "Open Sans, sans-serif",fontSize:"18px"}}>Monthly Data</span> </Link>
                    </li>


                </ul>
               
            </div>
        </div>
        <div class="col p-0 m-0">
            <div className='p-2 d-flex justify-content-centre shadow'>
            <h3 style={{marginLeft:'380px',fontFamily: "Open Sans, sans-serif",fontSize:'32px'}}>ShreeChem StaffMaster</h3>
            </div>
           <Outlet/>
       
        </div>
    </div>
</div>
  );
}

export default Dashboard;
