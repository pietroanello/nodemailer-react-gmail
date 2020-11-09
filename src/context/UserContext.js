import React, { useState, useEffect } from "react"

const UserContext = React.createContext()

function UserContextProvider(props) {
    const [userInfo, setUserInfo] = useState({
        firstName: null,
        lastName: null,
    })

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext }
