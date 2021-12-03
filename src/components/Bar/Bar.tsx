import { useState } from 'react';
import { Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    Theme,
    useTheme,
    makeStyles,
    createStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle

} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router';
import { SignIn } from '..';
import { StyledButton } from '../../App.styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import App from '../../App';

const drawerWidth = 240; 

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            display: 'flex'
        },
        appBar: { 
            transition: theme.transitions.create(['margin', 'width'],{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'],{
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton:{
            marginRight: theme.spacing(2)
        },
        hide:{
            display:'none'
        },
        drawer:{
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper:{
            width: drawerWidth
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0,1),
            // required for content to display below the AppBar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end'
        },
        content:{
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin',{
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginLeft: -drawerWidth
        },
        contentShift:{
            transition: theme.transitions.create('margin',{
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        },
        toolbar:{
            display: 'flex'
        },
        toolbarButton:{
            marginLeft: 'auto',
            color:'white',
            padding:'0',
            margin:'0',
        },
        simply:{
            color:'white',
            padding:'0',
            margin:'0',
            fontSize:'25px'
            
        },
        dialog:{
            alignContent:'center'
        }
    })
)

interface DashProps{
    history: RouteComponentProps["history"];
    location: RouteComponentProps["location"];
    match: RouteComponentProps["match"];
}


export const Bar = withRouter((props:DashProps) =>{
    console.log(props)
    const { history } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDrawerOpen = () =>{
        setOpen(true)
    };
    const handleDrawerClose = () =>{
        setOpen(false)
    };

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClickClose = () => {
        setDialogOpen(false);
    }

    const itemsList = [
        {
            text: 'Home',
            onClick: () => history.push('/')
        },
        {
            text: 'Sign In',
            onClick: () => history.push('/signin')
        }
    ];

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar 
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' noWrap>
                        <Button className={classes.simply}href='./'>SimplyParts.com</Button>  
                    </Typography>
                    {/* <StyledButton onClick={() => setCartOpen(true)}>
                    <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                    <AddShoppingCartIcon />
                    </Badge>
                    </StyledButton>                     */}
                    
                    <Button className={classes.toolbarButton} onClick={handleDialogClickOpen}>Sign In or Register!</Button>
                        <Dialog className={classes.dialog} open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                            <SignIn>
                                
                            <DialogActions>
                                <Button onClick={handleDialogClickClose} color='primary'>Cancel</Button>
                                <Button onClick={handleDialogClickClose} color='primary'>Done</Button>
                            </DialogActions>
                            </SignIn>
                        </Dialog>
                </Toolbar>
            </AppBar>
            <MUIDrawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon />: <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {itemsList.map((item) =>{
                        const { text, onClick } = item;
                        return (
                            <ListItem button key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    })}
                </List>
            </MUIDrawer>
            <main className={clsx(classes.content, {
                [classes.contentShift]: open
            })}>
                <div className={classes.drawerHeader} />
            </main>
        </div>
    )
})

function setCartOpen(_arg0: boolean): void {
    throw new Error('Function not implemented.');
}


function getTotalItems(_cartItems: any): import("react").ReactNode {
    throw new Error('Function not implemented.');
}


function cartItems(_cartItems: any): import("react").ReactNode {
    throw new Error('Function not implemented.');
}
