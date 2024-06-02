import http from 'http';

const server=http.createServer((req,res)=>{
    res.write('SurajNyavanandi');
    console.log('SurajNyavanandi');
    res.end();
})

server.listen(4000,()=>{
    console.log('Server started running........');
})