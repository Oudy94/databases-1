const mysql = require('mysql');

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'world',
    multipleStatements: true
});

/*
//1- Normal user
function getPopulationNormal(country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${country} WHERE Name = '${name}' and code = '${code}'`,
        function(err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result[0].Population);
        }
    );
}

getPopulationNormal("country", "Yemen", "YEM", (error, result) => {
    if (error) console.log(error);
    else console.log(result);

    conn.end();
});
*/

/*
//2- Malicious user
function getPopulationMalicious(country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${country} WHERE Name = '${name}' and code = '${code}'`,
        function(err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result);
        }
    );
}

getPopulationMalicious('country', "Yemen", "YEM'OR 1=1 OR'", (error, result) => {
    if (error) console.log(error);
    else{
        for(let i = 0; i < result.length; i++){
            console.log(result[i].Population);
        }
    }
    conn.end();
});
*/

//3- Protected code against malicious user
function getPopulationProtected(country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    const escapedQuery = (`SELECT Population FROM ${country} WHERE Name = ? and code = ?`);
    conn.query(
        escapedQuery, [name, code],
        function(err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result);
        }
    );
}

getPopulationProtected('country', "Yemen", "YEM'OR 1=1 OR'", (error, result) => {
    if (error) console.log(error);
    else console.log(result);
    conn.end();

});
