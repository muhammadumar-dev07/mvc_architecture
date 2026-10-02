import Product from "../model/Product.js";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../utils/jwt.js";

const getVerifiedToken = (token) => {
  try {
    return verifyJWT(token);
  } catch (error) {
    if (process.env.JWT_SECRET && error instanceof jwt.JsonWebTokenError) {
      return null;
    }
    throw error;
  }
};

// Get all products:
const getProductsController = async (req, res) => {
  try {
    // Check for JWT token in query parameters
    const token = req.query.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    // Verify the JWT token
    const decoded = getVerifiedToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Fetch products from the database
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Save a new product:
const saveProductController = async (req, res) => {
  try {
    const {token} = req.body;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decoded = getVerifiedToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    const newProductFields = req.body;
    const newProduct = new Product(newProductFields);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error saving product" });
  }
};

// Update an existing product:
const updateProductController = async (req, res) => {
  try {
    const {token} = req.body;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decoded = getVerifiedToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    const { id } = req.params;
    const updatedProductFields = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductFields,
      { new: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete a product:
const deleteProductController = async (req, res) => {
  try {
    const {token} = req.query;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decoded = getVerifiedToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

export {
  getProductsController,
  saveProductController,
  updateProductController,
  deleteProductController,
};
