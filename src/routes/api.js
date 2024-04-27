import express from "express";
import { refreshToken } from "../helper/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
    createUserHandler,
    deleteUserByIdHandler,
    editUserByIdHandler,
    getAllUsersHandler,
    getUserByIdHandler,
} from "../user/user.controller.js";

const router = express.Router();

router.get("/users", verifyToken, getAllUsersHandler);
router.get("/users/:uid", verifyToken, getUserByIdHandler);
router.post("/users", createUserHandler);
router.put("/users/:uid", verifyToken, editUserByIdHandler);
router.delete("/users/:uid", verifyToken, deleteUserByIdHandler);

router.get(`/token`, refreshToken);

export default router;