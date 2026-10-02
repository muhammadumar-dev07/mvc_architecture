import express from 'express';
import {createUser, loginUser} from '../controller/userController.js';

const router = express.Router();

router.post("/login", loginUser);
router.post("/createuser", createUser);

export default router;