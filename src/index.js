import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { UserContextProvider } from "./context/UserContext"
import { SnackbarProvider } from "notistack"

ReactDOM.render(
    <SnackbarProvider
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
    >
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </SnackbarProvider>,
    document.getElementById("root")
)
