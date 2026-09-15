import express from "express";
import type { Request, Response } from "express";
import { type User } from "../generated/prisma/client.js";
import prisma from "../config/db.js";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response)=>{
    const { name, email, password } = req.body as User;
    if(!name || !email || !password) {
        return res.json({
            status: false,
            message: "name, email, password is required"
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if(user) {
        return res.json({
            status: false,
            message: "email already exist's"
        });
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });

    res.json({
        status: true,
        message: "user created successfully",
        user: newUser
    });
})

router.post("/login", async(req: Request, res: Response)=>{
    const { email, password } = req.body as User;
    if(!email || !password) {
        return res.json({
            status: false,
            message: "email, password is required"
        })
    }
    // SELECT * FROM User WHERE email="sarangkale66@gmail.com"
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if(user && user.password !== password) {
        return res.json({
            message: "unauthorized",
            status: false
        });
    }

    // jwt token
    // cookie set  kardo

    res.json({
        message: "user login successfully",
        status: true
    })

});

router.get("/me/:id", async(req: Request, res: Response)=>{
    const { id } = req.params as unknown as Pick<User,"id">;

    if(!id) {
        return res.json({
            status: false,
            message: "user id required"
        });
    }

    const result = await prisma.$queryRaw`SELECT * FROM "User" WHERE id=${id}`;
    
    res.json({
        message: "user fetched successfully",
        user: result
    })
});

export default router;