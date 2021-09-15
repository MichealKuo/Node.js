const jwt = require('jsonwebtoken');

const secretKey = 'dqwdqwd';


(async ()=>{

    //encoded
    const token = jwt.sign({name:'David'},secretKey);

    console.log(token);

    const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGF2aWQiLCJpYXQiOjE2MzE2ODU0Njd9.K2F4KXKyXqUI8sAWIv_ubLZyQZhX77DXfQCV9t8qjQ4'
   
    //decoded
    const decoded = await jwt.verify(token1, secretKey);

    console.log(decoded);
    //name: 'David', iat: 1631685467 =>編token的時間點

})()