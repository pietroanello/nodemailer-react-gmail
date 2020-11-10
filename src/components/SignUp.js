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
    miniTitle: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(2),
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function SignUp() {
    const { setIsSigned } = useContext(UserContext)
    const { userData, handleChange, signUp } = useRegisterLogin()
    const classes = useStyles()

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={signUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='fname'
                                name='firstName'
                                variant='outlined'
                                required
                                fullWidth
                                id='firstName'
                                label='First Name'
                                autoFocus
                                value={userData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                name='lastName'
                                autoComplete='lname'
                                value={userData.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
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
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link
                                href='#'
                                variant='body2'
                                onClick={() => setIsSigned(true)}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
