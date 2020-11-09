import express from "express"
import NedbAsyncStore from "nedb-async-store"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { ErrorHandler } from "../error.js"
import jwt from "jsonwebtoken"

dotenv.config()
const authRouter = express.Router()
const jwt_key = process.env.JWT_KEY
const usersDb = new NedbAsyncStore({
    filename: "./collections/users.db",
    autoload: true,
})

authRouter.post("/signin", async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await usersDb.findOne({ email: email })
        if (!user) {
            let err = new ErrorHandler(404, "Utente non registrato.")
            next(err)
        } else if (!user.isVerified) {
            let err = new ErrorHandler(403, "Utente non verificato.")
            next(err)
        } else {
            const isRightPass = await bcrypt.compare(password, user.password)
            if (!isRightPass) {
                let err = new ErrorHandler(401, "Password errata.")
                next(err)
            } else {
                const options = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                }
                const token = await jwt.sign(options, jwt_key, {
                    expiresIn: "1d",
                })
                res.status(200).json({ options, token })
            }
        }
    } catch (err) {
        next(err)
    }
})

authRouter.post("/signup", async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body
    try {
        const hashedPass = await bcrypt.hash(password, 10)
        const user = await usersDb.findOne({ email: email })
        if (user) {
            let err = new ErrorHandler(409, "Utente già esistente.")
            next(err)
        } else {
            const newUser = await usersDb.insert({
                firstName: firstName,
                lastName: lastName,
                password: hashedPass,
                email: email,
                isVerified: true,
            })
            // Manda email per verifica utente
            res.status(200).json(newUser)
        }
    } catch (err) {
        next(err)
    }
})

authRouter.get("/", async (req, res, next) => {
    const header = req.header("Authorization")
    if (!header) {
        next()
    } else {
        const [type, token] = header.split(" ")
        if (type === "Bearer" && typeof token !== "undefined") {
            try {
                let payload = await jwt.verify(token, jwt_key)
                res.status(200).json({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                })
            } catch (err) {
                next(err)
            }
        }
    }
})

export default authRouter
