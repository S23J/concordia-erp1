import React, { useContext, useEffect, useState } from 'react'
import { NavbarComponent } from '../../../../component'
import { AuthContext } from '../../../../auth'
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import axios from '../../../../API/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import ModalAddCategory from '../../../../component/Modal/Admin/ModalAddCategory';

function AddCustomer ()
{
    const { tokens } = useContext( AuthContext );
    const [ addCategory, setAddCategory ] = useState( false );
    const handleAddCategory = () =>
    {
        setAddCategory( true );
    }
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate( -1 )
    }

    const [ customerName, setCustomerName ] = useState( '' );
    const [ customerPic, setCustomerPic ] = useState( '' );
    const [ customerPhone, setCustomerPhone ] = useState( '' );
    const [ customerEmail, setCustomerEmail ] = useState( '' );
    const [ customerMobile, setCustomerMobile ] = useState( '' );
    const [ customerNpwp, setCustomerNpwp ] = useState( '' );
    const [ customerField, setCustomerField ] = useState( '' );
    const [ customerCredit, setCustomerCredit ] = useState( 0 );
    const [ customerCreditScore, setCustomerCreditScore ] = useState( 1 );
    const [ customerTop, setCustomerTop ] = useState( '' );
    const [ customerCategory, setCustomerCategory ] = useState( '' );
    const handleChange = ( event ) =>
    {
        setCustomerCategory( event.target.value );
    };
    const [ listCategory, setListCategory ] = useState( [] );
    function handleChangePrice ( e )
    {
        const inputValue = e.target.value;
        const numericValue = parseFloat( inputValue.replace( /[^\d]/g, '' ) ) || 0;
        setCustomerCredit( numericValue );
    }

    const handleChangeCreditScore = ( event ) =>
    {
        const value = event.target.value;
        if ( value === '' || ( parseInt( value ) >= 1 && parseInt( value ) <= 5 ) ) {
            setCustomerCreditScore( value );
        }
    };


    const fetchListCategory = () =>
    {
        axios.get( `/api/v1/core/custcategories/`,
            {
                headers:
                {
                    withCredentials: true,
                    Authorization: `Token ${tokens?.token}`,
                },

            } )
            .then( res =>
            {

                setListCategory( res.data );
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

        if ( tokens?.token != null ) fetchListCategory()

    }, [ tokens?.token ] );



    const handleSubmit = async ( event ) =>
    {
        event.preventDefault();
        try {
            const data = {
                name: customerName,
                pic: customerPic,
                phone: customerPhone,
                email: customerEmail,
                mobile: customerMobile,
                npwp: customerNpwp,
                field: customerField,
                credit_limit: customerCredit,
                credit_score: customerCreditScore,
                top: customerTop,
                category: customerCategory
            }
            // console.log( data )
            const response = await axios.post( `/api/v1/core/customers/`, data,
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
                title: 'Customer berhasil ditambahkan',
                showConfirmButton: false,
                timer: 2000
            } )

            navigate( '/customer' );
        } catch ( err ) {
            console.log( err )
            Swal.fire( {
                icon: 'error',
                title: 'Warning!',
                text: 'Gagal menambahkan customer',
            } )
        }
    }


    return (
        <>
            <NavbarComponent />
            <Container style={ { minWidth: '90%' } } >
                <form onSubmit={ handleSubmit } autoComplete='off'>
                    <Grid container spacing={ 3 } >
                        <Grid item md={ 12 } xs={ 12 } marginY={ 5 } >
                            <h2 style={ { fontFamily: 'Poppins-Regular', textAlign: 'center' } }>
                                Tambah Customer
                            </h2>
                        </Grid>
                    </Grid>
                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="name"
                                fullWidth
                                required
                                label="Nama Perusahaan"
                                value={ customerName }
                                onChange={ ( event ) =>
                                {
                                    setCustomerName( event.target.value );
                                } }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="pic"
                                fullWidth
                                required
                                label="Nama Personal Kontak"
                                value={ customerPic }
                                onChange={ ( event ) =>
                                {
                                    setCustomerPic( event.target.value );
                                } }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="phone"
                                fullWidth
                                type='number'
                                required
                                label="No. Telp Perusahaan"
                                value={ customerPhone }
                                onChange={ ( event ) =>
                                {
                                    setCustomerPhone( event.target.value );
                                } }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="email"
                                fullWidth
                                required
                                label="Email Perusahaan"
                                value={ customerEmail }
                                onChange={ ( event ) =>
                                {
                                    setCustomerEmail( event.target.value );
                                } }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <Stack spacing={ 2 } direction="row">
                                <FormControl fullWidth sx={ styleForm }>
                                    <InputLabel id="demo-simple-select-label">Kategori Perusahaan *</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={ customerCategory }
                                        label="Kategori Pelanggan"
                                        required
                                        onChange={ handleChange }
                                        sx={ {
                                            '& .MuiSelect-select.MuiSelect-select': {
                                                fontFamily: 'Poppins-Light',
                                                fontSize: '16px',
                                            },
                                        } }
                                    >
                                        { listCategory.map( ( data ) => (
                                            <MenuItem key={ data.id } value={ data.id } sx={ selectFormValue }>
                                                { data.name }
                                            </MenuItem>
                                        ) ) }
                                    </Select>
                                </FormControl>
                                <Button variant='contained' style={ { minHeight: '50px' } } onClick={ handleAddCategory }>
                                    <IoIosAddCircleOutline size={ 30 } />
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="mobile"
                                fullWidth
                                type='number'
                                required
                                label="No. Hp Personal Kontak"
                                value={ customerMobile }
                                onChange={ ( event ) =>
                                {
                                    setCustomerMobile( event.target.value );
                                } }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="npwp"
                                fullWidth
                                required
                                label="NPWP Perusahaan"
                                value={ customerNpwp }
                                onChange={ ( event ) =>
                                {
                                    setCustomerNpwp( event.target.value );
                                } }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="field"
                                fullWidth
                                required
                                label="Bidang Industri Perusahaan"
                                value={ customerField }
                                onChange={ ( event ) =>
                                {
                                    setCustomerField( event.target.value );
                                } }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="creditLimit"
                                fullWidth
                                type='text'
                                required
                                label="Batas Kredit Pelanggan"
                                value={ `Rp ${customerCredit.toLocaleString()}` }
                                onChange={ handleChangePrice }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="creditScore"
                                type='number'
                                fullWidth
                                required
                                label="Kredit Skor Pelanggan"
                                inputProps={ {
                                    max: 5,
                                    min: 1
                                } }
                                value={ customerCreditScore }
                                onChange={ handleChangeCreditScore }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ 4 }>
                            <TextField
                                id="customerTop"
                                type='number'
                                fullWidth
                                label="Jangka Waktu Pembayaran Pelanggan"
                                required
                                value={ customerTop }
                                onChange={ ( event ) =>
                                {
                                    setCustomerTop( event.target.value );
                                } }
                                variant="outlined"
                                sx={ styleForm }
                            />
                        </Grid>
                    </Grid>
                    <div>
                        <Stack spacing={ 2 } direction="row" marginY={ 3 }>
                            <Button
                                type="submit"
                                variant='contained'
                                id='tabelButton'
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
                    </div>
                </form>
            </Container>
            <ModalAddCategory
                addCategory={ addCategory }
                setAddCategory={ setAddCategory }
                fetchListCategory={ fetchListCategory }
            />
        </>
    )
}

export default AddCustomer


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




