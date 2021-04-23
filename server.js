/* express만 사용해서 3000 / hello world */
const express = require('express'); // express 만든사람이 이렇게하래요.
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello world!');
})

app.listen(3000,()=>{
    console.log('server start port : 3000');
})