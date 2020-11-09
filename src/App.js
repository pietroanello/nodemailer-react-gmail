import React, { useState, useContext } from "react"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import UserContext from "./context/UserContext"

function App() {
    const [isLogged, setIsLogged] = useState(false)
    const [isSigned, setIsSigned] = useState(false)
    const { firstName, lastName } = useContext(UserContext)

    return (
        <>
            <header>
                <h1>Welcome!</h1>
                {isLogged ? (
                    <p>Welcome {firstName + lastName}</p>
                ) : (
                    <p>
                        Sign Up for access or Sing In if you already have an
                        account!
                    </p>
                )}
            </header>
            {isLogged ? "" : isSigned ? <SignIn /> : <SignUp />}
        </>
    )
}

export default App
