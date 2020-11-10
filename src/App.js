import React, { useContext } from "react"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { UserContext } from "./context/UserContext"
import useRegisterLogin from "./hooks/useRegisterLogin"

function App() {
    const { userInfo, isLogged, isSigned } = useContext(UserContext)
    const { signOut } = useRegisterLogin()

    return (
        <>
            <header>
                {isLogged ? (
                    <>
                        <h1>
                            Welcome{" "}
                            {`${userInfo.firstName} ${userInfo.lastName}`}
                        </h1>
                        <button onClick={signOut}>Logout</button>
                    </>
                ) : (
                    <>
                        <h1>Welcome!</h1>
                        <p>
                            Sign Up for access or Sing In if you already have an
                            account!
                        </p>
                    </>
                )}
            </header>
            {isLogged ? "" : isSigned ? <SignIn /> : <SignUp />}
        </>
    )
}

export default App
