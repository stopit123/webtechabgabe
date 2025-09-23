import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { mediumRouter } from "./medium.routes";
import { connectToDatabase } from "./database";

dotenv.config();

const { ATLAS_URI, PORT, FRONTEND_URL } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in .env"
  );
  process.exit(1);
}

const port = PORT ? parseInt(PORT) : 5200;

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();

    app.use(cors({
      origin: FRONTEND_URL || '*'  
    }));


    app.use(express.json());

    app.use("/medien", mediumRouter);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}...`);
    });
  })
  .catch((error) => console.error(error));
