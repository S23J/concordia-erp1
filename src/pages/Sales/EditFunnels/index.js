import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { NavbarComponent } from '../../../component';
import { AuthContext } from '../../../auth';
import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import axios from '../../../API/axios';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import { MdEdit } from "react-icons/md";
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Flex } from '@mantine/core';
import ModalEditFunnelsProduct from '../../../component/Modal/Sales/ModalEditFunnels';
import ModalAddFunnelsProduct2 from '../../../component/Modal/Sales/ModalAddFunnelsProduct2';

function EditFunnels ()
{

    const { transid } = useParams();
    const { userInfo, tokens } = useContext( AuthContext );
    const [ funnelsData, setFunnelsData ] = useState( [] );
    const [ funnelsDataDetail, setFunnelsDataDetail ] = useState( [] );
    const [ editFunnelsProduct, setEditFunnelsProduct ] = useState( false );
    const [ idSelected, setIdSelected ] = useState();
    const handleEdit = ( row ) =>
    {
        setIdSelected( row.id )
        setEditFunnelsProduct( true );
    }
    const [ addFunnelsProduct, setAddFunnelsProduct ] = useState( false );
    const handleOpen = () =>
    {
        setAddFunnelsProduct( true );
    }
    const [ total, setTotal ] = useState( 0 );
    const [ ppn, setPpn ] = useState( 11 ); // Default PPN percentage
    const [ ppnAmount, setPpnAmount ] = useState( 0 );
    const [ grandTotal, setGrandTotal ] = useState( 0 );
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate( -1 )
    };
    const [ status, setStatus ] = useState( 20 );

    // console.log( funnelsData?.status )

    const handleChangeStatus = ( event ) =>
    {
        setStatus( event.target.value );
    };


    const numberFormat = ( value ) =>
        new Intl.NumberFormat( 'IN-ID', {
            style: 'currency',
            currency: 'IDR'
        } ).format( value );


    const fetchFunnelsData = () =>
    {
        axios.get( `/api/v1/crm/funnels/${transid}/`,
            {
                headers:
                {
                    withCredentials: true,
                    Authorization: `Token ${tokens?.token}`,
                },

            } )
            .then( res =>
            {
                setFunnelsData( res.data )
                setStatus( res.data.status )
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
                            // Redirect the user to the login page or perform any other necessary actions
                            // e.g., using React Router
                            navigate( '/' );
                        }
                    } );

                } else ( console.log( err ) )
            } )
    }
    useEffect( () =>
    {
        if ( transid !== undefined ) {
            fetchFunnelsData()
        }

    }, [ transid ] )

    const fetchFunnelsDataDetail = () =>
    {
        axios.get( `/api/v1/crm/funneldetails/`, {
            headers: {
                withCredentials: true,
                Authorization: `Token ${tokens?.token}`,
            },
        } )
            .then( res =>
            {
                // Filter the data based on funnelData.id
                const filteredData = res.data.filter( item => item.funnel === funnelsData.id );
                setFunnelsDataDetail( filteredData );

                // console.log( filteredData )
            } )
            .catch( err =>
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
                } else {
                    console.log( err );
                }
            } );
    }

    useEffect( () =>
    {
        if ( funnelsData.id !== undefined ) {
            fetchFunnelsDataDetail();
        }
    }, [ funnelsData.id ] );



    useEffect( () =>
    {
        let calculatedTotal = 0;
        funnelsDataDetail.forEach( item =>
        {
            calculatedTotal += parseFloat( item.subtotal );
        } );
        setTotal( calculatedTotal );
    }, [ funnelsDataDetail ] );

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


    const defaultValue = {
        customer: funnelsData?.customer || '',
        contact_person: funnelsData?.contact_person || '',
        email: funnelsData?.email || '',
        phone: funnelsData?.phone || '',
        position: funnelsData?.position || '',
        remarks: funnelsData?.remarks || '',
    };


    const handleEditFunnels = async ( values ) =>
    {
        const finalData = {
            ...values,
            status: status,
            total: total,
            ppn: ppnAmount,
            grand_total: grandTotal
        }
        // console.log( finalData )

        try {

            const response = await axios.patch( `/api/v1/crm/funnels/${funnelsData?.id}/`, finalData,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },
                }
            );

            // console.log( response );
            Swal.fire( {
                icon: 'success',
                title: 'Funnel berhasil di ubah',
                showConfirmButton: false,
                timer: 2000
            } )
            navigate( '/funnels' )
        } catch ( err ) {
            console.log( err )
            Swal.fire( {
                icon: 'error',
                title: 'Warning!',
                text: 'Something is wrong',
            } )
        }

    }


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
            header: 'Edit',
            accessorFn: ( row ) => (
                <IconButton aria-label="edit" color="secondary" onClick={ () => handleEdit( row ) }>
                    <MdEdit />
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
        data: funnelsDataDetail,
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


    return (
        <>
            <NavbarComponent />
            <Container style={ { minWidth: '90%' } } >
                <Formik
                    initialValues={ defaultValue }
                    enableReinitialize={ true }
                    onSubmit={ handleEditFunnels }
                >
                    { ( {
                        handleSubmit,
                        handleChange,
                        values,
                        setFieldValue,
                    } ) => (
                        <form autoComplete='off' onSubmit={ handleSubmit }>
                    <Grid container spacing={ 3 } >
                                <Grid item md={ 8 } xs={ 12 } marginTop={ 3 } >
                            <h2 style={ { fontFamily: 'Poppins-Regular', textAlign: 'center' } }>
                                        { funnelsData?.funnel_no }
                            </h2>
                            <h5 style={ { fontFamily: 'Poppins-Regular', textAlign: 'center' } }>
                                Sales: { userInfo?.first_name } { userInfo?.last_name }
                            </h5>
                                    <h5 style={ { fontFamily: 'Poppins-Regular', textAlign: 'center' } }>
                                        Tanggal: { funnelsData?.created_at }
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
                                            disabled={ funnelsData?.total != total }
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
                                                    InputProps={ {
                                                        readOnly: true,
                                                    } }
                                            label="Pelanggan"
                                                    value={ values.customer }
                                                    onChange={ handleChange( "customer" ) }
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
                                                    value={ values.contact_person }
                                                    onChange={ handleChange( "contact_person" ) }
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
                                                    value={ values.phone }
                                                    onChange={ handleChange( "phone" ) }
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
                                                    value={ values.email }
                                                    onChange={ handleChange( "email" ) }
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
                                                    value={ values.position }
                                                    onChange={ handleChange( "position" ) }
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
                                                        value={ status } // Pass the status state as the value
                                                        label="Status"
                                                        required
                                                        onChange={ handleChangeStatus }
                                                        sx={ {
                                                            '& .MuiSelect-select.MuiSelect-select': {
                                                                fontFamily: 'Poppins-Light',
                                                                fontSize: '16px',
                                                            },
                                                        } }
                                                    >
                                                        <MenuItem value={ 0 } sx={ selectFormValue }>0%-Gagal</MenuItem>
                                                        <MenuItem value={ 20 } sx={ selectFormValue }>20%-Prospek</MenuItem>
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
                                                    value={ values.remarks }
                                                    onChange={ handleChange( "remarks" ) }
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
                    ) }
                </Formik>
            </Container>
            <ModalEditFunnelsProduct
                editFunnelsProduct={ editFunnelsProduct }
                setEditFunnelsProduct={ setEditFunnelsProduct }
                idSelected={ idSelected }
                fetchFunnelsDataDetail={ fetchFunnelsDataDetail }
            />
            <ModalAddFunnelsProduct2
                addFunnelsProduct={ addFunnelsProduct }
                setAddFunnelsProduct={ setAddFunnelsProduct }
                fetchFunnelsDataDetail={ fetchFunnelsDataDetail }
                funnelsData={ funnelsData }
            />
        </>
    )
}

export default EditFunnels


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