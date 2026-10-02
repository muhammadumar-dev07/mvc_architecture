import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const dropStaleIndex = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not configured");
    }

    await mongoose.connect(process.env.MONGO_URI);
    const users = mongoose.connection.collection("users");

    try {
      const result = await users.dropIndex("email_1");
      console.log("Dropped stale email_1 index:", result);
    } catch (error) {
      if (error.code === 27 || error.codeName === "IndexNotFound") {
        console.log("Stale email_1 index does not exist; nothing to drop.");
      } else {
        throw error;
      }
    }

    const indexes = await users.indexes();
    console.log("Current users collection indexes:", indexes);
  } catch (error) {
    console.error("Failed to remove or inspect the stale users index:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

await dropStaleIndex();
