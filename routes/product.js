import express from "express";
import{
    deleteProductController,
    getProductsController,
    saveProductController,
    updateProductController
} from "../controller/product.js";

const productRouter = express.Router();


productRouter.get("/", getProductsController);
productRouter.post("/", saveProductController);
productRouter.put("/:id", updateProductController);
productRouter.delete("/:id", deleteProductController);

export default productRouter;