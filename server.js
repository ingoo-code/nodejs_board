//npm install sequelize
//npm install mysql
const express = require('express'); 
const app = express();

//Db Connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('homepage','root','root',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});

//Test 구문
sequelize
    .authenticate()
    .then(()=>{
        console.log('Connection has been established successfully.');
    })
    .catch(err =>{
        console.log("Unable to connect to the databases:",err);
    });


app.get('/',(req,res)=>{
    res.send('Hello world!');
})

app.listen(3000,()=>{
    console.log('server start port : 3000');
})