import { useState } from 'react';
import { Drawer as MUIDrawer,
    ListItem,
    List,
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
    Dialog} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { RouteComponentProps, withRouter } from 'react-router';
import { SignIn } from '..';
import Item from '../Item/Item';
import Cart from '../Cart/Cart';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import  {StyledButton} from '../../App.styles';
import { useQuery } from 'react-query';


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
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
};
export const getTotalItems = (items: CartItemType[]) => 
items.reduce((ack: number, item) => ack + item.amount, 0);



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
    };

    const handleDialogClickClose = () => {
        setDialogOpen(false);
    };


    const getProducts = async (): Promise<CartItemType[]> =>
await (await fetch('https://fakestoreapi.com/products')).json();
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);
    const { data, isLoading, error } = useQuery<CartItemType[]>(
        'products',
        getProducts
        );
        

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            const isItemInCart = prev.find(item => item.id === clickedItem.id);
        
            if (isItemInCart) {
            return prev.map(item =>
                item.id === clickedItem.id
                ? { ...item, amount: item.amount + 1 }
                : item
            );
            }
            return [...prev, { ...clickedItem, amount: 1 }];
        });
        };
        
        const handleRemoveFromCart = (id: number) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
            if (item.id === id) {
                if (item.amount === 1) return ack;
                return [...ack, { ...item, amount: item.amount - 1 }];
            } else {
                return [...ack, item];
            }
            }, [] as CartItemType[])
        );
        };
        



    const itemsList = [
        {
            text: 'Home',
            onClick: () => history.push('/')
        },
        
        
        {
            text: 'Shop Now!',
            onClick: () => history.push('/Bar')
        }
    ];


    return (
        <><div className={classes.root}>
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
                        <Button className={classes.simply} href='./'>SimplyShop.com</Button>
                    </Typography>


                    <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                        <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart} />
                    </Drawer>
                    <StyledButton onClick={() => setCartOpen(true)}>
                        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon />
                        </Badge>
                    </StyledButton>



                    <Button className={classes.toolbarButton} onClick={handleDialogClickOpen}>Sign In or Register!</Button>
                    <Dialog className={classes.dialog} open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                        <SignIn>


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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {itemsList.map((item) => {
                        const { text, onClick } = item;
                        return (
                            <ListItem button key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                            </ListItem>
                        );
                    })}
                </List>
            </MUIDrawer>
            <main className={clsx(classes.content, {
                [classes.contentShift]: open
            })}>
                <div className={classes.drawerHeader} />
            </main>

        </div>
        <div>
        <Grid container spacing={3}>
        {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
        ))}
        </Grid>
            </div></>
    )



})


 
