import express from "express";
import { getAllPosts } from "./post.service.js";

const router = express.Router();

router.get("/posts", async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.status(200).send({
            data: posts,
            message: "Get Posts",
            success: true,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
});

export default router;
