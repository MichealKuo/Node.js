const http = require('http');
const fs= require('fs');
const { error } = require('console');
//套件名稱放入('')

const server = http.createServer((req,res)=>{
    //2000 Status Code
    res.writeHead(200,{
        'Content-Type':'text/html'
    })

    fs.writeFile(
        'headers.txt',
        JSON.stringify(req.headers,null,4),
        error=>{
            if(error){
                res.end(`<h1>錯誤: ${error}</h1>`);
            }else {
                res.end(`<h2>ok</h2>`)
            }
        })
    
  

   

});
//

server.listen(3000);
// port 3000 埠號