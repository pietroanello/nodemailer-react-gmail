import React, { useState, useEffect } from "react"

const UserContext = React.createContext()

function UserContextProvider(props) {
    const [isLogged, setIsLogged] = useState(false)
    const [isSigned, setIsSigned] = useState(false)
    const [userInfo, setUserInfo] = useState({
        firstName: null,
        lastName: null,
    })

    useEffect(() => {
        const token = localStorage.getItem("AuthToken")
        const options = {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        }
        async function getToken() {
            if (token) {
                try {
                    const response = await fetch("api/auth/", options)
                    const data = await response.json()
                    if (response.status === 200) {
                        setIsLogged(true)
                        setUserInfo(prev => ({
                            ...prev,
                            firstName: data.firstName,
                            lastName: data.lastName,
                        }))
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }
        getToken()
    }, [])

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                isLogged,
                setIsLogged,
                isSigned,
                setIsSigned,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext }
