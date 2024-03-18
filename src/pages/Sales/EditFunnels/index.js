import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { NavbarComponent } from '../../../component';
import { AuthContext } from '../../../auth';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';

function EditFunnels ()
{
    const { transid } = useParams();
    const { userInfo, tokens } = useContext( AuthContext );
    console.log( transid )

    return (
        <>
            <NavbarComponent />
            <Container style={ { minWidth: '90%' } } >
                <form autoComplete='off'>
                    <Grid container spacing={ 3 } >
                        <Grid item md={ 8 } xs={ 12 } marginTop={ 2 } >
                            <h2 style={ { fontFamily: 'Poppins-Regular', textAlign: 'center' } }>
                                Buat Funnels Baru
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
                                    // onClick={ handleBack }
                                    id='tabelButton'
                                    style={ { backgroundColor: 'gray' } }
                                >
                                    Kembali
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Container style={ { minWidth: '90%' } }>
                        <Grid container spacing={ 3 } marginTop={ 3 }> {/* Add spacing between grid containers */ }
                            <Grid item md={ 4 } xs={ 12 }>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="customer"
                                            fullWidth
                                            required
                                            label="Pelanggan"
                                            // value={ customer }
                                            // onChange={ ( event ) =>
                                            // {
                                            //     setCustomer( event.target.value );
                                            // } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="contactPerson"
                                            fullWidth
                                            required
                                            label="Kontak"
                                            // value={ contactPerson }
                                            // onChange={ ( event ) =>
                                            // {
                                            //     setContactPerson( event.target.value );
                                            // } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="phone"
                                            type='number'
                                            fullWidth
                                            required
                                            label="No. Telp"
                                            // value={ phone }
                                            // onChange={ ( event ) =>
                                            // {
                                            //     setPhone( event.target.value );
                                            // } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="email"
                                            type='email'
                                            required
                                            fullWidth
                                            label="Email"
                                            // value={ email }
                                            // onChange={ ( event ) =>
                                            // {
                                            //     setEmail( event.target.value );
                                            // } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={ 4 } xs={ 12 } spacing={ 3 }>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="position"
                                            fullWidth
                                            required
                                            label="Posisi"
                                            // value={ position }
                                            // onChange={ ( event ) =>
                                            // {
                                            //     setPosition( event.target.value );
                                            // } }
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <FormControl fullWidth sx={ styleForm }>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={ status }
                                                label="Status"
                                                required
                                                // onChange={ handleChange }
                                                sx={ {
                                                    '& .MuiSelect-select.MuiSelect-select': {
                                                        fontFamily: 'Poppins-Light',
                                                        fontSize: '16px',
                                                    },
                                                } }
                                            >
                                                {/* <MenuItem value={ 20 } sx={ selectFormValue }>20%-Lead</MenuItem>
                                                <MenuItem value={ 40 } sx={ selectFormValue }>40%-Permintaan Harga</MenuItem>
                                                <MenuItem value={ 60 } sx={ selectFormValue }>60%-Penawaran Harga</MenuItem>
                                                <MenuItem value={ 80 } sx={ selectFormValue }>80%-Menunggu PO</MenuItem>
                                                <MenuItem value={ 100 } sx={ selectFormValue }>100%-Done</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="catatan"
                                            label="Catatan"
                                            // value={ remark }
                                            // onChange={ ( event ) =>
                                            // {
                                            //     setRemark( event.target.value );
                                            // } }
                                            fullWidth
                                            multiline
                                            rows={ 4.5 }
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

                            </Grid>

                            <Grid item md={ 4 } xs={ 12 }>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="total"
                                            fullWidth
                                            type='text'
                                            InputProps={ {
                                                readOnly: true,
                                            } }
                                            label="Total"
                                            variant="outlined"
                                            // value={ numberFormat( total ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="ppn"
                                            fullWidth
                                            type='number'
                                            required
                                            label="PPN (%)"
                                            variant="outlined"
                                            // value={ ppn }
                                            // onChange={ ( e ) => setPpn( e.target.value ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="ppnAmount"
                                            fullWidth
                                            type='text'
                                            InputProps={ {
                                                readOnly: true,
                                            } }
                                            label="Jumlah PPN"
                                            variant="outlined"
                                            // value={ numberFormat( ppnAmount ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item md={ 12 } xs={ 12 }>
                                        <TextField
                                            id="grandTotal"
                                            fullWidth
                                            type='text'
                                            InputProps={ {
                                                readOnly: true,
                                            } }
                                            label="Grand Total"
                                            variant="outlined"
                                            // value={ numberFormat( grandTotal ) }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                    </Container>
                    <Container>
                        <Box sx={ { overflow: "auto" } } marginBottom={ 5 }>
                            <Box sx={ { width: "100%", display: "table", tableLayout: "fixed" } }>
                                {/* <MantineReactTable
                                    table={ table }
                                /> */}
                            </Box>
                        </Box>
                    </Container>
                </form>
            </Container>
        </>
    )
}

export default EditFunnels


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