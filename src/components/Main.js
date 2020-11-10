import { Button } from "@material-ui/core"
import React from "react"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import useRegisterLogin from "../hooks/useRegisterLogin"
import * as animationData from "../animations/anim.json"
import Lottie from "react-lottie"

export default function Main() {
    const { signOut } = useRegisterLogin()

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
        <main>
            <Button
                onClick={signOut}
                variant='contained'
                color='secondary'
                startIcon={<ExitToAppIcon />}
            >
                Logout
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
