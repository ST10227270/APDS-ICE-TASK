//console.log('ADPS makes me cry!')--> to prove the server works
// import express from "express"//express is basically a server -- its a framework 
// import http from "http"
// const app = express()

// app.use(express.json())

// const PORT = 3000

// const urlprefix= "/api"

// app.get("/", (req,res)=>
// {
//     res.send("Using express to run the server")
// })

// app.get("/test",(req,res)=>{
//     res.send("Using the /test endpoint")
// })

// app.get(urlprefix+"/favorites", (req,res)=>{
//  const favs =[
//     {id: "1",
//      name: "music"
//     },
//     {id: "2", 
//         name: "dance"
//        },
//        {id: "3",
//         name: "videos"
//        }
//  ]  
//  res.json({
//     message: "favs",
//     favs : favs
//  }) 
// })

//const server = http.createServer((req,res)=>{res.end('We are making this work')})

//server.listen(PORT)

// app.listen(PORT)

import https from "https";
import http from "http";
import fs from "fs";
import fruits from "./routes/fruits.mjs";
import users from "./routes/user.mjs";
import express from "express"
import cors from "cors"

const PORT = 3000;
const app = express();

const options = {
    key:fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

app.use(cors());
app.use(express.json());

app.use((reg,res,next)=>
{
    res.setHeader('Acecess-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();


})

app.use("/post", post);
app.route("/post", post);
app.use("/user", user);
app.route("/user", user);

let server = https.createServer(options,app)

server.listen(PORT);

