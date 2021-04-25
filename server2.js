const express = require('express');
const nunjucks = require('nunjucks');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
                                   //                CSS,JS,IMAGE,동영상
app.use(express.static('public')); // 익스프레스야 나   정적파일들은 (public) 안에있는 내용으로 만들꺼야ㅣ.
app.use(bodyParser.urlencoded({ extended:false, }));

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
});

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'homepage',
});
connection.connect();

app.get('/',(req,res)=>{
    res.render('index.html');
});

app.get('/list',(req,res)=>{
    connection.query("SELECT idx,subject,board_name,content,hit,date_format(today,'%Y-%m-%d') as today FROM board",(error,results)=>{
        if(error) {
            console.log(error);
        } else {
            res.render('list.html',{
                list:results,
            });
        }
    });
    
});

app.get('/write',(req,res)=>{
    res.render('board_write.html');
});

app.post('/write',(req,res)=>{
    console.log(req.body); 
    connection.query(`INSERT INTO board (subject,board_name,content,hit) 
                      values('${req.body.board_subject}','${req.body.board_name}','${req.body.board_content}',0);`,(error,results)=>{
                    if(error) throw error;
                    res.redirect(`/view?idx=${results.insertId}`)
                    
    })
});

app.get('/modify',(req,res)=>{
    connection.query(`SELECT * FROM board WHERE idx=${req.query.idx}`,(error,results)=>{
        if(error) throw error;
        res.render('board_modify.html',{list:results[0]});
    })
});

app.post('/modify',(req,res)=>{
    let idx = req.body.idx;
    let name = req.body.board_name;
    let subject = req.body.board_subject;
    let content = req.body.board_content;
    connection.query(`UPDATE board SET subject='${subject}', board_name='${name}',content='${content}' where idx=${idx}`,(error,results)=>{
        if(error) throw error;
        res.redirect('/list');
    })
})


app.get('/view',(req,res)=>{
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
});

app.listen(3000,()=>{
    console.log('server start 3000');
});