import express from "express";
import { refreshTokenHandler } from "../controller/refreshToken.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import {
    createUserHandler,
    deleteUserByIdHandler,
    editUserByIdHandler,
    getAllUsersHandler,
    getUserByIdHandler,
} from "../controller/user.controller.js";
import { getAllPostsHandler } from "../controller/post.controller.js";
import { getAllCategoriesHandler } from "../controller/category.controller.js";
import { loginHandler } from "../controller/login.controller.js";

const router = express.Router();

router.get("/users", verifyToken, getAllUsersHandler);
router.get("/users/:uid", verifyToken, getUserByIdHandler);
router.post("/users", createUserHandler);
router.put("/users/:uid", verifyToken, editUserByIdHandler);
router.delete("/users/:uid", verifyToken, deleteUserByIdHandler);

router.get("/posts", getAllPostsHandler);

router.get("/categorys", getAllCategoriesHandler);

router.post("/login", loginHandler);

router.get(`/token`, refreshTokenHandler);

export default router;
