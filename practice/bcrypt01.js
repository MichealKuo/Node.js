const bcrypt = require('bcryptjs');

(async () => {
    
    const salt = await bcrypt.genSalt(8);

    console.log(`salt: ${salt}`);

    const hash1 = await bcrypt.hash('Micheal',salt);

    console.log(`hash: ${hash1}`);

    
    const hash2 = await bcrypt.hash('Micheal',10);//次數１０ 最多31次 不得超過

    console.log(`hash: ${hash2}`);

    const hash3 = await bcrypt.hash('Micheal',salt);//次數１０ 最多31次 不得超過

    console.log(`hash: ${hash3}`);

    console.log(await bcrypt.compare('Micheal', hash2));

})();