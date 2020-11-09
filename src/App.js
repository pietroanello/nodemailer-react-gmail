import React, { useState, useContext } from "react"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { UserContext } from "./context/UserContext"

function App() {
    const [isLogged, setIsLogged] = useState(false)
    const [isSigned, setIsSigned] = useState(false)
    const { userInfo } = useContext(UserContext)

    return (
        <>
            <header>
                <h1>Welcome!</h1>
                {isLogged ? (
                    <p>Welcome {userInfo.firstName + userInfo.lastName}</p>
                ) : (
                    <p>
                        Sign Up for access or Sing In if you already have an
                        account!
                    </p>
                )}
            </header>
        </>
    )
}

export default App
