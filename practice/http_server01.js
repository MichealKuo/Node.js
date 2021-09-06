const http = require('http');
//套件名稱放入('')

const server = http.createServer((req,res)=>{
    //2000 Status Code
    res.writeHead(200,{
        'Content-Type':'text/html'
    })
    res.end(`<h1>Hello World, ${req.url}</h1>`);

    //end   是輸出內容到頁面上

});
//

server.listen(3000);
// port 3000 埠號