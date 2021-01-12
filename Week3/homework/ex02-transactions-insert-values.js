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
        `ALTER TABLE account AUTO_INCREMENT = 101;`, //set the auto increament to start from 101
        `INSERT INTO account (balance) VALUES(1500),(200),(120),(5220),(8450),(7750),(10),(9910),(50110),(310);`
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
