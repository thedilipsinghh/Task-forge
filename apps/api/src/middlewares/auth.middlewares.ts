import { NextFunction, Request, Response } from "express";
import { JWT_KEY } from "../config/env";
import jwt from "jsonwebtoken"
import db from "../config/db";
import { user } from "../models";
import { eq } from "drizzle-orm";

export const adminProtect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.USER
    if (!token) {
        return res.status(401).json({ message: "un authoized access" })
    }
    jwt.verify(token, JWT_KEY, (err: any, decode: any) => {
        if (err) {
            return res.status(401).json({ messag: "invalid token" })
        }
        //    const [result] =  await db.select().from(user).where(eq(user.id, decode.id))
        (req as any).user = decode.id
        console.log(decode.id)
        next()
    })
}
export const EmployeeProtect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.EMPLOYEE
    if (!token) {
        return res.status(401).json({ message: "un authoized access" })
    }
    jwt.verify(token, JWT_KEY, (err: any, decode: any) => {
        if (err) {
            return res.status(401).json({ messag: "invalid token" })
        }
        (req as any).user = decode.id
        console.log(decode.id)
        next()
    })
}