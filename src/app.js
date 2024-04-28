import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

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

app.use(`${process.env.API_VERSION}`, router);

app.listen(5000, () => {
    console.log(`Server running on port http://localhost:5000`);
});

export default app;
