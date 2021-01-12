const util = require('util');
const mysql = require('mysql');
const { MongoClient } = require("mongodb");

//MySQL Configurations
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'world'
});

//MongoDB Configurations
const url = "mongodb+srv://"; //add Atlas url
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "world-Mongo";

//MySQL Connection
async function runMySql(tableName) {
    const execQuery = util.promisify(connection.query.bind(connection));
    try {
        let dataObj = [];
        const promise = await execQuery(`SELECT * from ${tableName};`);
        
        if (tableName === 'city'){
            promise.forEach(element => dataObj.push({Name: element.Name, CountryCode: element.CountryCode, District: element.District, Population: element.Population}));
        }
        else if (tableName === 'country'){
            promise.forEach(element => dataObj.push({Code: element.Code, Name: element.Name, Continent: element.Continent, Region: element.Region, SurfaceArea: element.SurfaceArea, IndepYear: element.IndepYear, Population: element.Population, LifeExpectancy: element.LifeExpectancy, GNP: element.GNP, GNPOld: element.GNPOld, LocalName: element.LocalName, GovernmentForm: element.GovernmentForm, HeadOfState: element.HeadOfState, Capital: element.Capital, Code2: element.Code2}));
        }
        else if (tableName === 'countrylanguage'){
            promise.forEach(element => dataObj.push({CountryCode: element.CountryCode, Language: element.Language, IsOfficial: element.IsOfficial, Percentage: element.Percentage}));
        }
        else{
            console.log("You entered wrong argument.");
        }

        runMongoDB(tableName, dataObj).catch(console.dir);
    }
    catch (err) {
        console.error(err.message);
    }
    finally {
        connection.end();
    }
}

//MongoDB Connection
async function runMongoDB(collectionName, documents) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use a collection
        const col = db.collection(collectionName);
        // Insert multi documents, wait for promise so we can read it back
        await col.insertMany(documents);
    }
    catch (err) {
         console.log(err.stack);
     }
     finally {
        await client.close();
    }
}

// One perform at the time
runMySql('city');
// runMySql('country');
// runMySql('countrylanguage');
