import express from "express"
import type { Request, Response, Express } from "express";
import indexRouter from "./routes/index.js"
import swaggerSpec from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors"

export default function createApp(): Express {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended:true }));

    app.use(cors());
    
    // json res
    app.get(["/docs-json", "/api-docs-json"],(req:Request, res:Response)=>{
        res.setHeader("Content-Type","application/json");
        res.send(swaggerSpec)
    })

    // docs expose
    app.use(["/docs","/api-docs"],
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
            explorer: true,
            customSiteTitle: "Practice Open Spec"
        })
    )

    app.use("/", indexRouter);
    
    return app;
}
