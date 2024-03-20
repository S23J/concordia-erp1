
import React, { useContext, useState } from 'react'
import axios from '../../../../API/axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../auth';
import { useMediaQuery } from 'react-responsive';
import { IoCloseOutline } from 'react-icons/io5';
import { Box, Button, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';

function ModalAddCategory ( {
    addCategory,
    setAddCategory,
    fetchListCategory
} )
{

    const { tokens } = useContext( AuthContext );
    const [ categoryName, setCategoryName ] = useState( '' );
    const isMobile = useMediaQuery( { maxWidth: 767 } );

    const handleClose = () =>
    {
        setAddCategory( false );
        setCategoryName( '' )
    }

    const handleSubmit = async ( event ) =>
    {
        event.preventDefault();
        try {
            const data = {
                name: categoryName,
            }
            // console.log( data )
            const response = await axios.post( `/api/v1/core/custcategories/`, data,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },
                }
            );

            // console.log( response );
            handleClose();
            Swal.fire( {
                icon: 'success',
                title: 'Customer Kategori berhasil ditambahkan',
                showConfirmButton: false,
                timer: 2000
            } )
            fetchListCategory();
        } catch ( err ) {
            console.log( err )
            Swal.fire( {
                icon: 'error',
                title: 'Warning!',
                text: 'Something is wrong',
            } )
        }
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '100%' : 500,
        bgcolor: 'background.paper',
        border: '2px solid #01155C',
        boxShadow: 24,
        p: 4,
        maxHeight: '80vh', // Adjust this value as needed
        overflowY: 'auto', // Enable vertical scrolling
    };


    return (

        <Modal
            open={ addCategory }
            onClose={ handleClose }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ style }>
                <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } }>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={ { fontFamily: 'Poppins-Medium' } }>
                        Tambah Kategori
                    </Typography>
                    <IconButton onClick={ handleClose }>
                        <IoCloseOutline />
                    </IconButton>
                </Box>
                <hr />
                <form onSubmit={ handleSubmit } autoComplete='off'>
                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 }>
                            <Grid container spacing={ 3 }>
                                <Grid item xs={ 12 }>
                                    <TextField
                                        id="category"
                                        fullWidth
                                        required
                                        label="Kategori"
                                        value={ categoryName }
                                        onChange={ ( event ) =>
                                        {
                                            setCategoryName( event.target.value );
                                        } }
                                        variant="outlined"
                                        sx={ styleForm }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr />
                    <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                        <Button variant='contained' type='submit'>Simpan</Button>
                        <Button variant='outlined' onClick={ handleClose }>Batal</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalAddCategory


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