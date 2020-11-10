import React, { useContext } from "react"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { UserContext } from "./context/UserContext"
import Main from "./components/Main"

function App() {
    const { userInfo, isLogged, isSigned } = useContext(UserContext)

    return (
        <>
            <header className='title'>
                {isLogged ? (
                    <>
                        <h1>
                            Welcome{" "}
                            {`${userInfo.firstName} ${userInfo.lastName}`}
                        </h1>
                    </>
                ) : (
                    <>
                        <h1>Welcome!</h1>
                        <h3>
                            Sign Up for access or Sing In if you already have an
                            account!
                        </h3>
                    </>
                )}
            </header>
            {isLogged ? <Main /> : isSigned ? <SignIn /> : <SignUp />}
            <p className='credits'>
                For the love of learning
                <span>
                    <a
                        href='https://github.com/pietroanello/nodemailer-react-gmail'
                        target='_blank'
                    >
                        <img src='github-logo-small.svg' alt='github logo' />
                    </a>
                </span>
            </p>
        </>
    )
}

export default App
