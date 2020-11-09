import express from "express"
import dotenv from "dotenv"
import authRouter from "./api/auth.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use("/api/auth", authRouter)

app.use(express.static("../build"))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`listening on port *:${PORT}`)
})
