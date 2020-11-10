import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useSnackbar } from "notistack"

export default function useRegisterLogin() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const { setUserInfo, setIsSigned, setIsLogged } = useContext(UserContext)
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    }

    function handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    function signOut(e) {
        e.preventDefault()
        localStorage.removeItem("AuthToken")
        setIsLogged(false)
    }

    async function signUp(e) {
        e.preventDefault()
        try {
            const response = await fetch("/api/auth/signup", options)
            const data = await response.json()
            response.status === 200 &&
                enqueueSnackbar(data, { variant: "success" })
        } catch (err) {
            console.error(err)
        }
    }

    async function signIn(e) {
        e.preventDefault()
        try {
            const response = await fetch("/api/auth/signin", options)
            const data = await response.json()
            if (response.status === 200) {
                const { options, token } = data
                localStorage.setItem("AuthToken", token)
                setUserInfo(prev => ({
                    ...prev,
                    firstName: options.firstName,
                    lastName: options.lastName,
                }))
                setIsLogged(true)
            } else {
                console.log(data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return { userData, handleChange, signUp, signIn, signOut }
}
