import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../auth';
import { NavbarComponent } from '../../../component';
import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Typography, styled } from '@mui/material';
import Swal from 'sweetalert2';
import axios from '../../../API/axios';
import { MdCloudUpload } from "react-icons/md";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function AddNewOrderRequest() {

    const { userInfo, tokens } = useContext(AuthContext);
    const [listFunnels, setListFunnels] = useState([])
    const [listCustomer, setListCustomer] = useState([])
    const [selectedFunnel, setSelectedFunnel] = useState('')
    const [selectedCust, setSelectedCust] = useState('')
    const [PO_Doc, setPO_Doc] = useState([])
    const [Form_Pic, setForm_Pic] = useState([])
    const [NPWP_Pic, setNPWP_Pic] = useState([])
    const [isNewCustomer, setIsNewCustomer] = useState('new')
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1)
    }

    const handleChangeCustomer = (event) => { setIsNewCustomer(event.target.value) }

    const fetchListCustomer = async () => {
        try {
            const response = await axios.get(`/api/v1/core/customers/`,
                {
                    headers:
                    {
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },

                })
            setListCustomer(response.data)
        }
        catch (err) {
            if (err.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Sesi telah habis',
                    text: 'Sesi anda telah berakhir. Silahkan login kembali.',
                    confirmButtonText: 'Log In',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                });

            } else (console.log(err))
        }
    }

    const fetchListFunnels = async () => {
        try {

            const response = await axios.get(`/api/v1/crm/funnels/`,
                {
                    headers:
                    {
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },

                })

            const filteredData = response.data.filter(item => item.sales === userInfo?.id);
            setListFunnels(filteredData);
        }
        catch (err) {
            if (err.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Sesi telah habis',
                    text: 'Sesi anda telah berakhir. Silahkan login kembali.',
                    confirmButtonText: 'Log In',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                });

            } else (console.log(err))
        }
    }

    useEffect(() => {

        if (tokens?.token != null) fetchListCustomer()

    }, [tokens?.token]);

    useEffect(() => {

        if (userInfo?.id != null) fetchListFunnels()

    }, [userInfo?.id]);

    const handleSubmit = async (event) => {
        event.preventDefault();


        const dataNew = {
            sales: userInfo.id,
            funnel: selectedFunnel,
            po_doc: PO_Doc[0],
            form_pic: Form_Pic[0],
            npwp_pic: NPWP_Pic[0]
        }
        const dataExist = {
            sales: userInfo.id,
            funnel: selectedFunnel,
            po_doc: PO_Doc[0],
            customer: selectedCust,
        }

        const formdataNew = new FormData();
        Object.keys(dataNew).forEach(key => {
            formdataNew.append(key, dataNew[key]);
        });

        const formdataExist = new FormData();
        Object.keys(dataExist).forEach(key => {
            formdataExist.append(key, dataExist[key]);
        });



        try {
            const response = await axios.post(`/api/v1/crm/orderrequest/`, isNewCustomer === 'new' ? formdataNew : formdataExist,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            Swal.fire({
                icon: 'success',
                title: 'Order Request berhasil ditambahkan',
                showConfirmButton: false,
                timer: 2000
            })

            navigate('/order-request');
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Warning!',
                text: 'Gagal menambahkan customer',
            })
        }
    }

    return (
        <>
            <NavbarComponent />
            <Container >
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <Grid container justifyContent={'center'} spacing={3}  >
                        <Grid item md={12} xs={12} marginTop={2} >
                            <h2 style={{ fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                                Buat Order Request Baru
                            </h2>
                            <h5 style={{ fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                                Sales: {userInfo?.first_name} {userInfo?.last_name}
                            </h5>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3} marginTop={3}> {/* Add spacing between grid containers */}
                                <Grid item md={4} xs={12}>
                                    <Grid container spacing={3} marginBottom={2}> {/* Add spacing between grid items and set marginBottom */}
                                        <Grid item md={12} xs={12}>
                                            <FormControl fullWidth sx={styleForm}>
                                                <InputLabel id="demo-simple-select-label">Nomor Funnel</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={selectedFunnel}
                                                    label="Funnel Nomor"
                                                    required
                                                    onChange={(event) => {
                                                        setSelectedFunnel(event.target.value)
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-select.MuiSelect-select': {
                                                            fontFamily: 'Poppins-Light',
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                >
                                                    {listFunnels.map((data) => (
                                                        <MenuItem key={data.id} value={data.id} sx={selectFormValue}>
                                                            {data.funnel_no}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                            </FormControl>
                                        </Grid>
                                        <Grid item md={12} xs={12}>
                                            <FormControl fullWidth style={{ gap: 5 }} sx={styleForm}>
                                                <FormLabel id="radio-buttons-customer">PO Document :</FormLabel>
                                                <Button
                                                    component="label"
                                                    role={undefined}
                                                    aria-labelledby="radio-buttons-customer"
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<MdCloudUpload />}
                                                >
                                                    Upload file
                                                    <VisuallyHiddenInput accept=".doc,.docx,.pdf,.txt" onChange={(event) => setPO_Doc(event.target.files)} type="file" />
                                                </Button>
                                                <Typography style={{ fontFamily: 'Poppins-Regular' }} variant='caption'>file : {PO_Doc[0]?.name}</Typography>
                                            </FormControl>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={ 5 } xs={ 12 }>
                                    <Grid container spacing={2} marginBottom={2}> {/* Add spacing between grid items and set marginBottom */}
                                        <Grid item md={12} xs={12}>
                                            <FormControl fullWidth sx={styleForm}>
                                                <FormLabel id="radio-buttons-customer">Pelanggan</FormLabel>
                                                <RadioGroup
                                                    row
                                                    defaultValue={ isNewCustomer }
                                                    onChange={ handleChangeCustomer }
                                                    aria-labelledby="radio-buttons-customer"
                                                    name="row-radio-buttons-group"
                                                >
                                                    <FormControlLabel
                                                        value='new'
                                                        control={ <Radio /> }
                                                        label="Pelanggan Baru"
                                                        style={ { fontFamily: 'Poppins-Medium' } } // Add style prop here
                                                    />
                                                    <FormControlLabel
                                                        value='exist'
                                                        control={ <Radio /> }
                                                        label="Bukan Pelanggan Baru"
                                                        style={ { fontFamily: 'Poppins-Medium' } } // Add style prop here
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={12} xs={12}>

                                            {isNewCustomer === 'new' ?
                                                (<>
                                                    <FormControl fullWidth style={{ gap: 5, marginBottom: 10 }} sx={styleForm}>
                                                        <FormLabel id="radio-buttons-customer">Form Pelanggan : </FormLabel>
                                                        <Button
                                                            component="label"
                                                            role={undefined}
                                                            aria-labelledby="radio-buttons-customer"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<MdCloudUpload />}
                                                        >
                                                            Upload file
                                                            <VisuallyHiddenInput accept="image/*" onChange={(event) => setForm_Pic(event.target.files)} type="file" />
                                                        </Button>
                                                        <Typography style={{ fontFamily: 'Poppins-Regular' }} variant='caption'>file : {Form_Pic[0]?.name}</Typography>
                                                    </FormControl>
                                                    <FormControl fullWidth style={{ gap: 5 }} sx={styleForm}>
                                                        <FormLabel id="radio-buttons-customer">NPWP Pelanggan : </FormLabel>
                                                        <Button
                                                            component="label"
                                                            role={undefined}
                                                            aria-labelledby="radio-buttons-customer"
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<MdCloudUpload />}
                                                        >
                                                            Upload file
                                                            <VisuallyHiddenInput accept="image/*" onChange={(event) => setNPWP_Pic(event.target.files)} type="file" />
                                                        </Button>
                                                        <Typography style={{ fontFamily: 'Poppins-Regular' }} variant='caption'>file : {NPWP_Pic[0]?.name}</Typography>
                                                    </FormControl>
                                                </>)
                                                : (
                                                    <FormControl fullWidth style={{ marginTop: 10 }} sx={styleForm}>
                                                        <InputLabel id="demo-simple-select-label">Pelanggan</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={selectedCust}
                                                            label="Funnel Nomor"
                                                            required
                                                            onChange={(event) => {
                                                                setSelectedCust(event.target.value)
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-select.MuiSelect-select': {
                                                                    fontFamily: 'Poppins-Light',
                                                                    fontSize: '16px',
                                                                },
                                                            }}
                                                        >
                                                            {listCustomer.map((data) => (
                                                                <MenuItem key={data.id} value={data.id} sx={selectFormValue}>
                                                                    {data.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={ 3 } xs={ 12 } style={ { marginBottom: 20 } }>
                                    <Grid item md={12} xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Stack spacing={2} direction="row">
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
                                                onClick={handleBack}
                                                id='tabelButton'
                                                style={{ backgroundColor: 'gray' }}
                                            >
                                                Kembali
                                            </Button>
                                        </Stack>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container >
        </>
    )
}

export default AddNewOrderRequest
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
