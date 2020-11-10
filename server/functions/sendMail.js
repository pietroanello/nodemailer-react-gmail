import { createRequire } from "module"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

const require = createRequire(import.meta.url)
const { google } = require("googleapis")

dotenv.config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI
const refreshToken = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
oAuth2Client.setCredentials({ refresh_token: refreshToken })

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "pietroanello.dev@gmail.com",
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
    },
})

transporter.set("oauth2_provision_cb", async (user, renew, callback) => {
    let accessToken = await oAuth2Client.getAccessToken()
    if (!accessToken) {
        return callback(new Error("Unknown user"))
    } else {
        return callback(null, accessToken)
    }
})

async function sendMail(mailOptions) {
    try {
        const result = await transporter.sendMail(mailOptions)
        return result
    } catch (err) {
        return err
    }
}

export default sendMail
