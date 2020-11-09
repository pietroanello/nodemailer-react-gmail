import express from "express"
import dotenv from "dotenv"
import authRouter from "./api/auth.js"
import { handleError } from "./error.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use("/api/auth", authRouter)

app.use(express.static("../build"))

app.use((err, req, res, next) => {
    handleError(err, res)
})

app.listen(PORT, () => {
    console.log(`listening on port *:${PORT}`)
})
