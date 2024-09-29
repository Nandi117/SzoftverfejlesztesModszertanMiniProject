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
const ALLOW_KNOW_ORIGIN = process.env.ALLOW_KNOWN_ORIGIN;

// Database connection
db.init().catch((error)=>{
    console.error(`Unable to connect to the database: (${error})`);
});

// Enable CORS
app.use(cors({
    origin:ALLOW_KNOW_ORIGIN,
    credentials:true
}))

// Enable request body parser
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use("/api", apiRouter);


// Web application runner
app.listen(PORT, () => {
    console.log(MONGO_URI)
    console.log(`Server is running at http://localhost:${PORT}`);
});
