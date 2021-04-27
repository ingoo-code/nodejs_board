const mysql = require('mysql');
const getConnection = require('../../config/db');

const connection = mysql.createConnection({
	host:'localhost',
    user:'root',
    password:'root',
    database:'homepage',
})


let list = (req, res, next) =>{
    getConnection( (conn) => {
        conn.query("select * from board",(e,result)=>{
            if(e){
                console.log('error: ',e);
            } else {
                res.render('list.html',{
                    list:result
                });
            }
        });
        conn.release();
    })
}

let view = (req,res,next)=>{

    connection.query(`UPDATE board SET hit=hit+1 WHERE idx=${req.query.idx};`,(error,result)=>{
        if(error) throw error;
        if(result.changedRows > 0){
            connection.query(`SELECT * FROM board WHERE idx=${req.query.idx};`,(error,results)=>{
                if(error) throw error;
                res.render('board_view.html',{list:results[0]});
            });
        } else {
            res.send('조회수 UPDATE 오류');
        }
    });

   
}


module.exports = {
    list:list,
    view:view,
};