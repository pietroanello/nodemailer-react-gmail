import { Button } from "@material-ui/core"
import React from "react"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import useRegisterLogin from "../hooks/useRegisterLogin"

export default function Main() {
    const { signOut } = useRegisterLogin()
    return (
        <>
            <Button
                onClick={signOut}
                variant='contained'
                color='secondary'
                startIcon={<ExitToAppIcon />}
            >
                Logout
            </Button>
        </>
    )
}
