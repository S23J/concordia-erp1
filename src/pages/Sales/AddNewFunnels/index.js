import React, { useContext, useEffect, useState } from 'react'
import { NavbarComponent } from '../../../component'
import { AuthContext } from '../../../auth'
import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Flex } from '@mantine/core';
import ModalAddFunnelsProduct from '../../../component/Modal/Sales/ModalAddFunnelsProduct';
import { AiFillDelete } from "react-icons/ai";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from '../../../API/axios';

function AddNewFunnels ()
{
    const { userInfo, tokens } = useContext( AuthContext );
    const [ addFunnelsProduct, setAddFunnelsProduct ] = useState( false );
    const handleOpen = () =>
    {
        setAddFunnelsProduct( true );
    }
    const [ dataTable, setDataTable ] = useState( [] );
    const addDataToTable = ( newData ) =>
    {
        setDataTable( [ ...dataTable, newData ] );
    };
    const [ total, setTotal ] = useState( 0 );
    const [ ppn, setPpn ] = useState( 11 ); // Default PPN percentage
    const [ ppnAmount, setPpnAmount ] = useState( 0 );
    const [ grandTotal, setGrandTotal ] = useState( 0 );
    const [ customer, setCustomer ] = useState( '' );
    const [ contactPerson, setContactPerson ] = useState( '' );
    const [ phone, setPhone ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ position, setPosition ] = useState( '' );
    const [ remark, setRemark ] = useState( '' );


    const navigate = useNavigate();
    const handleBack = () =>
    {
        navigate( -1 )
    }

    const numberFormat = ( value ) =>
        new Intl.NumberFormat( 'IN-ID', {
            style: 'currency',
            currency: 'IDR'
        } ).format( value );

    console.log( dataTable );

    const [ status, setStatus ] = useState( 20 ); // Set default value to 20

    const handleChange = ( event ) =>
    {
        setStatus( event.target.value );
    };

    useEffect( () =>
    {
        let calculatedTotal = 0;
        dataTable.forEach( item =>
        {
            calculatedTotal += item.subtotal;
        } );
        setTotal( calculatedTotal );
    }, [ dataTable ] );

    useEffect( () =>
    {
        const calculatedPpnAmount = ( total * ppn ) / 100;
        setPpnAmount( calculatedPpnAmount );
    }, [ total, ppn ] );

    useEffect( () =>
    {
        const calculatedGrandTotal = total + ppnAmount;
        setGrandTotal( calculatedGrandTotal );
    }, [ total, ppnAmount ] );


    const handleDelete = async ( rowData ) =>
    {
        const result = await Swal.fire( {
            title: 'Apakah anda yakin ingin menghapus data ini?',
            text: 'Kamu tidak dapat mengembalikan data ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus data ini!',
            cancelButtonText: 'Batalkan',
        } );

        if ( result.isConfirmed ) {
            try {

                const updatedDataTable = dataTable.filter( item => item !== rowData );
                setDataTable( updatedDataTable );

                Swal.fire( 'Terhapus!', 'Data berhasil dihapus.', 'success' );
            } catch ( err ) {

                Swal.fire( 'Error', 'Terjadi kesalahan saat menghapus!', 'error' );
            }
        } else {
            Swal.fire( 'Dibatalkan', '  ', 'info' );
        }
    };



    const getColumns = () => [
        {
            header: 'Produk',
            accessorKey: 'product',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Qty',
            accessorKey: 'qty',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Harga',
            accessorFn: row => (
                <p>
                    { numberFormat( row.price ) }
                </p>
            ),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Sub Total',
            accessorFn: row => (
                <p>
                    { numberFormat( row.subtotal ) }
                </p>
            ),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Hapus',
            accessorFn: ( rowData ) => (
                <IconButton aria-label="delete" color="error" onClick={ () => handleDelete( rowData ) }>
                    <AiFillDelete />
                </IconButton>
            ),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },

    ];

    const columns = getColumns();


    const table = useMantineReactTable( {
        columns,
        enableDensityToggle: false,
        initialState: { density: 'xs' },
        data: dataTable,
        enableRowNumbers: true,
        rowNumberMode: 'static',
        enableGlobalFilter: false,
        enableColumnResizing: false,
        isMultiSortEvent: () => true,
        mantineTableProps: {
            striped: true,

        },
        renderTopToolbarCustomActions: ( { table } ) => (
            <Box
                sx={ {
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                } }
            >
            </Box>
        ),
        renderToolbarInternalActions: ( { table } ) => (
            <Flex gap="xs" align="center">
                {/* add custom button to print table  */ }
                <Button
                    onClick={ handleOpen }
                    variant="contained"
                    id='tabelButton'
                >
                    Tambah Produk
                </Button>
            </Flex>
        ),
    } );


    const handleSubmitFunnels = async ( event ) =>
    {
        event.preventDefault();
        try {
            const dataFunnels = {
                sales: userInfo?.id,
                customer: customer,
                contact_person: contactPerson,
                phone: phone,
                email: email,
                position: position,
                remarks: remark,
                status: status,
                total: total,
                ppn: ppnAmount,
                grand_total: grandTotal

            }

            const responseFunnels = await axios.post( `/api/v1/crm/funnels/`, dataFunnels,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },
                }
            );

            // console.log( responseFunnels );

            dataTable.map( async ( dataArrayTable ) =>
            {
                try {

                    const finalDataTable = {
                        ...dataArrayTable,
                        funnel: responseFunnels.data.id,
                    }
                    const responseFunnelsDetail = await axios.post( `/api/v1/crm/funneldetails/`, finalDataTable,
                        {
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                withCredentials: true,
                                Authorization: `Token ${tokens?.token}`,
                            },
                        }
                    );
                    // console.log( responseFunnelsDetail );
                } catch ( err ) {
                    console.log( err )
                }
            } )
            Swal.fire( {
                icon: 'success',
                title: 'Funnels berhasil ditambahkan',
                showConfirmButton: false,
                timer: 2000
            } )
            navigate( '/funnels' );
        } catch ( err ) {
            console.log( err )
            Swal.fire( {
                icon: 'error',
                title: 'Warning!',
                text: 'Something is wrong',
            } )
        }
    }


    return (
        <>
            <NavbarComponent />
            <Container style={ { minWidth: '90%' } } >
                <form onSubmit={ handleSubmitFunnels } autoComplete='off'>
                    <Grid container spacing={ 3 } >
                        <Grid item md={ 8 } xs={ 12 } marginTop={ 2 } >
                            <h2 style={ { fontFamily: 'Poppins-Regular', textAlign: 'center' } }>
                                Buat Funnels Baru
                            </h2>
                            <h5 style={ { fontFamily: 'Poppins-Regular', textAlign: 'center' } }>
                                Sales: { userInfo?.first_name } { userInfo?.last_name }
                            </h5>
                        </Grid>
                        <Grid item md={ 4 } xs={ 12 } style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
                            <Stack spacing={ 2 } direction="row">
                                <Button
                                    type="submit"
                                    variant='contained'
                                    id='tabelButton'
                                // disabled={}
                                >
                                    Simpan
                                </Button>
                                <Button
                                    variant='contained'
                                    onClick={ handleBack }
                                    id='tabelButton'
                                    style={ { backgroundColor: 'gray' } }
                                >
                                    Kembali
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                <Container style={ { minWidth: '90%' } }>
                        <Grid container spacing={ 3 } marginTop={ 3 }> {/* Add spacing between grid containers */ }
                            <Grid item md={ 4 } xs={ 12 }>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="customer"
                                            fullWidth
                                            required
                                            label="Pelanggan"
                                            value={ customer }
                                            onChange={ ( event ) =>
                                            {
                                                setCustomer( event.target.value );
                                            } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="contactPerson"
                                            fullWidth
                                            required
                                            label="Kontak"
                                            value={ contactPerson }
                                            onChange={ ( event ) =>
                                            {
                                                setContactPerson( event.target.value );
                                            } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="phone"
                                            type='number'
                                            fullWidth
                                            required
                                            label="No. Telp"
                                            value={ phone }
                                            onChange={ ( event ) =>
                                            {
                                                setPhone( event.target.value );
                                            } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="email"
                                            type='email'
                                            required
                                            fullWidth
                                            label="Email"
                                            value={ email }
                                            onChange={ ( event ) =>
                                            {
                                                setEmail( event.target.value );
                                            } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={ 4 } xs={ 12 } spacing={ 3 }>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="position"
                                            fullWidth
                                            required
                                            label="Posisi"
                                            value={ position }
                                            onChange={ ( event ) =>
                                            {
                                                setPosition( event.target.value );
                                            } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <FormControl fullWidth sx={ styleForm }>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={ status }
                                                label="Status"
                                                required
                                                onChange={ handleChange }
                                                sx={ {
                                                    '& .MuiSelect-select.MuiSelect-select': {
                                                        fontFamily: 'Poppins-Light',
                                                        fontSize: '16px',
                                                    },
                                                } }
                                            >
                                                <MenuItem value={ 20 } sx={ selectFormValue }>20%-Lead</MenuItem>
                                                <MenuItem value={ 40 } sx={ selectFormValue }>40%-Permintaan Harga</MenuItem>
                                                <MenuItem value={ 60 } sx={ selectFormValue }>60%-Penawaran Harga</MenuItem>
                                                <MenuItem value={ 80 } sx={ selectFormValue }>80%-Menunggu PO</MenuItem>
                                                <MenuItem value={ 100 } sx={ selectFormValue }>100%-Done</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="catatan"
                                            label="Catatan"
                                            value={ remark }
                                            onChange={ ( event ) =>
                                            {
                                                setRemark( event.target.value );
                                            } }
                                            fullWidth
                                            multiline
                                            rows={ 4.5 }
                                            InputProps={ {
                                                sx: {
                                                    fontFamily: 'Poppins-Light', // Change the font-family
                                                    minWidth: '100%'
                                                }
                                            } }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid item md={ 4 } xs={ 12 }>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="total"
                                            fullWidth
                                            type='text'
                                            InputProps={ {
                                                readOnly: true,
                                            } }
                                            label="Total"
                                            variant="outlined"
                                            value={ numberFormat( total ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="ppn"
                                            fullWidth
                                            type='number'
                                            required
                                            label="PPN (%)"
                                            variant="outlined"
                                            value={ ppn }
                                            onChange={ ( e ) => setPpn( e.target.value ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="ppnAmount"
                                            fullWidth
                                            type='text'
                                            InputProps={ {
                                                readOnly: true,
                                            } }
                                            label="Jumlah PPN"
                                            variant="outlined"
                                            value={ numberFormat( ppnAmount ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="grandTotal"
                                            fullWidth
                                            type='text'
                                            InputProps={ {
                                                readOnly: true,
                                            } }
                                            label="Grand Total"
                                            variant="outlined"
                                            value={ numberFormat( grandTotal ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                </Container>
                <Container>
                        <Box sx={ { overflow: "auto" } } marginBottom={ 5 }>
                        <Box sx={ { width: "100%", display: "table", tableLayout: "fixed" } }>
                            <MantineReactTable
                                table={ table }
                            />
                        </Box>
                    </Box>
                </Container>
                </form>
            </Container>
            <ModalAddFunnelsProduct
                addFunnelsProduct={ addFunnelsProduct }
                setAddFunnelsProduct={ setAddFunnelsProduct }
                addDataToTable={ addDataToTable }
            />
        </>
    )
}

export default AddNewFunnels



const styleForm = {
    '& label': {
        fontFamily: 'Poppins-Medium', // Change the font-family of the label always
    },
    '& label.Mui-focused': {
        color: '#01155C', // Change the color when focused
        fontFamily: 'Poppins-Medium',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#01155C', // Change the outline color when focused
        },
    },
    '& input': {
        fontFamily: 'Poppins-Light', // Change the font-family
    },
};

const selectFormValue = {
    fontFamily: 'Poppins-Light',
    fontSize: '16px',
}
