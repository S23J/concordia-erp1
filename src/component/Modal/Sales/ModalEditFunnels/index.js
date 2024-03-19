import { Alert, Box, Button, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import axios from '../../../../API/axios';
import { AuthContext } from '../../../../auth';
import { Field, Formik } from 'formik';
import Swal from 'sweetalert2';

function ModalEditFunnelsProduct ( {
    editFunnelsProduct,
    setEditFunnelsProduct,
    idSelected,
    fetchFunnelsDataDetail
} )
{

    const isMobile = useMediaQuery( { maxWidth: 767 } );
    const { tokens } = useContext( AuthContext );
    const [ funnelRetrieve, setFunnelRetrieve ] = useState( [] );
    const [ showAlert, setShowAlert ] = useState( false ); // State for showing the alert

    // console.log( idSelected )

    const fetchFunnelsRetreive = () =>
    {
        axios.get( `/api/v1/crm/funneldetails/${idSelected}`,
            {
                headers:
                {
                    withCredentials: true,
                    Authorization: `Token ${tokens?.token}`,
                },

            } )
            .then( res =>
            {
                setFunnelRetrieve( res.data )
                // console.log( res.data )

            } ).catch( err =>
            {
                console.log( err )
            } )
    }
    useEffect( () =>
    {
        if ( idSelected !== undefined ) {
            fetchFunnelsRetreive()
        }

    }, [ idSelected ] )

    const handleClose = () =>
    {
        setEditFunnelsProduct( false );
        fetchFunnelsRetreive();
        setShowAlert( false );
    }


    const handleCloseAlert = () =>
    {
        setShowAlert( false ); // Hide the alert
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:
            ( isMobile ?
                '100%'
                :
                500
            )
        ,
        bgcolor: 'background.paper',
        border: '2px solid #01155C',
        boxShadow: 24,
        p: 4,
    };


    // Adjust the handleChangePrice function to set the numeric value in state
    function handleChangePrice ( e, setFieldValue )
    {
        const inputValue = e.target.value;
        const numericValue = parseFloat( inputValue.replace( /[^\d]/g, '' ) ) || 0;
        // Store the numeric value in form state
        setFieldValue( 'price', numericValue );
    }

    // Assuming defaultValue is declared outside the component
    const defaultValue = {
        product: funnelRetrieve?.product || '',
        qty: funnelRetrieve?.qty || '',
        price: parseFloat( funnelRetrieve?.price ) || 0, // Parse to float
        description: funnelRetrieve?.description || '',
    };


    const handleEditProduct = async ( values ) =>
    {

        const finalData = {
            ...values,
            subtotal: values?.price * values?.qty,
        }
        // console.log( finalData )
        try {

            const response = await axios.patch( `/api/v1/crm/funneldetails/${idSelected}/`, finalData,
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
                title: 'Funnels detail berhasil di ubah',
                showConfirmButton: false,
                timer: 2000
            } )
            handleClose();
            fetchFunnelsDataDetail();
        } catch ( err ) {
            console.log( err )
            Swal.fire( {
                icon: 'error',
                title: 'Warning!',
                text: 'Something is wrong',
            } )
        }

    };




    return (
        <Modal
            open={ editFunnelsProduct }
            onClose={ handleClose }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ style }>
                <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } }>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={ { fontFamily: 'Poppins-Medium' } }>
                        Edit Funnels Produk
                    </Typography>
                    <IconButton onClick={ handleClose }>
                        <IoCloseOutline />
                    </IconButton>
                </Box>
                <hr />
                <>
                    {/* Conditional rendering for the alert */ }
                    { showAlert && (
                        <Alert severity="warning" onClose={ handleCloseAlert }>Harap isi form yang dibutuhkan.</Alert>
                    ) }
                    <Formik
                        initialValues={ defaultValue }
                        enableReinitialize={ true }
                        onSubmit={ handleEditProduct }
                    >
                        { ( {
                            handleSubmit,
                            handleChange,
                            values,
                            setFieldValue
                        } ) => (
                            <form onSubmit={ handleSubmit }>
                                <Grid container>
                                    <Grid item xs={ 12 } marginY={ 2 }>
                                        <TextField
                                            id="productName"
                                            fullWidth
                                            required
                                            label="Nama Produk"
                                            variant="outlined"
                                            value={ values.product }
                                            onChange={ handleChange( "product" ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 } marginBottom={ 2 }>
                                        <TextField
                                            id="qty"
                                            fullWidth
                                            required
                                            type='number'
                                            label="Qty"
                                            variant="outlined"
                                            value={ values.qty }
                                            onChange={ handleChange( "qty" ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 } marginBottom={ 2 }>
                                        <Field name="price">
                                            { ( { field } ) => (
                                                <TextField
                                                    { ...field }
                                                    id="price"
                                                    fullWidth
                                                    required
                                                    type='text'
                                                    label="Harga"
                                                    variant="outlined"
                                                    value={ `Rp ${values.price.toLocaleString()}` } // Display formatted value
                                                    onChange={ ( e ) => handleChangePrice( e, setFieldValue ) }
                                                    sx={ styleForm }
                                                />
                                            ) }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={ 12 } marginBottom={ 2 }>
                                        <TextField
                                            id="desc"
                                            label="Deskripsi"
                                            fullWidth
                                            multiline
                                            rows={ 3 }
                                            value={ values.description }
                                            onChange={ handleChange( "description" ) }
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


                                <hr />
                                <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                                    <Button variant='contained' type='submit'>Simpan</Button>
                                    <Button variant='outlined' onClick={ handleClose }>Batal</Button>
                                </Box>
                            </form>
                        ) }
                    </Formik>
                </>
            </Box>


        </Modal>
    )
}

export default ModalEditFunnelsProduct


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
        minWidth: '100%'
    },
};