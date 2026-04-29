import { Router } from "express"
import { createTask, deleteEmployee, deleteTaskDetails, fetchTask, me, readEmployee, registerEmployee, restoreEmployee, updateEmployee, updateProfile, updateTask, updateTaskDetails } from "../controllers/admin.controllers"
import { taskImageUpload } from "../utils/upload"
const router = Router()

router
    .put("/update-profile/:id", updateProfile)
    .get("/me", me)

    .post("/employee-register", registerEmployee)
    .get("/employee", readEmployee)

    .delete("/employee-delete/:eid", deleteEmployee)
    .post("/employee-restore/:eid", restoreEmployee)
    .put("/employee-update/:eid", updateEmployee)

    .post("/task-create", createTask)
    .get("/task-read", fetchTask)
    .post("/task-update", updateTask)


    .put("/task-detail-update/:eid", taskImageUpload, updateTaskDetails)
    .delete("/task-detail-delete/:eid", deleteTaskDetails)

export default router