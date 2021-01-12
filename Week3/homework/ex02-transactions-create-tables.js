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
        `CREATE TABLE account (account_number INT PRIMARY KEY AUTO_INCREMENT, balance INT);`,

        `CREATE TABLE account_changes (change_number INT AUTO_INCREMENT, account_number INT, amount INT, change_date DATE, remark VARCHAR(255),
         PRIMARY KEY (change_number), 
         CONSTRAINT FK_account_number FOREIGN KEY (account_number) REFERENCES account(account_number));`
    ];

    try {
        const promises = mysql_query.map(query => execQuery(query));
        await Promise.all(promises);
    }
    catch (err) {
        console.error(err.message);
    }

    connection.end();
}

seedDatabase();
