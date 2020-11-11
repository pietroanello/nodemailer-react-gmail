import { Button } from "@material-ui/core"
import React from "react"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import useRegisterLogin from "../hooks/useRegisterLogin"
import * as animationData from "../animations/anim.json"
import Lottie from "react-lottie"

export default function Main() {
    const { signOut, deleteUser } = useRegisterLogin()

    const defaultOptions = {
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    }

    return (
        <main style={{ textAlign: "center" }}>
            <Button
                onClick={signOut}
                variant='contained'
                color='secondary'
                startIcon={<ExitToAppIcon />}
                style={{ marginBottom: "2rem" }}
            >
                Logout
            </Button>
            <br />
            <Button
                onClick={deleteUser}
                variant='contained'
                color='secondary'
                startIcon={<HighlightOffIcon />}
            >
                Delete Account
            </Button>
            <Lottie
                style={{
                    position: "absolute",
                    bottom: "0px",
                    left: "0px",
                    zIndex: "-1",
                }}
                options={defaultOptions}
                width={"100%"}
                isStopped={false}
                isPaused={false}
                isClickToPauseDisabled={true}
            />
        </main>
    )
}
