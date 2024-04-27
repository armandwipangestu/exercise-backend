import { getUserByEmail } from "../service/user.service.js";
import { z, string, object } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { updateRefreshTokenUser } from "../repository/user.repository.js";

const userSchema = object({
    email: string().email(),
    password: string(),
});

export const loginHandler = async (req, res) => {
    try {
        const validateData = userSchema.parse(req.body);

        const user = await getUserByEmail(validateData.email);

        const match = await bcrypt.compare(
            validateData.password,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                message: "Wrong password",
                success: false,
            });
        }

        const { id, name, email } = user;

        const accessToken = jwt.sign(
            {
                id,
                name,
                email,
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15s",
            }
        );

        const refreshToken = jwt.sign(
            {
                id,
                name,
                email,
            },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );

        await updateRefreshTokenUser(user.uid, refreshToken);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // miliseconds
            // secure: true // this is for HTTPS
        });

        res.json({ accessToken });
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
            res.status(404).json({
                message: error.message,
                success: false,
            });
        }
    }
};
