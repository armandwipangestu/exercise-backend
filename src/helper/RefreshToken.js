import jwt from "jsonwebtoken";
import { getUserByRefreshToken } from "../user/user.service.js";

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.sendStatus(401);
        }

        const user = await getUserByRefreshToken(refreshToken);

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
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

                res.json({ accessToken });
            }
        );
    } catch (error) {
        console.log(error);
    }
};
