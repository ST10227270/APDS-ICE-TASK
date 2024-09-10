import express from "express";
import db from "../db/connection.mjs";
import {ObjectId} from "mongodb";

const router = express.Router();

//Get all the records
router.get("/",async(req, res)=>{
    let connection = await db.collection("posts");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

//Create a new record.
router.post("/upload", checkauth, async(res,req)=>{
    let newDocument = {
        user: req.body.user,
        content: req.body.content,
        image: req.body.image
    };
    let connection = await db.collection("posts");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});
//Update a record by id
router.patch("/:id",checkauth, async(req,res)=>{
    const query = {_id: new ObjectId(req.params.id)};
    const updates = {
        $set:{
            name: req.body.name,
            comment: req.body.comment
        }
    };

    let collection = await db.collection("posts");
    let result = await collection.updateOne(query,updates);

    res.send(result).status(200);
});

//Gets a signle record by id
router("/:id",async (req,res)=>{
    let collection = await db.collection("posts");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await db.collection.findOne(query);

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

//Delete record
router.delete("/:id", async (req,res) =>{
    const query = {_id: new ObjectId(req.params.id)};

    const collection = db.collection("post");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;