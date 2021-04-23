/*
   주말 과제 게시판 간단만들기
    리스트 만들기
    1. 게시판 리스트 <--
    2. 게시글 보기 (삭제,수정)
    3. 게시글 수정 
    4. 게시글 작성

    for 문 if 문 
    {% for [변수] in [배열]}
        {{[변수].[요소]}}
    {% endfor %}

    //DB nunjunks
    // server에서 html페이지에 변수를넘기기위해.
*/
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
/*
    URL패턴
    http://[도메인]/view?name=ingoo&name2=ingoo2
                    URI 

    GET 이랑 POST의 차이점
    GET url표현
    POST 표현x
    저희가쓰는 도메인은 뭘까요 ?
    http://localhost:3000 /view ?idx=3
              도메인       URI    GET 
*/
connection.connect();

app.get('/',(req,res)=>{
    res.render('index.html');
});

app.get('/list',(req,res)=>{
    // 1. 데이터베이스 -> homepage -> board 테이블을 select문 활용하여 내용을 콘솔로그에 찍기.
    // 2. 콘솔로그를 찍은 내용을 list.html 데이터를 넘겨보죠 <- 넌작스 넘겨보기
    // 3. 넌작스 구문배워오기 
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
    console.log(req.body); // 작동이 되나요?~\
    /* 
        DB내용 처리한다음에 list.html 넘어가면됩니다.
        내용을 수정하는부분
     */
    //res.render('list.html');
    res.redirect('/list');
});

app.get('/modify',(req,res)=>{
    res.render('board_modify.html');
});

app.post('/modify',(req,res)=>{
    console.log(req.body);
    /* DB내용 처리하는 부분 
       해당내용 UPDATE하는 부분
    */
    res.redirect('/list');
})


app.get('/view',(req,res)=>{
    console.log(req.query.idx);
    //> select * from board where idx = 2; -> result
    res.render('board_view.html') // <- result값 넣기
});

app.listen(3000,()=>{
    console.log('server start 3000');
});

/*
    nunjucks -> 구문을 알아오기
    오늘 배운내용 안보고칠떄까지 연습해오기.
*/