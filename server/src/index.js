import express from "express";
import dotenv from "dotenv/config.js";
import userRoute from "./routes/userRoute.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";
import sequelize from './db.js';
import {User, RefreshToken} from './models/models.js';
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/users", userRoute);

app.use(notFound);
app.use(errorHandler);


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log(`Server started on PORT = ${port}`))
    } catch (e) {
        console.log(e);
    }
}

start()
