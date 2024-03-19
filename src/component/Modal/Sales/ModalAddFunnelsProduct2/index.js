import { Alert, Box, Button, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../auth';
import axios from '../../../../API/axios';

function ModalAddFunnelsProduct2 ( {
    addFunnelsProduct,
    setAddFunnelsProduct,
    fetchFunnelsDataDetail,
    funnelsData
} )
{
    const isMobile = useMediaQuery( { maxWidth: 767 } );
    const { tokens } = useContext( AuthContext );
    const [ productName, setProductName ] = useState( '' );
    const [ qty, setQty ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ desc, setDesc ] = useState( '' );
    const [ showAlert, setShowAlert ] = useState( false ); // State for showing the alert

    const handleClose = () =>
    {
        setAddFunnelsProduct( false );
        setProductName( '' );
        setQty( '' );
        setPrice( '' );
        setDesc( '' );
    }

    const handleCloseAlert = () =>
    {
        setShowAlert( false ); // Hide the alert
    };

    const handleSave = async ( event ) =>
    {
        event.preventDefault();
        if ( !productName || !qty || !price ) {
            setShowAlert( true ); // Show the alert
            return;
        }
        const subtotal = parseInt( price ) * parseInt( qty );
        const data = {
            product: productName,
            qty: qty,
            price: price,
            description: desc,
            subtotal: subtotal,
            funnel: funnelsData?.id,
        }
        // console.log( data )
        try {

            const response = await axios.post( `/api/v1/crm/funneldetails/`, data,
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
                title: 'Funnels detail berhasil di tambahkan',
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


    function handleChangePrice ( e )
    {
        const inputValue = e.target.value;
        const numericValue = parseFloat( inputValue.replace( /[^\d]/g, '' ) ) || 0;
        setPrice( numericValue );
    }

    return (
        <Modal
            open={ addFunnelsProduct }
            onClose={ handleClose }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ style }>
                <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } }>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={ { fontFamily: 'Poppins-Medium' } }>
                        Tambah Funnels Produk
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
                    <Grid container>
                        <Grid item xs={ 12 } marginY={ 2 }>
                            <TextField
                                id="productName"
                                fullWidth
                                required
                                label="Nama Produk"
                                variant="outlined"
                                value={ productName }
                                onChange={ ( e ) => setProductName( e.target.value ) }
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
                                value={ qty }
                                onChange={ ( e ) => setQty( e.target.value ) }
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } marginBottom={ 2 }>
                            <TextField
                                id="price"
                                fullWidth
                                required
                                type='text'
                                label="Harga"
                                variant="outlined"
                                value={ `Rp ${price.toLocaleString()}` }
                                onChange={ handleChangePrice }
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } marginBottom={ 2 }>
                            <TextField
                                id="desc"
                                label="Deskripsi"
                                fullWidth
                                multiline
                                rows={ 3 }
                                value={ desc }
                                onChange={ ( e ) => setDesc( e.target.value ) }
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
                </>
                <hr />
                <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                    <Button variant='contained' onClick={ handleSave }>Simpan</Button>
                    <Button variant='outlined' onClick={ handleClose }>Batal</Button>
                </Box>
            </Box>


        </Modal>
    )
}

export default ModalAddFunnelsProduct2


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