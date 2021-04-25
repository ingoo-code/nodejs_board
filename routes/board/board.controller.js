const mysql = require('mysql')
const connection = mysql.createConnection({
	host:'localhost',
    user:'root',
    password:'root',
    database:'homepage',
})


let list = (req, res, next) =>{
    connection.query("SELECT idx,subject,board_name,content,hit,date_format(today,'%Y-%m-%d') as today FROM board",(error,results)=>{
        if(error) {
            console.log(error);
        } else {
            res.render('list.html',{
                list:results,
            });
        }
    });
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