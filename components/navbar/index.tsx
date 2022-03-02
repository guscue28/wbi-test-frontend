import React, { useState, useEffect, useContext } from 'react';
import styles from './Navbar.module.css';
// Material-ui components
import { AppBar, IconButton, Toolbar, Typography, InputBase, alpha, makeStyles, Grid} from '@material-ui/core';
// Material-ui icons
import { Menu, Close, Search, ShoppingCart } from '@material-ui/icons';
// Routing element
import Link from 'next/link';
import { useRouter } from "next/router";
import { AppDataContext } from '../../context/appData.context';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//       display: 'none',
//       [theme.breakpoints.up('sm')]: {
//         display: 'block',
//       },
//     },
//     inputInput: {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         width: '12ch',
//         '&:focus': {
//           width: '20ch',
//         },
//       },
//     },
//   }));

const Navbar = () => {
  const {searchKey, search } = useContext(AppDataContext);
  
  const [display, setDisplay] = useState(false);
  // const [search, setSearch] = useState<string>('');

  // const classes = useStyles();

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
      <AppBar id="appbar" position="static" className={styles.appBar}  >
        <Toolbar>
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="open drawer"
            onClick={onClick}
          >
            {
              display ? <Close /> : <Menu />
            }
          </IconButton>
          <Typography className={`${styles.title}`} variant="h6" noWrap>
            All. <span>Shoes Store <ShoppingCart /> </span>
          </Typography>
          <Grid                 container
                direction="row"
                justifyContent="flex-end"
                alignItems="center" className={styles.search}>
            <Grid className={styles.searchIcon}>
              <Search />
            </Grid>
          <InputBase
            value={searchKey}
              placeholder="Busqueda…"
              classes={{
                root: styles.inputRoot,
                input: styles.inputInput,
              }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(val) => {
              search(val.target.value);
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                router.push(`products`)
              }    
            }}
            />
          </Grid>
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