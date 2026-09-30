import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/product.js";
import {connectDB} from "./utils/DB.js";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();
app.use(express.json());

const defaultAllowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://frontmvcarchitecture.vercel.app",
];
const configuredOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
    : [];
const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])];
app.use(cors({ origin: allowedOrigins, credentials: true }));



app.use("/products", productRouter);

const PORT = process.env.PORT || 5050;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

