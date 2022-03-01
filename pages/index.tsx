import React, { useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css';
// Material-ui component
import { Button, Typography } from '@material-ui/core';
// Material-ui icons
import { ShoppingCart } from '@material-ui/icons';

const Home = () => {    

    // const navigate = useNavigate();

    // const onClick = () => navigate('products');
  return (
    <>
        <div className={styles.container}>
            <Typography variant="h1" align="center" className={styles.heading}>JUST DO IT</Typography>
            <Button 
                className={styles.button}
                variant="outlined" 
                size="large" 
          endIcon={<ShoppingCart />}
          href='/products'
            >
                    Comprar
            </Button>
      </div>
      </>
    )
}

export default Home;

