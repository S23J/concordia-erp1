import { Box, Modal, Typography, IconButton, TextField, Grid, Button } from '@mui/material';
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

    const numberFormat = ( value ) =>
        new Intl.NumberFormat( 'IN-ID', {
            style: 'currency',
            currency: 'IDR'
        } ).format( value );

    const [ productName, setProductName ] = useState( '' );
    const [ qty, setQty ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ desc, setDesc ] = useState( '' );

    const handleSave = () =>
    {
        const newData = {
            product: productName,
            qty: parseInt( qty ),
            price: parseInt( price ),
            desc: desc
        };
        addDataToTable( newData );
        handleClose();
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
                <Grid container spacing={ 1 }>
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
                            type='number'
                            label="Harga"
                            variant="outlined"
                            value={ price }
                            onChange={ ( e ) => setPrice( e.target.value ) }
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
                            sx={ styleForm }
                        />
                    </Grid>
                </Grid>
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
