//nmpm
import {MongoClient} from "mongodb";

//npm i dotnev 
import dotnev from "dotnev";
dotnev.config();

const connectionString = process.env.ATLAS_URI || "";

//console.log(connectionString);

const client = new MongoClient(connectionString);

let conn;
try{
    conn = await client.connect();
    console.log('mongoDB is CONNECTED!!!! :');
}catch(e){
    console.error(e);
}

let db = client.db("APDS2024");

export default db;