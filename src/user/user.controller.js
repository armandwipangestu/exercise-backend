import express from "express";
import { getAllUsers, getUserById } from "./user.service.js";

const router = express.Router();

router.get("/users", async (req, res) => {
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

router.get("/users/:uid", async (req, res) => {
    try {
        const userUid = req.params.uid;
        const user = await getUserById(userUid);

        res.status(200).send({
            data: user,
            message: "Get User by UID",
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
});

export default router;
