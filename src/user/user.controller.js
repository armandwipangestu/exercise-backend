import express from "express";
import { getAllUsers } from "./user.service.js";

const router = express.Router();

router.get("/user", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).send({
            data: users,
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
