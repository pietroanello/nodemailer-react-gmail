import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function useRegisterLogin() {
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

    async function signUp(e) {
        e.preventDefault()
        try {
            const response = await fetch("/api/auth/signup", options)
            const data = await response.json()
            // Inserire snackbar(notistack) di mail inviata per la verifica
            response.status === 200 && setIsSigned(true)
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

    return { userData, handleChange, signUp, signIn }
}
