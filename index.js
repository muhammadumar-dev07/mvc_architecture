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

const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : ["http://localhost:5173"];
console.log("CORS allowed origins:", allowedOrigins);
app.use((req, res, next) => {
    console.log("Request origin:", req.headers.origin);
    next();
});
app.use(cors({ origin: allowedOrigins, credentials: true }));



app.use("/products", productRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

connectDB();

