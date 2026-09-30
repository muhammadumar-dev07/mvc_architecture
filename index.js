import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/product.js";
import {connectDB} from "./utils/DB.js";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();


connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", productRouter);

const PORT= 5050;

app.listen(PORT,()=>{
    console.log("Server running on port 5050");
})

