import jwt from "jsonwebtoken";
import { getUserByRefreshToken } from "../service/user.service.js";

export const refreshTokenHandler = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({
                status: "fail",
                message:
                    "Unauthorized. Please provide `refreshToken` on cookies before request",
            });
        }

        const user = await getUserByRefreshToken(refreshToken);

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        status: "fail",
                        message:
                            "Forbidden. Can't find who the owner `refreshToken`",
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

                res.status(200).send({
                    status: "success",
                    message: "Refresh Token successfully",
                    data: {
                        accessToken,
                    },
                });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "fail",
            message: error.message,
        });
    }
};
