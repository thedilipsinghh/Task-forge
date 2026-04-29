import { eq } from "drizzle-orm"
import db from "../config/db"
import { convo, task } from "../models"
import { Request, Response } from "express"

export const fetchTaskEmp = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user
        const result = await db.select().from(task).where(eq(task.userId, user))
        res.status(200).json({ message: "task fetch success", result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to fetch task" })
    }
}
export const convoSendlogic = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user
        console.log(user, req.body)

        const { taskID, userId, msg } = req.body
        await db.insert(convo).values({ taskId: taskID, userId: user as number, msg })
        res.status(200).json({ message: " Convo Send success", })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to send Convo" })
    }
}
export const convoFetchlogic = async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(convo)
        res.status(200).json({ message: " Convo Send success", result })
        console.log(result, "result")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to send Convo" })
    }
}