import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import img from '../Images/sales.jpeg'

interface Props{
    title: string;
}

export const Home = ( props:Props) => {

    return (
<div style={{ backgroundImage:`url(${img})` ,
backgroundRepeat:'no-repeat',
height:'100vh',


}} >
            

            <Button href="/App" size="large" style={{ backgroundColor:'yellow',
            position: 'fixed',
            top: 70,
            right: 650,
            fontSize: '900',
            fontWeight: '800',
            color:'blue'
        }}>
                Start Shopping!
                {/* <Link to='/App' style={{color:'blue'}}> Start Shopping!</Link> */}
            </Button>
        </div>
    )
}