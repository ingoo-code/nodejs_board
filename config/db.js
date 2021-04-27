const mysql = require('mysql');
const config = {
    host:'localhost',
    user:'root',
    password:'root',
    database:'homepage',
    connectionLimit: 30
}

let pool = mysql.createPool(config);

function getConnection(callback){
    pool.getConnection((err,conn)=>{
        if(!err){
            callback(conn);
        }
    });
}

module.exports = getConnection;