import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../auth';
import { NavbarComponent } from '../../../component';
import { Button, Container, Grid, Stack } from '@mui/material';
import Swal from 'sweetalert2';

function AddNewOrderRequest ()
{

    const { userInfo, tokens } = useContext( AuthContext );
    const navigate = useNavigate();
    const handleBack = () =>
    {
        navigate( -1 )
    }


    const handleSubmit = async ( event ) =>
    {
        event.preventDefault();
        try {
            // const data = {
            //     name: customerName,
            //     pic: customerPic,
            //     phone: customerPhone,
            //     email: customerEmail,
            //     mobile: customerMobile,
            //     npwp: customerNpwp,
            //     field: customerField,
            //     credit_limit: customerCredit,
            //     credit_score: customerCreditScore,
            //     top: customerTop,
            //     category: customerCategory
            // }
            // // console.log( data )
            // const response = await axios.post( `/api/v1/core/customers/`, data,
            //     {
            //         headers: {
            //             'Access-Control-Allow-Origin': '*',
            //             withCredentials: true,
            //             Authorization: `Token ${tokens?.token}`,
            //         },
            //     }
            // );

            // // console.log( response );
            // Swal.fire( {
            //     icon: 'success',
            //     title: 'Customer berhasil ditambahkan',
            //     showConfirmButton: false,
            //     timer: 2000
            // } )

            // navigate( '/customer' );
        } catch ( err ) {
            // console.log( err )
            // Swal.fire( {
            //     icon: 'error',
            //     title: 'Warning!',
            //     text: 'Gagal menambahkan customer',
            // } )
        }
    }

    return (
        <>
            <NavbarComponent />
            <Container style={ { minWidth: '90%' } } >
                <form onSubmit={ handleSubmit } autoComplete='off'>
                    <Grid container spacing={ 3 } >
                        <Grid item md={ 8 } xs={ 12 } marginTop={ 2 } >
                            <h2 style={ { fontFamily: 'Poppins-Regular', textAlign: 'center' } }>
                                Buat Order Request Baru
                            </h2>
                            <h5 style={ { fontFamily: 'Poppins-Regular', textAlign: 'center' } }>
                                Sales: { userInfo?.first_name } { userInfo?.last_name }
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
                                >
                                    Kembali
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    )
}

export default AddNewOrderRequest
