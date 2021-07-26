const mysql = require('mysql')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())


const mysqlConnection = mysql.createConnection({
	host : "localhost",
	database : "employeedb",
	user : "root",
	password : "KM@852147154"
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


app.listen(3000, ()=>{console.log("express server is runnig successfully!")})