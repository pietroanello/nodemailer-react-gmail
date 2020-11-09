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
        fetch("/api/auth/prova")
            .then(res => res.json())
            .then(data => console.log(data))
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
