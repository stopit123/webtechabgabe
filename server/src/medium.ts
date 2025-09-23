import * as mongodb from "mongodb";
export interface Medium {
    name: string;
    inhalt: string;
    format: "Buch" | "Serie" | "Film";
    _id?: mongodb.ObjectId;
}
