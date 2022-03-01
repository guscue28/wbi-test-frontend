import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent } from '@material-ui/core';
import Image from 'next/image';
//Styles
import styles from './Products.module.css';
// Routing elements
import { useRouter } from "next/router";
// Context
import { AppDataContext } from '../../context/appData.context';
//Pagination
import ReactPaginate from 'react-paginate';
//Filter
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//Activity indicator
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

const Products = () => {
    const { shoes, getAllshoes } = useContext(AppDataContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [shoesPerPage, setShoesPerPage] = useState<number>(5);
    const [filter, setfilter] = useState<string>('')

    // const navigate = useRouter();

    const pageCount = Math.ceil(shoes?.results.length / shoesPerPage)

    const changePage = (selected: any) => {
        setCurrentPage(selected);
    }

    //Filter 
    const filterOptions = [
        'Filtros...',
        'Marca',
        'Modelo',
        'Fecha de lanzamiento',
        'Tiendas',

    ]

    useEffect(() => {
        getAllshoes();
        !shoes?.results.length ? setLoading(true) : setLoading(false)
        // console.log('shoes', loading);
        
    },[getAllshoes, loading, shoes?.results.length])

    return (
        <Fragment>
            <Typography align="center" variant="h3">Productos</Typography>
            {loading ? (
                <Grid className={styles.spinnerContainer}>
                    <Spinner size={40} color="white" animating={loading} />
                </Grid>)
                : (
                <>
                <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                className={styles.filterContainer}>
                <Dropdown
                options={filterOptions}
                onChange={((val: any) => {
                if (val.value === 'Filtros...') {
                    setfilter('');
                    }
                    setfilter(val.value);
                    console.log('val', val.value);
                })}
                value={filter ? filter : ''}
                placeholder="Filtros..."
                controlClassName={styles.filter}
                menuClassName={styles.filter}
                 />
                </Grid>
                 <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className={styles.container}
            >
                {
                    shoes?.results!.map((shoe: any) => {          
                        return (
                            (
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={shoe.slug}>
                                    <Card
                                        className={styles.card}
                                        // onClick={() => navigate(`${shoe.slug}`)}
                                    >
                                        <CardActionArea>
                                            {/* <Grid className={styles.imgContainer}>
                                                <Image src={shoe.image} alt={shoe.name} width={200} height={200} />
                                                </Grid> */}
                                            <CardContent>
                                            <Grid className={styles.infoContainer}>
                                                    <Typography variant="subtitle2"><strong>{shoe.name}</strong></Typography>
                                                </Grid>
                                            <Grid className={styles.infoContainer}>
                                                
                                                    <Typography variant="body2">Price ${shoe.price}</Typography>
                                            </Grid>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        )
                    })
                }
            </Grid>
            <Grid className={styles.paginationContainer}>
                <ReactPaginate
                    pageCount={pageCount}
                    breakLabel="..."
                    nextLabel="Next"
                    previousLabel="Previous"
                    onPageChange={changePage}
                    containerClassName={styles.paginationBttns}
                    previousLinkClassName={styles.previousBttn}
                    nextLinkClassName={styles.nextBttn}
                    disabledClassName={styles.paginationDisabled}
                    activeClassName={styles.paginationActive}
                />
                {/* <Pagination shoesPerPage={shoesPerPage} totalShoes={shoes!.results!.length} /> */}
            </Grid>
                </>
            )}
           
        </Fragment>
    )
}

export default Products;