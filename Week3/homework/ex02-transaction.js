const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'week3'
});

async function seedDatabase() {

    const execQuery = util.promisify(connection.query.bind(connection));

    const mysql_query = [
        `START TRANSACTION;`,
        `UPDATE account SET balance = balance - 1000 WHERE account_number = 101;`,
        `UPDATE account SET balance = balance + 1000 WHERE account_number = 102;`,
        `INSERT INTO account_changes (account_number, amount, change_date, remark) VALUES(101, -1000, NOW(), 'to friend');`,
        `INSERT INTO account_changes (account_number, amount, change_date, remark) VALUES(102, 1000, NOW(), 'to friend');`
    ];

    try {
        //Check if the account have enough money to transfer
        const isEnoughBalance = await execQuery('SELECT balance, IF(balance >= 1000, "TRUE", "FALSE") AS status FROM account WHERE account_number = 101;');
        if (isEnoughBalance[0].status == 'TRUE'){
            const promises = mysql_query.map(query => execQuery(query));
            await Promise.all(promises);
            await execQuery('COMMIT;');

            console.log("TRANSACTION DONE!");
        }
        else{
            console.log("There is no enough money in the account.");
        }

    }
    catch (err) {
        await execQuery('ROLLBACK;');
        console.error(err.message);
    }

    connection.end();
}

seedDatabase();
