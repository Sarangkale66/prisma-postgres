import express from "express";
import type { Request, Response } from "express";
import { type User } from "../generated/prisma/client.js";
import prisma from "../config/db.js";

const router = express.Router();

/**
 * @openapi
 * /signup:
 *   post:
 *     operationId: signupUser
 *     summary: Register a new user
 *     description: Create a new user account using name, email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [status, message]
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: user created successfully
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Validation error or duplicate email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [status, message]
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: email already exist's
 */
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

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: user login successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: unauthorized
 */
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

/**
 * @openapi
 * /me/{id}:
 *   get:
 *     summary: Fetch a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user fetched successfully
 *                 user:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: User ID missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: user id required
 */
router.get("/me/:id", async(req: Request, res: Response)=>{
    const { id } = req.params as unknown as Pick<User,"id">;

    if(!id) {
        return res.json({
            status: false,
            message: "user id required"
        });
    }

    const result = await prisma.user.findFirst({
        where: {
            id: Number(id)
        }
    })
    
    res.json({
        message: "user fetched successfully",
        user: result
    })
});

export default router;