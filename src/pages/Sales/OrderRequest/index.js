import React, { useContext, useEffect, useState } from 'react'
import { NavbarComponent } from '../../../component'
import { Box, Button, Grid, IconButton } from '@mui/material'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MdEdit } from 'react-icons/md';
import { AuthContext } from '../../../auth';
import { useNavigate } from 'react-router-dom';
import axios from '../../../API/axios';
import Swal from 'sweetalert2';

function OrderRequest ()
{

    const { tokens, userInfo } = useContext( AuthContext );
    const [ listOrderRequest, setListOrderRequest ] = useState( [] );
    const navigate = useNavigate();
    const handleAddNewOrderRequest = () =>
    {
        navigate( '/tambah-order-request' );
    }


    const fetchListOrderRequest = () =>
    {
        axios.get( `/api/v1/crm/orderrequest/`,
            {
                headers:
                {
                    withCredentials: true,
                    Authorization: `Token ${tokens?.token}`,
                },

            } )
            .then( res =>
            {
                const filteredData = res.data.filter( item => item.sales === userInfo?.id );
                setListOrderRequest( filteredData );
                // console.log( res.data )

            } ).catch( err =>
            {
                if ( err.response?.status === 401 ) {
                    Swal.fire( {
                        icon: 'error',
                        title: 'Sesi telah habis',
                        text: 'Sesi anda telah berakhir. Silahkan login kembali.',
                        confirmButtonText: 'Log In',
                    } ).then( ( result ) =>
                    {
                        if ( result.isConfirmed ) {
                            navigate( '/' );
                        }
                    } );

                } else ( console.log( err ) )
            } )
    }

    useEffect( () =>
    {

        if ( userInfo?.id != null ) fetchListOrderRequest()

    }, [ userInfo?.id ] );



    const getColumns = () => [
        {
            accessorFn: ( row ) => new Date( row.created_at ),
            header: 'Tanggal',
            filterVariant: 'date-range',
            Cell: ( { cell } ) => cell.getValue().toLocaleDateString(),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Request No.',
            accessorKey: 'funnel_no',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Pelanggan',
            accessorKey: 'customer',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        // {
        //     header: 'Edit',
        //     accessorFn: ( row ) => (
        //         <IconButton aria-label="delete" color="secondary" onClick={ () => { editFunnels( row ) } }>
        //             <MdEdit />
        //         </IconButton>
        //     ),
        //     mantineTableHeadCellProps: {
        //         align: 'center',
        //     },
        //     mantineTableBodyCellProps: {
        //         align: 'center',
        //     },
        // },

    ];


    const columns = getColumns();


    const table = useMantineReactTable( {
        columns,
        enableDensityToggle: false,
        initialState: { density: 'xs' },
        data: listOrderRequest,
        enableRowNumbers: true,
        rowNumberMode: 'static',
        enableGlobalFilter: false,
        enableColumnResizing: false,
        isMultiSortEvent: () => true,
        mantineTableProps: {
            striped: true,

        },
        // renderTopToolbarCustomActions: ( { table } ) => (
        //     <Box
        //         sx={ {
        //             display: 'flex',
        //             gap: '16px',
        //             padding: '8px',
        //             flexWrap: 'wrap',
        //         } }
        //     >
        //     </Box>
        // ),
        // renderToolbarInternalActions: ( { table } ) => (
        //     <Flex gap="xs" align="center">
        //         {/* add custom button to print table  */ }
        //         <Button
        //             onClick={ handleOpen }
        //             variant="contained"
        //             id='tabelButton'
        //         >
        //             Tambah Produk
        //         </Button>
        //     </Flex>
        // ),
    } );


    return (
        <>
            <NavbarComponent />
            <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                <Grid container marginTop={ 3 } style={ { maxWidth: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                    <Grid item lg={ 6 } xs={ 6 } style={ { display: 'flex', alignItems: 'center' } }>
                        <h2 style={ { fontFamily: 'Poppins-Regular' } }>
                            Request Order
                        </h2>
                    </Grid>
                    <Grid item lg={ 6 } xs={ 6 }>
                        <div style={ { display: 'flex', alignItems: 'end', justifyContent: 'end' } }>
                            <Button
                                variant='contained'
                                id='tabelButton'
                                onClick={ handleAddNewOrderRequest }
                                sx={ {
                                    minHeight: '50px',
                                } }
                            >
                                Buat baru
                            </Button>
                        </div>
                    </Grid>
                </Grid>

            </div>
            <div>
                <Box sx={ { overflow: "auto" } } marginY={ 5 } marginX={ 3 }>
                    <Box sx={ { width: "100%", display: "table", tableLayout: "fixed" } }>
                        <MantineReactTable
                            table={ table }
                        />
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default OrderRequest
