const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword'
});

function directQuery(query, message){
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (message) console.log(message);
    });
}

//If the database is exist, delete it 
directQuery("DROP DATABASE IF EXISTS meetup", "Database deleted.");

//Create new database
directQuery("CREATE DATABASE meetup", "Database created.");

//Select the new database
directQuery("USE meetup");

//Create `Invitee` table
directQuery("CREATE TABLE Invitee (invitee_no INT PRIMARY KEY NOT NULL AUTO_INCREMENT, invitee_name VARCHAR(255), invited_by VARCHAR(255))", "Table Invitee created.");

//Create `Room` table
directQuery("CREATE TABLE Room (room_no INT PRIMARY KEY NOT NULL AUTO_INCREMENT, room_name VARCHAR(255), floor_number INT)", "Table Room created.");

//Create `Meeting` table
directQuery("CREATE TABLE Meeting (meeting_no INT PRIMARY KEY NOT NULL AUTO_INCREMENT, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT)", "Table Meeting created.");

//Insert into `Invitee` table
directQuery("INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Saoud', 'Salem'), ('Saeed', 'Ali'), ('Samer', 'Mohanned'), ('Mohammed', 'Rayan'), ('Sabri', 'Fathi')", "Inserted into Invitee table.");

//Insert into `Room` table
directQuery("INSERT INTO Room (room_name, floor_number) VALUES ('Salem', 1), ('Ali', 2), ('Mohanned', 3), ('Rayan', 4), ('Fathi', 5)", "Inserted into Room table.");

//Insert into `Meeting` table
directQuery("INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ('BreakFast', '2021-01-01 9:00:00', '2021-01-01 10:00:00', 1), ('Branch', '2021-01-01 12:00:00', '2021-01-01 13:00:00', 2), ('Lunch', '2021-01-01 15:00:00', '2021-01-01 16:00:00', 3), ('Party', '2021-01-01 18:00:00', '2021-01-01 20:00:00', 4), ('Dinner', '2021-01-01 20:00:00', '2021-01-01 21:00:00', 5)", "Inserted into Meeting table.");

connection.end();
