import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Snackbar,makeStyles,Container} from '@material-ui/core'
import { Bar } from '..';
import {AuthCheck} from 'reactfire';
import {Link} from 'react-router-dom'
import {Input} from '../sharedComponents'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useState } from "react"
import { RouteComponentProps,withRouter} from "react-router-dom";


const useStyles = makeStyles({
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
    
    

})

interface Create{
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}
interface Props{
    title: string;
}
const Alert = (props:AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}


export const Create = withRouter( (props:Create) => {
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
        history.push('/SignIn')
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
                <Typography className={classes.typographyStyle}>Create your FREE account!</Typography>
                <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input  name="email" placeholder='Place Email Here' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input  name="password" placeholder='Place Password Here' />
                </div>
                <Button type='submit' variant='contained' color='primary' href='/SignIn'>Submit</Button>
                </form>
                
                <Snackbar message={'Success'} open={open} autoHideDuration={6000} onClose={handleSnackClose} >
                <Alert onClose={handleSnackClose} severity="success">
                    Successful Sign In - Redirect in 2 secs
                </Alert>
                </Snackbar>

            </Container>
        </div>
    )
})