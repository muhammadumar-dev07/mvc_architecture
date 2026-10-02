import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signJWT = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    return token;
  } catch (error) {
    console.error("Error signing JWT:", error);
    throw new Error("Error signing JWT");
  }
};

export const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    throw error;
  }
};

