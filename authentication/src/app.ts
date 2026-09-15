import express, { type Express } from "express"
import indexRouter from "./routes/index.js"

export default function createApp(): Express {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended:true }));

    app.use("/", indexRouter);

    return app;
}