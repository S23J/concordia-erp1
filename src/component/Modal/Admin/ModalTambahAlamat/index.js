import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import { AuthContext } from '../../../../auth';
import axios from '../../../../API/axios';
import Swal from 'sweetalert2';

function ModalTambahAlamatBaru ( {
    openModalAddress,
    setOpenModalAddress,
    custid,
    fetchListCustomerAddress
} )
{

    const isMobile = useMediaQuery( { maxWidth: 767 } );
    const { tokens } = useContext( AuthContext );
    const [ addressType, setAddressType ] = useState( '' );
    const handleAddressType = ( event ) =>
    {
        setAddressType( event.target.value );
    };
    const [ city, setCity ] = useState( '' );
    const [ zipCode, setZipCode ] = useState( '' );

    const handleCloseModal = () =>
    {
        setOpenModalAddress( false );
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


    const handleSubmit = async ( event ) =>
    {
        event.preventDefault();
        try {
            const data = {
                customer: custid,
                address_type: addressType,
                city: city,
                zip_code: zipCode,
            }
            // console.log( data )
            const response = await axios.post( `/api/v1/core/custaddresses/`, data,
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
                title: 'Alamat berhasil ditambahkan',
                showConfirmButton: false,
                timer: 2000
            } )
            fetchListCustomerAddress();
        } catch ( err ) {
            console.log( err )
            Swal.fire( {
                icon: 'error',
                title: 'Warning!',
                text: 'Gagal menambahkan alamat',
            } )
        }
    }

    return (
        <Modal
            open={ openModalAddress }
            onClose={ handleCloseModal }
        >

            <Box sx={ style }>
                <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } }>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={ { fontFamily: 'Poppins-Medium' } }>
                        Tambah Alamat Baru
                    </Typography>
                    <IconButton onClick={ handleCloseModal }>
                        <IoCloseOutline />
                    </IconButton>
                </Box>
                <hr />
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
                                            value={ addressType }
                                            label="Tipe Alamat"
                                            required
                                            onChange={ handleAddressType }
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
                                        value={ city }
                                        onChange={ ( event ) =>
                                        {
                                            setCity( event.target.value );
                                        } }
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
                                        value={ zipCode }
                                        onChange={ ( event ) =>
                                        {
                                            setZipCode( event.target.value );
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
                        <Button variant='outlined' onClick={ handleCloseModal }>Batal</Button>
                    </Box>
                </form>
            </Box>



        </Modal>
    )
}

export default ModalTambahAlamatBaru



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
