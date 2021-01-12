const { MongoClient } = require("mongodb");

//MongoDB Configurations
const url = "mongodb+srv://"; //add Atlas url
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "world-Mongo";

//1- Create a new record (document) for a new city (your home town, say)
async function addCity() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "city"
        const col = db.collection('city');
        // Construct a document
        let cityDoc = {
            "Name": "Jeddah",
            "CountryCode": "SAU",
            "District": "Makkah",
            "Population": 3976000
        }
        // Insert a single document, wait for promise so we can read it back
        await col.insertOne(cityDoc);
    }
    catch (err) {
         console.log(err.stack);
     }
     finally {
        await client.close();
    }
}

//2- Update that record with a new population
async function updateCityPopulation() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "city"
        const col = db.collection('city');
        //Filter the updated document
        const filter = { Name: "Jeddah" };
        // Updated field in the document
        const updateDoc = {
            $set: {
              Population: 4000003,
            },
        };
        await col.updateOne(filter, updateDoc);
    }
    catch (err) {
         console.log(err.stack);
     }
     finally {
        await client.close();
    }
}

//3- Read the document that you just updated in two ways : finding by the city name, and then by the country code
async function readCity() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "city"
        const col = db.collection('city');
        // Find the document
        const findDoc = { Name: "Jeddah" };
        const foundDoc = await col.findOne(findDoc);
        console.log(foundDoc);
    }
    catch (err) {
         console.log(err.stack);
     }
     finally {
        await client.close();
    }
}

async function readAllCity() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "city"
        const col = db.collection('city');
        // Find all documents
        const findDocs = { CountryCode: "SAU" };
        const foundDocs = await col.find(findDocs).toArray();
        console.log(foundDocs);
    }
    catch (err) {
         console.log(err.stack);
     }
    finally {
        await client.close();
    }
}

//4- Delete the city
async function deleteCity() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "city"
        const col = db.collection('city');
        // Delete the document
        const deleteDoc = { Name: "Jeddah" };
        await col.deleteOne(deleteDoc);
    }
    catch (err) {
         console.log(err.stack);
     }
    finally {
        await client.close();
    }
}

// One perform at the time
addCity();
// updateCityPopulation();
// readCity();
// readAllCity();
// deleteCity();