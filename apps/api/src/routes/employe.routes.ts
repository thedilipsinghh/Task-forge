import { Router } from "express"
import { convoFetchlogic, convoSendlogic, fetchTaskEmp } from "../controllers/employee.controller"
import { EmployeeProtect } from "../middlewares/auth.middlewares"
const router = Router()

router
    .get("/fetchTaskEmp", EmployeeProtect, fetchTaskEmp)
    .post("/convoSend", EmployeeProtect, convoSendlogic)
    .get("/convoFetch", EmployeeProtect, convoFetchlogic)

export default router