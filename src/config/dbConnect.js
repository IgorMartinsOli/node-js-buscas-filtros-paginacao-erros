import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_DB_ATLAS_URL);

let db = mongoose.connection;

export default db;