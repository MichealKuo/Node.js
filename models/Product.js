const db = require('./../modules/connect-mysql');

const tableName = 'products';
const pkField = 'sid';
class Product {
    
    static async readOne(pk=0){
        const sql = `SELECT * FROM ${tableName} WHERE ${pkField}=?`;
        const [rs] = await db.query(sql, [pk]);
        if(rs && rs.length===1){
         
          return  rs[0];
        }
        return null
    }
    
}

module.exports = Product;