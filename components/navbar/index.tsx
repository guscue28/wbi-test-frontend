import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import ahmedFarazIcon from '../../assets/images/ahmedfaraz-icon.png';
// Material-ui components
import { AppBar, IconButton, Toolbar, Typography, InputBase, alpha, makeStyles} from '@material-ui/core';
// Material-ui icons
import { Menu, Close, Search, ShoppingCart } from '@material-ui/icons';
// Routing element
import Link from 'next/link';
import { useRouter } from "next/router";
// import { useMatch } from 'react-router';

const useStyles = makeStyles((theme) => ({
    // root: {
    //   flexGrow: 1,
    // },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    // title: {
    //   flexGrow: 1,
    //   display: 'none',
    //   [theme.breakpoints.up('sm')]: {
    //     display: 'block',
    //   },
    // },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Navbar = () => {
  const [display, setDisplay] = useState(false);

  const classes = useStyles();

  const router = useRouter();

  const onClick = () => setDisplay(!display);

  const onSelect = () => setDisplay(false);

  useEffect(() => {
    const menu = document.getElementById('menu');
    const appBar = document.getElementById('appbar');
    menu!.style.height = `calc(100vh - ${appBar!.clientHeight}px)`;
    menu!.style.top = `${appBar!.clientHeight}px`;
  }, [])

  return (
      <AppBar id="appbar" position="static"  >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={onClick}
          >
            {
              display ? <Close /> : <Menu />
            }
          </IconButton>
          <Typography className={`${classes.title} ${styles.title}`} variant="h6" noWrap>
            All. <span>Shoes Store <ShoppingCart /> </span>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
        <ul id="menu" className={`${styles.menu} ${display && styles.display}`}>
        <Link href="/" >
          <a onClick={onSelect} className={`${styles.a} ${router.pathname == "/" && styles.active}`}>Home</a>
          </Link>
        <Link href="products" >
          <a onClick={onSelect} className={`${styles.a} ${router.pathname == "products" && styles.active}`}>Productos</a>
          </Link>
        </ul>
      </AppBar>
  )
}

export default Navbar;