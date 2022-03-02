import React from 'react';
import styles from './NotFound.module.css';
import { Button, Typography } from '@material-ui/core';
// import { useNavigate } from 'react-router';

const NotFound = () => {
    return (
        <div className={styles.container} >
            <Typography align="center" variant="h2" component="h1">
                Pagina no Encontrada
            </Typography>
            {/* <Button onClick={onClick} className={styles.button} variant="outlined">Home</Button> */}
        </div>
    )
}

export default NotFound;
