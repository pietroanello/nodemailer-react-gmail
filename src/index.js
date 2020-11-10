import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { UserContextProvider } from "./context/UserContext"
import { SnackbarProvider } from "notistack"
import "./index.css"

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
