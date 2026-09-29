import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const PORT= 5050;

app.listen(PORT,()=>{
    console.log("Server running on port 5050");
})

