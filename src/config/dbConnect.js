import mongoose from "mongoose"
require('dotenv').config()

mongoose.connect(process.env.MONGO_DB_ATLAS_URL);

let db = mongoose.connection;

export default db;