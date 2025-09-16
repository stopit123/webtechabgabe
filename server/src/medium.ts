import * as mongodb from "mongodb";
export interface Medium {
    name: string;
    inhalt: string;
    format: "buch" | "serie" | "film";
    _id?: mongodb.ObjectId;
}
