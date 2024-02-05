import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'




const app=express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
            cb(null,'public/images')
    },
    filename:(req,file,cb) =>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
  storage:storage
})

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

con.connect(function(err){
    if(err){
        console.log("Error in Connection",err);
    }

    else
    {
        console.log("Connected");
    }

})


app.get('/getEmployee' , (req,res) =>{
    const sql="SELECT * FROM employee";
    con.query(sql, (err,result)=>{
        if(err)
        {
            return res.json({Error:"Get employee error in sql"});
        }

        return res.json({Status:"Success",Result:result});
    })
})


app.get('/getSizes' , (req,res) =>{
    const sql="SELECT * FROM sizes";
    con.query(sql, (err,result)=>{
        if(err)
        {
            return res.json({Error:"Get size error in sql"});
        }

        return res.json({Status:"Success",Result:result});
    })
})






app.post('/login',(req,res) =>{
    const sql="SELECT * FROM users WHERE email = ? AND password = ?";
    con.query(sql,[req.body.email,req.body.password], (err,result) =>{
        if(err) return res.json({Status:"Error", Error:"Error in Running Query"});
        if(result.length>0)
        {
            return res.json({Status:"Success"});
        }
        
        else
        {
            return res.json({Status:"Error" , Error:"Wrong Email or Password"});
        }
    })
})


app.put('/update/:id', (req, res) => {
    const sql = "UPDATE employee SET name=?, date=?, day=?, salary=? WHERE id=?";
    const values = [
        req.body.name,
        formatDate(req.body.joiningDate),      
        req.body.weekday,
        req.body.salary,
        req.params.id
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error updating employee" });
        }
        return res.json({ Status: "Success" });
    });
});


app.put('/updateAttendance/:id/:day/:month/:year', (req, res) => {
    const sql = "UPDATE attendance SET status=? WHERE employee_id=? AND day=? AND month=? AND year=?";
    const values = [
      req.body.status,
      req.params.id,
      req.params.day,
      req.params.month,
      req.params.year
    ];
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ error: "Error updating attendance" });
      }
  
      return res.json({ success: true, message: "Attendance updated successfully" });
    });
  });

  app.put('/updateSizeEntry/:id',(req,res) =>{
    const sql = "UPDATE sizes SET sizeno=? ,sizecode=?  WHERE id=?";
    const values =[
        req.body.sizeno,
        req.body.sizecode,
        req.params.id,
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          return res.json({ error: "Error updating size entry" });
        }
    
        return res.json({ success: true, message: "Size Entry updated successfully" });
      });
  })


  app.put('/updateProgress/:id/:day/:month/:year/:quantity/:sizeno/:value/:packed', (req, res) => {
    // console.log("API called");
    const sql = "UPDATE progress SET quantity=? ,sizeno=? ,value=?, packed=? WHERE emp_id=? AND day=? AND month=? AND year=? AND quantity=? AND sizeno=? AND value=? AND packed=?";
    const values = [
        req.body.quantity,
        req.body.sizeno,
        req.body.value,
        req.body.packed,
      req.params.id,
      req.params.day,
      req.params.month,
      req.params.year,
      req.params.quantity,  // Match the existing values in the WHERE clause
      req.params.sizeno,
      req.params.value,
      req.params.packed,
    ];
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ error: "Error updating progress" });
      }
  
      return res.json({ success: true, message: "Progress updated successfully" });
    });
  });


  

app.get('/get/:id', (req, res) => {
    const employeeId = req.params.id;

    const sql = 'SELECT * FROM employee WHERE id = ?';
    con.query(sql, [employeeId], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: 'Error getting employee details' });
        }

        return res.json({ Result: result });
    });
});


app.get('/getDayAttendance/:id/:year/:month/:day', (req, res) => {
    const { id,year, month, day } = req.params;

    const sql = 'SELECT * FROM attendance WHERE employee_id=? AND YEAR = ? AND MONTH = ? AND DAY = ?';
    con.query(sql, [id,year, month, day], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: 'Error getting day-wise attendance details' });
        }

        return res.json({ Result: result });
    });
});






app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete employee error in sql"});
        return res.json({Status: "Success"})
    })
})



app.delete('/deleteSizeEntry/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM sizes WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete size error in sql"});
        return res.json({Status: "Success"})
    })
})



app.delete('/deleteProgress/:id/:month/:day/:year/:quantity/:sizeno/:value/:packed', (req, res) => {
    const id = req.params.id;
    const month = req.params.month;
    const day = req.params.day;
    const year = req.params.year;
    const quantity = req.params.quantity;
    const sizeno = req.params.sizeno;
    const value = req.params.value;
    const packed = req.params.packed;

    // console.log(id+"  "+day+"  "+month+"  "+year);

    const sql = "DELETE FROM progress WHERE emp_id = ? AND month = ? AND day = ?  AND year = ? AND quantity = ? AND sizeno = ? AND value = ? AND packed = ?";
    
    con.query(sql, [id, day, month, year,quantity,sizeno,value,packed], (err, result) => {
        if (err) return res.json({ Error: "Delete progress error in SQL" });

        // if (result.affectedRows === 0) {
        //     // No matching record found
        //     return res.json({ Status: "No matching record found for deletion" });
        // }

        return res.json({ Status: "Success" });
    });
});


app.post('/submitAttendance/:id',async (req, res) => {
    // console.log("Requesttttt",req.body);
    const sql= "INSERT INTO attendance (`employee_id`,`month`,`day`,`year`,`status`) VALUES (?)";
    const values = [
        req.params.id,
        req.body.month,
        req.body.day,
        req.body.year,
        req.body.status
    ];
    console.log("Answer",values);
    con.query(sql,[values],(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error in adding attendance" });
        }
        return res.json({ Status: "Success" });
    });
});


app.post('/submitProgress/:id',async (req, res) => {
    console.log("Requesttttt",req.body);
    const sql= "INSERT INTO progress (`emp_id`,`month`,`day`,`year`,`quantity`,`sizeno`,`value`,`packed`) VALUES (?)";
    const values = [
        req.params.id,
        req.body.month,
        req.body.day,
        req.body.year,
        req.body.quantity,
        req.body.sizeno,
        req.body.value,
        req.body.packed
    ];
    console.log("Answer",values);
    con.query(sql,[values],(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error in adding progress" });
        }
        return res.json({ Status: "Success" });
    });
});


app.get('/getAttendance/:id', (req, res) => {
    const employeeId = req.params.id;
    const { month, year } = req.query;
    const sql = 'SELECT * FROM attendance WHERE employee_id = ? AND month = ? AND year = ?';
    con.query(sql, [employeeId, month, year], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: 'Error getting employee details' });
        }

        return res.json({ Result: result });
    });
});


app.get('/getPacking/:packed', (req, res) => {
    const { packed } = req.params;
    const { month, year } = req.query;
    const sql = 'SELECT * FROM progress WHERE packed = ? AND month = ? AND year = ?';

    con.query(sql, [packed, month, year], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: 'Error getting packing details' });
        }

        return res.json({ Result: result });
    });
});


app.get('/getProgress/:id', (req, res) => {
    const employeeId = req.params.id;
    const { month, year } = req.query;
    const sql = 'SELECT * FROM progress WHERE emp_id = ? AND month = ? AND year = ?';
    con.query(sql, [employeeId, month, year], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: 'Error getting employee details' });
        }

        return res.json({ Result: result });
    });
});


app.get('/getDayProgress/:id/:day/:month/:year', (req, res) => {
    const emp_id = req.params.id;
    const { day, month, year } = req.params;
    // console.log(day+" "+month+" "+year+" "+emp_id+"Valueeesss");
    const sql = 'SELECT * FROM progress WHERE emp_id = ? AND day = ? AND month = ? AND year = ?';
    con.query(sql, [emp_id, day, month, year], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: 'Error getting progress details' });
        }

        return res.json({ Result: result });
    });
});




app.get('/getDayPacking/:packed/:day/:month/:year', (req, res) => {
    const packed = req.params.packed;
    const { day, month, year } = req.params;
    const sql = 'SELECT * FROM progress WHERE packed = ? AND day = ? AND month = ? AND year = ?';
    con.query(sql, [packed, day, month, year], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: 'Error getting packing details' });
        }

        return res.json({ Result: result });
    });
});





app.get('/getStatus/:id',(req,res)=> {
    const employeeId=req.params.id;
    const {month,year,day}=req.query;
    const sql='SELECT * FROM attendance WHERE employee_id = ? AND month = ? AND year = ? AND day=?';
    con.query(sql,[employeeId,month,year,day],(err,result)=>{
        if(err){
            console.error('Error in quering database',err);
            return res.json({Error:'Error in fetching details'});
        }
        else
        {
            const status = result.length > 0 ? result[0].status : 'Not Marked';
            return res.json({ status });
        }
    })
});

app.get('/getSalary/:id', (req, res) => {
    const employeeId = req.params.id;

    const sql = 'SELECT * FROM employee WHERE id = ?';
    con.query(sql, [employeeId], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: 'Error getting employee details' });
        }

        if (result.length === 0) {
            return res.json({ Error: 'Employee not found' });
        }

        const salary = result[0].salary;
        return res.json({ Salary: salary });
    });
});

app.post('/create', (req,res) => {
    const sql="INSERT INTO employee (`name`,`date`,`day`,`salary`) VALUES(?)";
    const values = [
        req.body.name,
        formatDate(req.body.joiningDate),      
        req.body.weekday,
        req.body.salary,
    ]
    con.query(sql, [values], (err, result) => {
        if(err) {
            console.error(err);
            return res.json({Error: "Inside singup query"});
        }
        return res.json({Status: "Success"});
    })
})

app.post('/addsize', (req, res) => {
    const sql = "INSERT INTO sizes (`sizeno`, `sizecode`) VALUES (?, ?)";
    const values = [
      req.body.sizeno,
      req.body.sizecode
    ];
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Error: "Error in size entry query" });
      }
      return res.json({ Status: "Size entry added successfully" });
    });
  });
  





function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

app.listen(8081, ()=> {
    console.log("Running");
})