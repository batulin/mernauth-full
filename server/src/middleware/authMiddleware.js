import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import {User} from "../models/models.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findOne({where: {id: decoded.userId}});
            next();
        } catch (e) {
            throw new Error('Пользователь не авторизован. Токен не свеж');
        }

    } else {
        res.status(401);
        throw new Error('Пользователь не авторизован. Токена нет');
    }
})

export {protect};