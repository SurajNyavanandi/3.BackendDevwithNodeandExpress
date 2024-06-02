import http from'http';
const server=http.createServer((req,res)=>{
    if(req.url==='/home'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>Welcome to Home Page<h1/>')
    }else if(req.url==='/about'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>Welcome to About Page<h1/>')
    }else if(req.url==='/node'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>Welcome to node js Project<h1/>')
    }else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write('<h1>404 Error<h1/>') 
    }
    res.end();
})
server.listen(4000);