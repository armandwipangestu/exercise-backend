import express from "express";
import {
    createUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
} from "./user.service.js";
import { z, string, object, enum as enum_ } from "zod";

const router = express.Router();

const userSchema = object({
    email: string().email(),
    name: string().min(4, "Name must contain at least 4 character(s)"),
    role: enum_(["USER", "ADMIN"]).optional(),
});

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

router.post("/users", async (req, res) => {
    try {
        const validateData = userSchema.parse(req.body);
        const newUserData = await createUser(validateData);

        res.status(201).send({
            data: newUserData,
            message: "User created successfully",
            success: true,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map((err) => {
                return {
                    field: err.path.join("."),
                    message: err.message,
                };
            });

            res.status(400).json({
                message: "Validation error",
                errors: errorMessage,
                success: false,
            });
        } else {
            console.log(error);
            res.status(400).json({
                message: error.message,
                success: false,
            });
        }
    }
});

export default router;
