import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT_REQUEST, LOGOUT_RESPONSE, ME_REQUEST, ME_RESPONSE } from "@repo/types";
import { Request, Response } from "express";
import db from "../config/db";
import { user } from "../models";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import { JWT_KEY, NODE_ENV, PRODUCTION } from "../config/env";

export const login = async (req: Request<{}, {}, LOGIN_REQUEST>, res: Response<LOGIN_RESPONSE>) => {
    try {
        const { email, password } = req.body
        const [result] = await db.select().from(user).where(eq(user.email, email))
        if (!result) {
            return res.status(401).json({ message: "invalid credentials" })
        }

        const verify = await bcryptjs.compare(password, result.password)

        if (!verify) {
            return res.status(401).json({ message: "invalid credentials" })
        }

        if (!result.isActive) {
            return res.status(401).json({ message: "account blocked by admin" })
        }

        // THIS LOGIC WILL CHANGE IN FUTURE
        // const token = jwt.sign({ id: result.id }, JWT_KEY, { expiresIn: "1d" })
        // res.cookie("USER", token, {
        //     httpOnly: true,
        //     maxAge: 1000 * 60 * 60 * 24,
        //     secure: NODE_ENV === PRODUCTION
        // })
        const token = jwt.sign({ id: result.id }, JWT_KEY, { expiresIn: "1d" })
        if (result.role === "admin") {
            res.cookie("USER", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === PRODUCTION,
                maxAge: 1000 * 60 * 60 * 24
            })
        } else {
            res.cookie("EMPLOYEE", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === PRODUCTION,
                maxAge: 1000 * 60 * 60 * 24
            })
        }
        res.status(200).json({
            message: "login success", result: {
                id: result.id,
                email: result.email,
                mobile: result.mobile,
                name: result.name,
                role: result.role
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to login server error" })
    }
}

export const logout = (req: Request<{}, {}, LOGOUT_REQUEST>, res: Response<LOGOUT_RESPONSE>) => {
    try {
        res.clearCookie("USER")
        res.status(200).json({ message: "logout success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to logout server error" })
    }
}

