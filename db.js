/*
    자료만드는중..
    비동기와 
    ProtoType 과 Class..

*/
const mysql = require('mysql');

const DB_info = {
    host:'localhost',
    user:'root',
    password:'root',
    database:'homepage',
}

function Connection(sql){
    let connection = mysql.createConnection(DB_info);
    connection.query(sql,(error,results)=>{
        if(error){
            console.log(error);
            return false;
        }

        console.info(`SQL :`,sql);
        rst = results;
        //console.log(rst);
    });
    console.log('aa');
    //console.log(rst);
    connection.end();
    console.log('bb');
}

function Connection2(sql){
    return new Promise( (resolve , reject)=>{
        let connection = mysql.createConnection(DB_info);
        connection.query(sql,(error,results)=>{
            if(error) reject(error);
            console.info(`SQL :`,sql);
            resolve(results);
        });
    });
}

function Connection_close(obj){

}

$sql = `select * from board`;
/*
let rows = Connection($sql);
console.log(rows);
*/

Connection2($sql).then((data)=>{
    //console.log(data);
    console.log('connect');
}).catch((error)=>{
    //console.log(error);
    console.log('faild');
});


