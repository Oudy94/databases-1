const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'week2'
});


const mysql_query = [

//1- Create a table, called Authors. Give it the following fields: (author_no(Primary Key), author_name, university, date_of_birth, h_index, gender)
"CREATE TABLE authors (author_no INT AUTO_INCREMENT, author_name VARCHAR(255), university VARCHAR(255), date_of_birth DATE, h_index VARCHAR(255), gender ENUM('male', 'female'), PRIMARY KEY(author_no)) CHARACTER SET=utf8;",

//2- Write a query that adds a foreign key column to Authors table that references the column author_no. Call this column Collaborator.
"ALTER TABLE authors ADD COLUMN collaborator INT AFTER gender, ADD FOREIGN KEY(collaborator) REFERENCES authors(author_no);"

];


mysql_query.forEach(element => {
    connection.query(element, function (error, results, fields) {
        if (error) throw error;
    });
});

connection.end();
