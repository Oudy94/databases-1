const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'world'
});

function directQuery(query, message){
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (message) console.log(message);

        console.log(results);
    });
}

//1-What are the names of countries with population greater than 8 million?
directQuery("SELECT Name FROM country WHERE Population > 800000000");

//2-What are the names of countries that have “land” in their names?
directQuery("SELECT Name FROM country WHERE Name LIKE '%land%'");

//3-What are the names of the cities with population in between 500,000 and 1 million?
directQuery("SELECT Name FROM country WHERE Population BETWEEN 500000 AND 1000000");

//4-What's the name of all the countries on the continent ‘Europe’?
directQuery("SELECT Name FROM country WHERE Continent = 'Europe'");

//5-List all the countries in the descending order of their surface areas.
directQuery("SELECT Name FROM country ORDER BY SurfaceArea DESC");

//6-What are the names of all the cities in the Netherlands?
directQuery("SELECT Name FROM city WHERE CountryCode = 'NLD'");

//7-What is the population of Rotterdam?
directQuery("SELECT Population FROM city WHERE Name = 'Rotterdam'");

//8-What's the top 10 countries by Surface Area?
directQuery("SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10");
//adding rank column next to the country name (just to show off :P)
directQuery("SELECT s.SurfaceArea, ((SELECT count(DISTINCT SurfaceArea) FROM country WHERE SurfaceArea > s.SurfaceArea) + 1) 'rank' FROM country s ORDER BY s.SurfaceArea DESC LIMIT 10");

//9-What's the top 10 most populated cities?
directQuery("SELECT Name FROM city ORDER BY Population DESC LIMIT 10");
//adding rank column next to the city name (just to show off :P)
directQuery("SELECT s.Population, ((SELECT count(DISTINCT Population) FROM city WHERE Population > s.Population) + 1) 'rank' FROM city s ORDER BY s.Population DESC LIMIT 10");

//10-What is the population number of the world?
directQuery("SELECT SUM(Population) AS 'world-population' FROM country");

connection.end();