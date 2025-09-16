import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";
export const mediumRouter = express.Router();
mediumRouter.use(express.json());
mediumRouter.get("/", async (_req, res) => {
    try {
        const medien = await collections?.medien?.find({}).toArray();
        res.status(200).send(medien);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});
mediumRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const medium = await collections?.medien?.findOne(query);
        if (medium) {
            res.status(200).send(medium);
        } else {
            res.status(404).send(`Failed to find an medium: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an medium: ID ${req?.params?.id}`);
    }
});
mediumRouter.post("/", async (req, res) => {
    try {
        const medium = req.body;
        const result = await collections?.medien?.insertOne(medium);
        if (result?.acknowledged) {
            res.status(201).send(`Created a new medium: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new medium.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});
mediumRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const medium = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.medien?.updateOne(query, { $set: medium });
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an medium: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find an medium: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an medium: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});
mediumRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.medien?.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an medium: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an medium: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an medium: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});