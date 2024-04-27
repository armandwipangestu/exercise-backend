import {
    createUser,
    deleteUserById,
    editUserById,
    getAllUsers,
    getAllUsersByRole,
    getUserByEmail,
    getUserById,
} from "./user.service.js";
import { z, string, object, enum as enum_ } from "zod";
import bcrypt from "bcrypt";

const userSchema = object({
    email: string().email(),
    name: string().min(4, "Name must contain at least 4 character(s)"),
    role: enum_(["USER", "ADMIN"]).optional(),
    password: string(),
});

const editUserSchema = object({
    email: string().email().optional(),
    name: string()
        .min(4, "Name must contain at least 4 character(s)")
        .optional(),
    role: enum_(["USER", "ADMIN"]).optional(),
    password: string().optional(),
});

export const getAllUsersHandler = async (req, res) => {
    try {
        const { role } = req.query;

        let users;
        if (role) {
            users = await getAllUsersByRole(role);
        } else {
            users = await getAllUsers();
        }

        res.status(200).send({
            data: users,
            message: "Get Users",
            success: true,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

export const getUserByIdHandler = async (req, res) => {
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
};

export const createUserHandler = async (req, res) => {
    try {
        const validateData = userSchema.parse(req.body);

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(validateData.password, salt);

        validateData.password = hashPassword;

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
};

export const editUserByIdHandler = async (req, res) => {
    try {
        const { uid } = req.params;
        const validateData = editUserSchema.parse(req.body);

        if (validateData.password) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(validateData.password, salt);

            validateData.password = hashPassword;
        }

        const userData = await editUserById(uid, validateData);

        res.status(200).send({
            data: userData,
            message: "User edited",
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
};

export const deleteUserByIdHandler = async (req, res) => {
    try {
        const { uid } = req.params;
        await deleteUserById(uid);

        res.status(200).send({
            message: "User Deleted",
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};
