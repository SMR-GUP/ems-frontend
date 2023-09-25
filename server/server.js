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


app.put('/update/:id', upload.single('image'), (req, res) => {
    const sql = "UPDATE employee SET name=?, date=?, day=?, salary=?, image=? WHERE id=?";
    const values = [
        req.body.name,
        formatDate(req.body.joiningDate),      
        req.body.weekday,
        req.body.salary,
        req.file ? req.file.filename : req.body.image, // If a new image is uploaded, use it, otherwise keep the existing one
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

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete employee error in sql"});
        return res.json({Status: "Success"})
    })
})

app.post('/submitAttendance/:id',async (req, res) => {
    console.log("Requesttttt",req.body);
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


app.post('/create', upload.single('image') , (req,res) => {
    const sql="INSERT INTO employee (`name`,`date`,`day`,`salary`,`image`) VALUES(?)";
    const values = [
        req.body.name,
        formatDate(req.body.joiningDate),      
        req.body.weekday,
        req.body.salary,
        req.file.filename
    ]
    con.query(sql, [values], (err, result) => {
        if(err) {
            console.error(err);
            return res.json({Error: "Inside singup query"});
        }
        return res.json({Status: "Success"});
    })
})



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