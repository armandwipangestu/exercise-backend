import express from "express";
import { refreshToken } from "./helper/RefreshToken.js";

const router = express.Router();

router.get(`/token`, refreshToken);

export default router;
