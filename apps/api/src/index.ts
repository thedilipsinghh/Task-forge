import express from "express"
import cors from "cors"
import authRouts from './routes/auth.routes'
import adminRouts from './routes/admin.routes'
import empRouts from './routes/employe.routes'
import { FRONTEND_URL } from "./config/env"
import cookieParser from "cookie-parser"
import { adminProtect, EmployeeProtect } from "./middlewares/auth.middlewares"
const app = express()

app.use(cookieParser())

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))
app.use(express.json())

app.use("/api/auth", authRouts)
app.use("/api/admin", adminProtect, adminRouts)
app.use("/api/employee", EmployeeProtect, empRouts)

app.get("/", (req, res) => {
    res.json({ message: "API running successfully" })
})
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})