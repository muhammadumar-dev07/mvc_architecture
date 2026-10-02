import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/DB.js";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();
app.use(express.json());

const configuredOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [];
const allowedOrigins = [...new Set(configuredOrigins)];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/products", productRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT is not configured");
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
