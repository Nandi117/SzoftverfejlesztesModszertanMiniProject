
import express from "express";
import dotenv from 'dotenv';
import apiRouter from "./apiRouter";
import {db} from "./config/db.config";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from './controllers/authController';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;


db.init().catch((error)=>{
    console.error(`Unable to connect to the database: (${error})`);
});

/*CORS engedélyezése */
app.use(cors())


app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use("/api", apiRouter);



app.listen(PORT, () => {
    console.log(MONGO_URI)
    console.log(`Server is running at http://localhost:${PORT}`);
});
