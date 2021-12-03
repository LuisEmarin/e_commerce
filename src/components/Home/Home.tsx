import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {makeStyles} from '@material-ui/core'
import { Bar } from '..';
import {AuthCheck} from 'reactfire';
import {Link} from 'react-router-dom'

interface Props{
    title: string;
}

export const Home = ( props:Props) => {
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
										{/* END OF NEW ADDITION */}
                    </ul>
                </div>

        
        </Bar>
        Home Goes Here
        </div>
    )
}