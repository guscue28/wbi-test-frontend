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
import { baseURL } from '../../services/Axios';
import { Stores } from '../../interfaces/Stores.interfaces';

const Products = () => {
    const { shoes, stores, searchKey, getAllShoes, getAllStores } = useContext(AppDataContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [shoesPerPage, setShoesPerPage] = useState<number>(8);
    const [storesFilter, setStoresFilter] = useState<string>('')
    const [releasedFilter, setReleasedFilter] = useState<string>('')

    const router = useRouter();

    const pageCount = Math.ceil(shoes!.count / shoesPerPage)

    const changePage = ({selected}: any) => {
        setCurrentPage(selected);
    }

    //Filter 
    const released: any = [
        {
            value: '',
            label: 'Fecha de lanzamiento'
        }
    ]
    const allStores: any = [
        {
            value: '',
            label: 'Tiendas',
        }
    ]
    for (let i = 1980; i <= new Date().getFullYear(); i++) {
        released.push({
            value: i,
            label: i,
        })
    }
    stores.map((el: Stores) => allStores.push({
        value: el._id,
        label: el.name,
    }))
    // const allReleased = 
    
    const getAllData = async () => {
        const sort = {
            searchKey: searchKey,
            itemsPerPage: shoesPerPage,
            page: currentPage,
            store: storesFilter,
            releaseAt: releasedFilter
        }
        await getAllShoes(sort);
        await getAllStores();
        console.log('router', router)
        setLoading(false);
    }
    
    useEffect(() => {
        setCurrentPage(0);
        getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey, storesFilter, releasedFilter])

    useEffect(() => {
        getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])
    
    

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
                <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="stretch"
                className={styles.filterSubContainer}>
                        <Typography align="left" variant="h5" className={styles.filterTitle}>
                            Filtros
                        </Typography>        
                        <Dropdown     
                        options={allStores}
                        onChange={((val: any) => {
                        if (val.value === '') {
                            setStoresFilter('');
                            }
                            setStoresFilter(val.value);
                            console.log('val', val.value);
                        })}
                        value={storesFilter}
                        placeholder="Tiendas"
                        
                        controlClassName={styles.filter}
                        menuClassName={styles.filter}
                                    />
                        <Dropdown
                        options={released}
                        onChange={((val: any) => {
                        if (val.value === 'Fecha de Lanzamiento') {
                            setReleasedFilter('');
                            }
                            setReleasedFilter(val.value);
                            console.log('val', val.value);
                        })}
                        value={releasedFilter}
                        placeholder="Fecha de Lanzamiento"
                        controlClassName={styles.filterReleased}
                        menuClassName={styles.filterReleased}
                        />
                    </Grid>
                </Grid>
                 <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className={styles.container}
            >
            {shoes.shoes.length
                                ?
                    shoes.shoes.map((shoe: any) => {          
                        return (
                            (
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={shoe.slug}>
                                    <Card
                                        className={styles.card}
                                    >
                                        <CardActionArea>
                                            <Grid className={styles.imgContainer}>
                                                <Image
                                                    src={`${baseURL}/${shoe.img}`}
                                                    alt={shoe.name}
                                                    width={180}
                                                    height={200}
                                                />
                                                </Grid>
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
                    
                     : (
                        <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        className={styles.notMatchContainder}                
                        >     
                        <Typography align="left" variant="h5" className={styles.notMatchTitle}>
                            No se encontraron resultados
                        </Typography>  
                        </Grid>                
                    )
                }
            </Grid>
            {shoes.shoes.length && (
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
            </Grid>         
            )}
            </>
            )}
           
        </Fragment>
    )
}

export default Products;