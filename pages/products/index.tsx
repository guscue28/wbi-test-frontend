import React, { Fragment, useContext, useEffect } from 'react';
import styles from './Products.module.css';
import Image from 'next/image';
// Routing elements
import { useRouter } from "next/router";
// import { useNavigate } from 'react-router';
// Material-ui components
import { Grid, Typography,Card, CardActionArea, CardContent } from '@material-ui/core';
// Context
import globalContext from '../../context/global/globalContext';

const Products = () => {
    const { shoes, clearCurrent } = useContext(globalContext);

    const navigate = useRouter();

    useEffect(() => {
        clearCurrent();
        // eslint-disable-next-line
    },[])

    return (
        <Fragment>
            <Typography align="center" variant="h3">Productos</Typography>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className={styles.container}
            >
                {
                    shoes.map((shoe: any) => {                        
                        return (
                            (
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={shoe.slug}>
                                    <Card
                                        className={styles.card}
                                        // onClick={() => navigate(`${shoe.slug}`)}
                                    >
                                        <CardActionArea>
                                            <Image src={shoe.image} alt={shoe.name} width={200} height={200} />
                                            <CardContent>
                                                <Typography variant="subtitle2"><strong>{shoe.name}</strong></Typography>
                                                <Typography variant="body2">Price ${shoe.price}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        )
                    })
                }
            </Grid>
        </Fragment>
    )
}

export default Products;