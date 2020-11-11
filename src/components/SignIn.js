import React, { useContext } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import useRegisterLogin from "../hooks/useRegisterLogin"
import { UserContext } from "../context/UserContext"

const useStyles = makeStyles(theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "flex-start",
        padding: "1.5rem",
        backgroundColor: "white",
        borderRadius: "4px",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(0),
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function SignIn() {
    const { setIsSigned } = useContext(UserContext)
    const { userData, handleChange, signIn } = useRegisterLogin()
    const classes = useStyles()

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={signIn}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify='flex-end'>
                        {/* <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link
                                variant='body2'
                                onClick={() => setIsSigned(false)}
                            >
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
