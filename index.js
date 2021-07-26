const mysql = require('mysql')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())


const mysqlConnection = mysql.createConnection({
	host : "localhost",
	database : "employeedb",
	user : "root",
	password : "KM@852147154", 
	multipleStatements : true
})
mysqlConnection.connect((err)=>{
	if(!err)
	console.log("connection successded")
	else 
	console.log("error to connect " , JSON.stringify(err,undefined,2))
})

//get employees
app.get('/employees' , (req,res)=>{
	mysqlConnection.query("SELECT * FROM EMPLOYEE" , (err, rows,field)=>{
		if(!err)
		res.send(rows)
		else
		console.log(err)
	})
})

//get an employee 
app.get('/employees/:id' , (req,res)=>{
	
	mysqlConnection.query("SELECT * FROM EMPLOYEE WHERE EMPID= ?",[req.params.id] , (err, rows,field)=>{
		if(!err)
		res.send(rows)
		else
		console.log(err)
	})
})
// delete on employee post and delete must happen in postman
app.delete ("/employees/:id" , (req,res)=>{
	mysqlConnection.query("DELETE FROM EMPLOYEE WHERE EMPID = ?" , [req.params.id] , (err, rows , field) =>{
		if(!err)
		res.send("A employee is deleted !")
		else 
		console.log(err)
	})
})
//add and edit for this best is add procidure to sql
app.post("/employees" , (req,res)=>{
	const emp = req.body;
	const sql = "SET @EMPID = ? ; SET @NAME = ? ; SET @EmpCode = ? ; SET @Salary = ? ; \
	CALL EmployeeAddOrEdit(@EMPID,@NAME,@EmpCode,@Salary);"
	mysqlConnection.query(sql , [emp.EMPID ,emp.NAME , emp.EmpCode , emp.Salary] , (err , rows , field)=>{
		if(!err){
			// console.log(rows)
			// rows.forEach(element => {
			// 	if(element.constructor == Array)
			// 	res.send("add employee success ID : " + element[0].EmpID)
			// });
			res.send("success")
		
		}else{
			console.log(err)
		}

	})
})
app.put("/employees" , (req,res)=>{
	const emp = req.body;
	const sql = "SET @EmpID = ? ; SET @NAME = ? ; SET @EmpCode = ? ; SET @Salary = ? ; \
	CALL EmployeeAddOrEdit(@EmpID,@NAME,@EmpCode,@Salary);"
	mysqlConnection.query(sql , [emp.EmpID,emp.NAME,emp.EmpCode,emp.Salary] , (err , rows , field)=>{
		if(!err){
			res.send("update successfully")		
		}else{
			console.log(err)
		}

	})
})


app.listen(3000, ()=>{console.log("express server is runnig successfully!")})