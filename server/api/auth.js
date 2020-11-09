import express from "express"

const authRouter = express.Router()

authRouter.get("/prova", (req, res) => {
    res.json("AuthRouter connected!")
})

export default authRouter
