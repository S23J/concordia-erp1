import { Box, Modal, Typography, IconButton, TextField, Grid, Button, Alert } from '@mui/material';
import { IoCloseOutline } from "react-icons/io5";
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

function ModalAddFunnelsProduct ( {
    addFunnelsProduct,
    setAddFunnelsProduct,
    addDataToTable
} )
{

    const isMobile = useMediaQuery( { maxWidth: 767 } );
    const [ productName, setProductName ] = useState( '' );
    const [ qty, setQty ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ desc, setDesc ] = useState( '' );
    const [ showAlert, setShowAlert ] = useState( false ); // State for showing the alert

    const handleSave = () =>
    {
        if ( !productName || !qty || !price ) {
            setShowAlert( true ); // Show the alert
            return;
        }
        const subtotal = parseInt( price ) * parseInt( qty );
        const newData = {
            product: productName,
            qty: parseInt( qty ),
            price: parseInt( price ),
            description: desc,
            subtotal: subtotal,
        };
        addDataToTable( newData );
        handleClose();
    };

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


    function handleChangePrice ( e )
    {
        const inputValue = e.target.value;
        const numericValue = parseFloat( inputValue.replace( /[^\d]/g, '' ) ) || 0;
        setPrice( numericValue );
    }


    const handleClose = () =>
    {
        setAddFunnelsProduct( false );
        setProductName( '' );
        setQty( '' );
        setPrice( '' );
        setDesc( '' );
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
                        <Alert severity="warning" onClose={ handleCloseAlert }>Please fill in all required fields.</Alert>
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

export default ModalAddFunnelsProduct;


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
