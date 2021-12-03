import { useState } from "react"
import firebase from "firebase/app"
import { useAuth, AuthCheck } from "reactfire";
import { Input } from "../sharedComponents/Input/Input";
import {Container, Button, makeStyles, Typography, Snackbar} from '@material-ui/core'
import { RouteComponentProps, withRouter } from "react-router-dom";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Bar } from '..';
import {Link} from 'react-router-dom'

const Alert = (props:AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles({
    googleButton:{
        backgroundColor: 'rgb(15 157 88)',
        marginTop: '1em',
        marginLeft: '10em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'flex'
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif;',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle: {
        marginTop: '2em',
        marginBottom: '2em',
        fontFamily: 'Roboto, arial, sans-serif;',
    },
    snackBar: {
        color: 'white',
    },
    subStyle:{
        marginTop:"1em",
        marginLeft:'17em',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',

    },
    buttonStyle:{
        left:'12rem',
        marginTop:'1em',
        
        

    }

})








interface SignInProps{
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}






export const SignIn = withRouter( (props:SignInProps) => {

    const auth = useAuth();
    const classes = useStyles();
    const { history } = props
    const [open, setOpen] = useState(false);

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClose = (event?: React.SyntheticEvent, reason?:string) => {
        if(reason === 'clickaway'){
            return;
        }

        setOpen(false)
        history.push('/')
    }

    const sign_in = async () => {
    const response = await auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
        if(response.user){
            handleSnackOpen()
        }
    };

    const sign_out = async () => {
        await auth.signOut();
        history.push('/')

    }

    return (
        <div>
            <Bar>
        <div >
                    <h1 >
                        <a href="#" >Brand</a>
                    </h1>
                    <ul >
                        <li>
                            <Link to='/' href="" >Home</Link>
                        </li>
                        <AuthCheck fallback={
                            <li>
                                <Link to="/signin" >Sign In</Link>
                            </li>
                        }>
                        
                        <li>
                            <Link to="/dashboard" >Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/signin" >Sign Out</Link>
                        </li>
                        </AuthCheck>
                    </ul>
                </div>

        
        </Bar>
            <Container maxWidth = 'sm' className={classes.containerStyle}>
                <Typography className={classes.typographyStyle}>Sign In Below</Typography>
                <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input  name="email" placeholder='Place Email Here' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input  name="password" placeholder='Place Password Here' />
                </div>
<AuthCheck fallback={
                    <Button  className={classes.googleButton} onClick={sign_in}>Sign In With Google</Button>
                }>
                    <Button variant='contained' color='secondary' onClick={sign_out}>Sign Out</Button>
                </AuthCheck> 
                <Button  type='submit' variant='contained' color='primary' href='/create' className={classes.buttonStyle} >Create Account</Button>

                </form>
                <Button  type='submit' variant='contained' color='primary' href='/'className={classes.subStyle}>Submit</Button>

                
                <Snackbar message={'Success'} open={open} autoHideDuration={6000} onClose={handleSnackClose} >
                <Alert onClose={handleSnackClose} severity="success">
                    Successful Sign In - Redirect in 2 secs
                </Alert>
                </Snackbar>

            </Container>
        </div>
    )
})


