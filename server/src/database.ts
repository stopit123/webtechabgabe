import * as mongodb from "mongodb";
import { Medium } from "./medium";

export const collections: {
    medien?: mongodb.Collection<Medium>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("MedienDatenbank");
    await applySchemaValidation(db);

    const medienCollection = db.collection<Medium>("medien");
    collections.medien = medienCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "inhalt", "format"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                inhalt: {
                    bsonType: "string",
                    description: "'inhalt' is required and is a string",
                    minLength: 5
                },
                format: {
                    bsonType: "string",
                    description: "'format' is required and is one of 'Film', 'Serie', or 'Buch'",
                    enum: ["Film", "Serie", "Buch"],
                },
            },
        },
    };

   await db.command({
        collMod: "medien",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("medien", {validator: jsonSchema});
        }
    });
}
