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
        res.status(500).send(error instanceof Error ? error.message : "Unbekannter Fehler");
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
            res.status(404).send(`Fehler beim Finden eines Mediums: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Fehler beim Finden eines Mediums: ID ${req?.params?.id}`);
    }
});
mediumRouter.post("/", async (req, res) => {
    try {
        const medium = req.body;
        const result = await collections?.medien?.insertOne(medium);
        if (result?.acknowledged) {
            res.status(201).send(`Neues Medium erstellt: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Fehler beim Erstellen eines Mediums.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unbekannter Fehler");
    }
});
mediumRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const medium = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.medien?.updateOne(query, { $set: medium });
        if (result && result.matchedCount) {
            res.status(200).send(`Ein Medium wurde geupdatet: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Fehler beim Finden eines Mediums: ID ${id}`);
        } else {
            res.status(304).send(`Fehler beim Updaten eines Mediums: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unbekannter Fehler";
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
            res.status(202).send(`Ein Medium wurde entfernt: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Fehler beim Löschen eines Mediums: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Fehler beim Finden eines Mediums: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unbekannter Fehler";
        console.error(message);
        res.status(400).send(message);
    }
});