
const db = require('./../modules/connect-mysql');




db.query("SELECT * FROM address_book LIMIT 5")
    .then( ([r]) =>{
        console.log(r);
        process.exit();
    })
    //錯誤處理 catch
    .catch(ex=>{
        console.log(ex);
    })
   
  
   

