import { Box, Modal, Typography, IconButton, TextField, Grid, Button, Alert, Container, MenuItem, Select, InputLabel, Divider, Stack } from '@mui/material';
import { IoCloseOutline } from "react-icons/io5";
import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from '../../../../API/axios';
import { AuthContext } from '../../../../auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { numberFormat } from '../../../../utils';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { LinearProgressWithLabel } from '../../../LinearProgressWithLabel';
import { Formik } from 'formik';

function ModalApproval({
    open,
    id,
    toogleOpenModalApproval,
    setVisibilityModalApproval,
    fetchListFunnels,
}) {

    const { userInfo, tokens } = useContext(AuthContext)
    const [dataFunnel, setDataFunnel] = useState()
    const [dataFunnelDetail, setDataFunnelDetail] = useState([])
    const [dataSales, setDataSales] = useState([])
    const [status, setStatus] = useState(20)
    const isMobile = useMediaQuery({ maxWidth: 767 });


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: 'white',
        boxShadow: 24,

    };


    const navigate = useNavigate();


    const getColumns = () => [
        {
            header: 'Produk',
            accessorKey: 'product',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Qty',
            accessorKey: 'qty',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Harga',
            accessorFn: row => (
                <p>
                    {numberFormat(row.price)}
                </p>
            ),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Sub Total',
            accessorFn: row => (
                <p>
                    {numberFormat(row.subtotal)}
                </p>
            ),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },

    ];


    const columns = getColumns();


    const table = useMantineReactTable({
        columns,
        enableDensityToggle: false,
        initialState: { density: 'xs' },
        data: dataFunnelDetail,
        enableRowNumbers: true,
        rowNumberMode: 'static',
        enableGlobalFilter: false,
        enableColumnResizing: false,
        isMultiSortEvent: () => true,
        mantineTableProps: {
            striped: true,

        },
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
            </Box>
        ),

    });

    const fetchFunnelsDataDetail = async (id) => {
        try {
            const response = await axios.get(`/api/v1/crm/funneldetails/`, {
                headers: {
                    withCredentials: true,
                    Authorization: `Token ${tokens?.token}`,
                },
            })
            const filteredData = response.data.filter(item => item.funnel === id);
            setDataFunnelDetail(filteredData);
            // console.log( filteredData )
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
            } else {
                console.log(err);
            }
        }
    }

    const fetchDataSalesFunnel = async (id) => {
        try {
            const response = await axios.get(`/api/v1/profiles/profiles/users/${id}/`, {
                headers: {
                    withCredentials: true,
                    Authorization: `Token ${tokens?.token}`,
                },
            })

            setDataSales(response.data);
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
            } else {
                console.log(err);
            }
        }
    }

    const statusSwitchCase = (status) => {
        switch (status) {
            case 0:
                return '0% - Gagal';
            case 20:
                return '20% - Lead';
            case 40:
                return '40% - Permintaan Harga';
            case 60:
                return 'Penawaran Harga';
            case 80:
                return '80% - Menunggu PO';
            case 100:
                return '100% - Done';
            default:
                return ''
        }
    }

    const fetchDataFunnels = async () => {
        try {
            const response = await axios.get(`/api/v1/crm/funnels/${id}/`,
                {
                    headers:
                    {
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },
                })
            setDataFunnel(response.data)
            setStatus(response.data.status)
            fetchFunnelsDataDetail(response.data.id)
            fetchDataSalesFunnel(response.data.sales)
            // console.log( response.data )
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Warning!',
                text: 'Something is wrong',
            })
        }
    }



    const defaultValue = {
        customer: dataFunnel?.customer || '',
        contact_person: dataFunnel?.contact_person || '',
        email: dataFunnel?.email || '',
        phone: dataFunnel?.phone || '',
        position: dataFunnel?.position || '',
        remarks: dataFunnel?.remarks || '',
        total: parseFloat( dataFunnel?.total ) || '',
        ppn: parseFloat( dataFunnel?.ppn ) || '',
        grand_total: parseFloat( dataFunnel?.grand_total ) || '',

    };


    const submitApproval = async (title, value) => {
        toogleOpenModalApproval()
        const confirmDelete = await Swal.fire({
            title: `Apakah anda yakin ${title} funnel ini?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: title,
            cancelButtonText: 'Batal',
        });

        const data = {
            approval: value
        }

        if (!confirmDelete.isConfirmed) {
            setVisibilityModalApproval(true)
        } else {
            try {
                const response = await axios.patch(`/api/v1/crm/funnels/${dataFunnel?.id}/`,
                    data,
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            withCredentials: true,
                            Authorization: `Token ${tokens.token}`,
                        },
                    }
                );

                Swal.fire({
                    icon: 'success',
                    title: `${title} Funnel berhasil`,
                    showConfirmButton: false,
                    timer: 2000
                })
                fetchListFunnels()

            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Warning!',
                    text: 'Something Wrong!',
                });
            }
        }

    }

    useEffect(() => {

        if (id != null) fetchDataFunnels()

    }, [id]);

    return (
        <Modal
            open={open}
            onClose={toogleOpenModalApproval}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Grid container>
                    <Grid p={3} item container xs={12} sx={{ overflow: 'auto', maxHeight: '75vh', height: '75vh', }}>
                        <Grid container spacing={3} >
                            <Grid item md={12} xs={12} marginTop={3} >
                                <h3 style={{ fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                                    {dataFunnel?.funnel_no}
                                </h3>
                                <h5 style={{ fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                                    Sales: {dataSales?.first_name} {dataSales?.last_name}
                                </h5>
                                <h5 style={{ fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                                    Tanggal: {dataFunnel?.created_at}
                                </h5>
                            </Grid>

                        </Grid>

                        <Grid container spacing={3} marginTop={3}> {/* Add spacing between grid containers */}

                            <Formik
                                initialValues={ defaultValue }
                                enableReinitialize={ true }
                            >
                                { ( {
                                    values,
                                } ) => (
                                    <>
                                        <Grid item md={ 4 } xs={ 12 }>
                                            <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                                <Grid item xs={ 12 }>
                                                    <TextField
                                                        id="customer"
                                                        fullWidth
                                                        InputProps={ {
                                                            readOnly: true,
                                                        } }
                                                        readOnly
                                                        label="Pelanggan"
                                                        value={ values.customer }
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
                                                        value={ values.contact_person }
                                                        variant="outlined"
                                                        sx={ styleForm }
                                                        InputProps={ {
                                                            readOnly: true,
                                                        } }
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
                                                        value={ values.phone }
                                                        variant="outlined"
                                                        sx={ styleForm }
                                                        InputProps={ {
                                                            readOnly: true,
                                                        } }
                                                    />
                                                </Grid>
                                                <Grid item xs={ 12 }>
                                                    <TextField
                                                        id="email"
                                                        type='email'
                                                        required
                                                        fullWidth
                                                        label="Email"
                                                        value={ values.email }
                                                        variant="outlined"
                                                        sx={ styleForm }
                                                        InputProps={ {
                                                            readOnly: true,
                                                        } }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={ 4 } xs={ 12 }>
                                            <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                                <Grid item md={ 12 } xs={ 12 }>
                                                    <TextField
                                                        id="position"
                                                        fullWidth
                                                        required
                                                        label="Posisi"
                                                        value={ values.position }
                                                        InputProps={ {
                                                            readOnly: true,
                                                        } }
                                                        variant="outlined"
                                                        sx={ styleForm }
                                                    />
                                                </Grid>
                                                <Grid item md={ 12 } xs={ 12 }>
                                                    <TextField
                                                        id="catatan"
                                                        label="Catatan"
                                                        value={ values.remarks }
                                                        fullWidth
                                                        multiline
                                                        rows={ 8 }
                                                        InputProps={ {
                                                            readOnly: true,
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
                                                        value={ numberFormat( values.total ) }
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
                                                        value={ numberFormat( values.ppn ) }
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
                                                        value={ numberFormat( values.grand_total ) }
                                                        sx={ styleForm }
                                                    />
                                                </Grid>

                                            </Grid>
                                            <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                                <Grid item md={ 12 } xs={ 12 }>
                                                    <Typography sx={ {
                                                        fontFamily: 'Poppins-Regular',
                                                    } } variant='h6'>Status : { statusSwitchCase( dataFunnel?.status ) }</Typography>
                                                    <LinearProgressWithLabel value={ dataFunnel?.status } />
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </>

                                ) }
                            </Formik>
                        </Grid>
                        <Grid container spacing={3} marginTop={3}>
                            <Grid item xs={12}>
                                <Box sx={{ overflow: "auto" }} marginBottom={5}>
                                    <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                                        <MantineReactTable
                                            table={table}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} p={1} sx={{ backgroundColor: '#ECECEC', maxHeight: '15vh', height: '15vh', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Grid container item xs={12} md={6} p={1} sx={{ gap: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                            {dataFunnel?.approval === null ? <></> : (
                                <Typography variant="h6" sx={{
                                    fontFamily: 'Poppins-Regular',
                                }}> Status Approval : {dataFunnel?.approval === true ? 'Approve' : 'Tidak Approve'}</Typography>
                            )}
                        </Grid>
                        <Grid container item xs={12} md={6} sx={{ gap: 1, justifyContent: 'flex-end' }}>
                            <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem />}
                                spacing={0.5}
                                useFlexGap flexWrap="wrap"
                                p={0.1}
                            >
                                {dataFunnel?.approval !== null ? <></> : (
                                    <>
                                        <Button disableElevation onClick={() => submitApproval('Approve', true)} size="small" color='success' variant="contained">Approve</Button>
                                        <Button disableElevation onClick={() => submitApproval('Tidak Approve', false)} size="small" color='error' variant="contained">Tidak Approve</Button>
                                    </>
                                )}
                                <Button disableElevation onClick={toogleOpenModalApproval} style={{ backgroundColor: '#a5a5a5' }} size="small" color='secondary' disableTouchRipple disableFocusRipple variant="contained">Kembali</Button>
                            </Stack>
                        </Grid>
                    </Grid>

                </Grid>

            </Box>
        </Modal >
    )
}

export default ModalApproval;

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

