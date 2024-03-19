import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../auth';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { NavbarComponent } from '../../../../component';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../../API/axios';
import Swal from 'sweetalert2';
import { Field, Formik } from 'formik';
import ModalAddCategory from '../../../../component/Modal/Admin/ModalAddCategory';

function EditCustomer ()
{
    const { tokens } = useContext( AuthContext );
    const { custid } = useParams();
    const [ customerDetail, setCustomerDetail ] = useState( [] );
    const navigate = useNavigate();
    const [ listCategory, setListCategory ] = useState( [] );
    const [ addCategory, setAddCategory ] = useState( false );
    const handleAddCategory = () =>
    {
        setAddCategory( true );
    }
    const handleBack = () =>
    {
        navigate( -1 )
    }
    const [ customerCategory, setCustomerCategory ] = useState( '' );
    // Adjust the handleChangePrice function to set the numeric value in state
    function handleChangePrice ( e, setFieldValue )
    {
        const inputValue = e.target.value;
        const numericValue = parseFloat( inputValue.replace( /[^\d]/g, '' ) ) || 0;
        // Store the numeric value in form state
        setFieldValue( 'credit_limit', numericValue );
    }

    const handleChangeCreditScore = ( e, setFieldValue ) =>
    {
        const value = e.target.value;
        if ( value === '' || ( parseInt( value ) >= 1 && parseInt( value ) <= 5 ) ) {
            setFieldValue( 'credit_score', value );
        }
    };


    const fetchFunnelsDataDetail = () =>
    {
        axios.get( `/api/v1/core/customers/${custid}`, {
            headers: {
                withCredentials: true,
                Authorization: `Token ${tokens?.token}`,
            },
        } )
            .then( res =>
            {

                setCustomerDetail( res.data );
                setCustomerCategory( res.data.category );
                // console.log( res.data )
            } )
            .catch( err =>
            {
                console.log( err );
            } );
    }

    useEffect( () =>
    {
        if ( custid !== undefined ) {
            fetchFunnelsDataDetail();
        } else if ( tokens?.token !== undefined ) {
            fetchFunnelsDataDetail();
        }
    }, [ custid, tokens?.token ] );


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


                ( console.log( err ) )
            } )
    }

    useEffect( () =>
    {

        if ( tokens?.token != null ) fetchListCategory()

    }, [ tokens?.token ] );


    const defaultValue = {
        name: customerDetail?.name || '',
        pic: customerDetail?.pic || '',
        phone: customerDetail?.phone || '',
        email: customerDetail?.email || '',
        mobile: customerDetail?.mobile || '',
        npwp: customerDetail?.npwp || '',
        field: customerDetail?.field || '',
        credit_limit: parseFloat( customerDetail?.credit_limit ) || 0,
        credit_score: customerDetail?.credit_score || '',
        top: customerDetail?.top || '',
        category: customerCategory || '',

    };


    const handleEditCustomer = async ( values ) =>
    {
        // console.log( values )
        try {
            const response = await axios.patch( `/api/v1/core/customers/${custid}/`, values,
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
                title: 'Customer berhasil diubah',
                showConfirmButton: false,
                timer: 2000
            } )
            navigate( '/customer' );
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
                <Formik
                    initialValues={ defaultValue }
                    enableReinitialize={ true }
                    onSubmit={ handleEditCustomer }
                >
                    { ( {
                        handleSubmit,
                        handleChange,
                        values,
                        setFieldValue
                    } ) => (
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
                                        label="Customer Name"
                                        value={ values.name }
                                        onChange={ handleChange( "name" ) }
                                        variant="outlined"
                                        sx={ styleForm }
                                    />
                                </Grid>
                                <Grid item xs={ 12 } md={ 4 }>
                                    <TextField
                                        id="pic"
                                        fullWidth
                                        required
                                        label="Customer PIC"
                                        value={ values.pic }
                                        onChange={ handleChange( "pic" ) }
                                        variant="outlined"
                                        sx={ styleForm }
                                    />
                                </Grid>
                                <Grid item xs={ 12 } md={ 4 }>
                                    <Field name="credit_limit">
                                        { ( { field } ) => (
                                            <TextField
                                                { ...field }
                                                id="credit_limit"
                                                fullWidth
                                                required
                                                type='text'
                                                label="Customer Credit Limit"
                                                variant="outlined"
                                                value={ `Rp ${values.credit_limit.toLocaleString()}` } // Display formatted value
                                                onChange={ ( e ) => handleChangePrice( e, setFieldValue ) }
                                                sx={ styleForm }
                                            />
                                        ) }
                                    </Field>
                                </Grid>
                                <Grid item xs={ 12 } md={ 4 }>
                                    <Stack spacing={ 2 } direction="row">
                                        <FormControl fullWidth sx={ styleForm }>
                                            <InputLabel id="demo-simple-select-label">Customer Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={ values.category || '' } // Ensure that the value is always defined
                                                label="Customer Category"
                                                required
                                                onChange={ ( e ) =>
                                                {
                                                    setFieldValue( "category", e.target.value );
                                                } }
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
                                        required
                                        label="Customer Mobile Phone"
                                        value={ values.mobile }
                                        onChange={ handleChange( "mobile" ) }
                                        variant="outlined"
                                        sx={ styleForm }
                                    />
                                </Grid>
                                <Grid item xs={ 12 } md={ 4 }>
                                    <Field name="credit_score">
                                        { ( { field } ) => (
                                            <TextField
                                                { ...field }
                                                id="credit_score"
                                                type='number'
                                                fullWidth
                                                required
                                                label="Customer Credit Score"
                                                inputProps={ {

                                                    max: 5,
                                                    min: 1
                                                } }
                                                value={ values.credit_score }
                                                onChange={ ( e ) => handleChangeCreditScore( e, setFieldValue ) }
                                                sx={ styleForm }
                                            />
                                        ) }
                                    </Field>
                                </Grid>

                                <Grid item xs={ 12 } md={ 4 }>
                                    <TextField
                                        id="phone"
                                        fullWidth
                                        required
                                        label="Customer Phone"
                                        value={ values.phone }
                                        onChange={ handleChange( "phone" ) }
                                        variant="outlined"
                                        sx={ styleForm }
                                    />
                                </Grid>
                                <Grid item xs={ 12 } md={ 4 }>
                                    <TextField
                                        id="email"
                                        fullWidth
                                        required
                                        label="Customer Email"
                                        value={ values.email }
                                        onChange={ handleChange( "email" ) }
                                        variant="outlined"
                                        sx={ styleForm }
                                    />
                                </Grid>
                                <Grid item xs={ 12 } md={ 4 }>
                                    <TextField
                                        id="customerTop"
                                        type='number'
                                        fullWidth
                                        label="Customer TOP"
                                        required
                                        value={ values.top }
                                        onChange={ handleChange( "top" ) }
                                        variant="outlined"
                                        sx={ styleForm }
                                    />
                                </Grid>
                                <Grid item xs={ 12 } md={ 4 }>
                                    <TextField
                                        id="npwp"
                                        fullWidth
                                        required
                                        label="Customer Npwp"
                                        value={ values.npwp }
                                        onChange={ handleChange( "npwp" ) }
                                        variant="outlined"
                                        sx={ styleForm }
                                    />
                                </Grid>
                                <Grid item xs={ 12 } md={ 4 }>
                                    <TextField
                                        id="field"
                                        fullWidth
                                        required
                                        label="Customer Field"
                                        value={ values.field }
                                        onChange={ handleChange( "field" ) }
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
                            </div>
                        </form>
                    ) }
                </Formik>
            </Container>
            <ModalAddCategory
                addCategory={ addCategory }
                setAddCategory={ setAddCategory }
                fetchListCategory={ fetchListCategory }
            />
        </>
    )
}

export default EditCustomer


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
