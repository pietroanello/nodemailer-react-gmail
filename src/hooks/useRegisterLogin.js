import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useSnackbar } from "notistack"

export default function useRegisterLogin() {
    const { enqueueSnackbar } = useSnackbar()
    const { setUserInfo, setIsSigned, setIsLogged } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
        try {
            const response = await fetch("/api/auth/signup", options)
            const data = await response.json()
            if (response.status === 200) {
                setIsLoading(false)
                enqueueSnackbar(data, { variant: "success" })
            } else {
                setIsLoading(false)
                enqueueSnackbar(data.message, { variant: "error" })
            }
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" })
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
                enqueueSnackbar(data.message, { variant: "error" })
            }
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" })
        }
    }

    async function deleteUser(e) {
        e.preventDefault()
        const token = localStorage.getItem("AuthToken")
        const headers = {
            Authorization: "Bearer " + token,
        }
        const delOptions = {
            method: "DELETE",
            headers: headers,
        }
        try {
            const response = await fetch("/api/auth/delete", delOptions)
            const data = await response.json()
            if (response.status === 200) {
                signOut(e)
                enqueueSnackbar(data, { variant: "success" })
            } else {
                enqueueSnackbar(data.message, { variant: "error" })
            }
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" })
        }
    }

    return {
        userData,
        handleChange,
        signUp,
        signIn,
        signOut,
        deleteUser,
        isLoading,
    }
}
