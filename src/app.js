import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import postController from "./post/post.controller.js";
import categoryController from "./category/category.controller.js";
import loginController from "./login/login.controller.js";
import router from "./routes/api.js";

const app = express();

dotenv.config();

app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);
app.use(cookieParser());
app.use(express.json());

app.use(`${process.env.API_VERSION}`, postController);
app.use(`${process.env.API_VERSION}`, categoryController);
app.use(`${process.env.API_VERSION}`, loginController);
app.use(`${process.env.API_VERSION}`, router);

app.listen(5000, () => {
    console.log(`Server running on port http://localhost:5000`);
});
