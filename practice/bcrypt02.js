const bcrypt = require('bcryptjs');

(async () => {
    
    const t1 = Date.now();

    
    
    const hash2 = await bcrypt.hash('Micheal',8);//次數１０ 最多31次 不得超過

    console.log(`hash: ${hash2}`);
    const t2 = Date.now();
    console.log(t2-t1);

    const hash3 = await bcrypt.hash('Micheal',12);//次數１０ 最多31次 不得超過

    console.log(`hash: ${hash2}`);
    const t3 = Date.now();
    console.log(t3-t2);

})();