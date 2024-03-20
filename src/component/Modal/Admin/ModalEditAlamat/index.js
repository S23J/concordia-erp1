import React, { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { AuthContext } from '../../../../auth';
import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { IoCloseOutline } from 'react-icons/io5';
import axios from '../../../../API/axios';
import { Field, Formik } from 'formik';
import Swal from 'sweetalert2';

function ModalUbahAlamat ( {
    modalUbahAlamat,
    setModalUbahAlamat,
    fetchListCustomerAddress,
    idSelected,
} )
{

    const isMobile = useMediaQuery( { maxWidth: 767 } );
    const { tokens } = useContext( AuthContext );
    const [ alamatRetrieve, setAlamatRetrieve ] = useState( [] );
    const [ addressType, setAddressType ] = useState( '' );

    const handleCloseModal = () =>
    {
        fetchFunnelsRetreive();
        setModalUbahAlamat( false );
    }

    const fetchFunnelsRetreive = () =>
    {
        axios.get( `/api/v1/core/custaddresses/${idSelected}/`,
            {
                headers:
                {
                    withCredentials: true,
                    Authorization: `Token ${tokens?.token}`,
                },

            } )
            .then( res =>
            {
                setAlamatRetrieve( res.data )
                setAddressType( res.data.address_type )
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

    const defaultValue = {
        address_type: addressType || '',
        city: alamatRetrieve?.city || '',
        zip_code: alamatRetrieve?.zip_code || 0, // Parse to float
    };

    const handleUbahAlamat = async ( values ) =>
    {
        // console.log( values )
        try {

            const response = await axios.patch( `/api/v1/core/custaddresses/${alamatRetrieve?.id}/`, values,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },
                }
            );

            // console.log( response );
            handleCloseModal( '' )
            Swal.fire( {
                icon: 'success',
                title: 'Alamat berhasil diubah',
                showConfirmButton: false,
                timer: 2000
            } )
            fetchListCustomerAddress();
        } catch ( err ) {
            console.log( err )
            Swal.fire( {
                icon: 'error',
                title: 'Warning!',
                text: 'Gagal mengubah alamat',
            } )
        }
    }

    return (
        <Modal
            open={ modalUbahAlamat }
            onClose={ handleCloseModal }
        >

            <Box sx={ style }>
                <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } }>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={ { fontFamily: 'Poppins-Medium' } }>
                        Ubah Alamat
                    </Typography>
                    <IconButton onClick={ handleCloseModal }>
                        <IoCloseOutline />
                    </IconButton>
                </Box>
                <hr />
                <Formik
                    initialValues={ defaultValue }
                    enableReinitialize={ true }
                    onSubmit={ handleUbahAlamat }
                >
                    { ( {
                        handleSubmit,
                        handleChange,
                        values,
                        setFieldValue
                    } ) => (
                        <form onSubmit={ handleSubmit } autoComplete='off'>
                            <Grid container spacing={ 3 }>
                                <Grid item xs={ 12 }>
                                    <Grid container spacing={ 3 }>
                                        <Grid item xs={ 12 }>
                                            <FormControl fullWidth sx={ styleForm }>
                                                <InputLabel id="demo-simple-select-label">Tipe Alamat</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={ values.address_type || '' } // Ensure that the value is always defined
                                                    label="Customer Category"
                                                    required
                                                    onChange={ ( e ) =>
                                                    {
                                                        setFieldValue( "address_type", e.target.value );
                                                    } }
                                                    sx={ {
                                                        '& .MuiSelect-select.MuiSelect-select': {
                                                            fontFamily: 'Poppins-Light',
                                                            fontSize: '16px',
                                                        },
                                                    } }
                                                >
                                                    <MenuItem value={ 'OF' } sx={ selectFormValue }>Alamat Kantor</MenuItem>
                                                    <MenuItem value={ 'DV' } sx={ selectFormValue }>Alamat Pengiriman</MenuItem>
                                                    <MenuItem value={ 'BL' } sx={ selectFormValue }>Alamat Penagihan</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={ 12 }>
                                            <TextField
                                                id="city"
                                                fullWidth
                                                required
                                                label="Kota"
                                                value={ values.city }
                                                onChange={ handleChange( "city" ) }
                                                variant="outlined"
                                                sx={ styleForm }
                                            />
                                        </Grid>
                                        <Grid item xs={ 12 }>
                                            <TextField
                                                id="zipCode"
                                                fullWidth
                                                required
                                                label="Kode Pos"
                                                value={ values.zip_code }
                                                onChange={ handleChange( "zip_code" ) }
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
                                <Button variant='outlined' onClick={ handleCloseModal }>Batal</Button>
                            </Box>
                        </form>

                    ) }
                </Formik>

            </Box>
        </Modal>
    )
}

export default ModalUbahAlamat


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
