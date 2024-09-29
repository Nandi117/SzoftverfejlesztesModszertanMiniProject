
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const MONGODB_URI:string = process.env.MONGODB_URI || "";


export const db = {

    init: async () =>{
        console.log(`Trying to connect to MongoDB: (${MONGODB_URI})...`);
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully");
    }

}

