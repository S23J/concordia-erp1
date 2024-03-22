import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../auth';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';
import { IoIosAddCircleOutline } from 'react-icons/io';
import {
    ModalAddCategory,
    ModalTambahAlamatBaru,
    ModalUbahAlamat,
    NavbarComponent,
    RatingComponent
} from '../../../../component';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../../API/axios';
import Swal from 'sweetalert2';
import { Field, Formik } from 'formik';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Flex } from '@mantine/core';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';



function EditCustomer() {
    const { tokens } = useContext(AuthContext);
    const { custid } = useParams();
    const navigate = useNavigate();

    const [customerDetail, setCustomerDetail] = useState([]);
    const [customerAddress, setCustomerAddress] = useState([])
    const [ratingValue, setRatingValue] = useState(0);

    const [listCategory, setListCategory] = useState([]);
    const [addCategory, setAddCategory] = useState(false);
    const handleAddCategory = () => {
        setAddCategory(true);
    }
    const [openModalAddress, setOpenModalAddress] = useState(false);
    const handleOpen = () => {
        setOpenModalAddress(true);
    }
    const [modalUbahAlamat, setModalUbahAlamat] = useState(false);
    const [idSelected, setIdSelected] = useState();
    const handleOpenUbahAlamat = (row) => {
        setIdSelected(row.id)
        setModalUbahAlamat(true);
    }
    const handleBack = () => {
        navigate(-1)
    }
    const [customerCategory, setCustomerCategory] = useState('');
    // Adjust the handleChangePrice function to set the numeric value in state
    function handleChangePrice(e, setFieldValue) {
        const inputValue = e.target.value;
        const numericValue = parseFloat(inputValue.replace(/[^\d]/g, '')) || 0;
        // Store the numeric value in form state
        setFieldValue('credit_limit', numericValue);
    }




    const fetchFunnelsDataDetail = async () => {
        try {
            const response = await axios.get(`/api/v1/core/customers/${custid}`, {
                headers: {
                    withCredentials: true,
                    Authorization: `Token ${tokens?.token}`,
                },
            })
            setCustomerDetail(response.data);
            setCustomerCategory(response.data.category);
            setRatingValue(response.data.credit_score);
            // console.log( res.data )
        } catch (err) {
            console.log(err);
        };
    }

    useEffect(() => {
        if (custid !== undefined) {
            fetchFunnelsDataDetail();
        } else if (tokens?.token !== undefined) {
            fetchFunnelsDataDetail();
        }
    }, [custid, tokens?.token]);


    const fetchListCategory = async () => {
        try {
            const response = await axios.get(`/api/v1/core/custcategories/`,
                {
                    headers:
                    {
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },

                })
            setListCategory(response.data);
            // console.log( res.data )
        } catch (err) {
            (console.log(err))
        }
    }

    useEffect(() => {

        if (tokens?.token != null) fetchListCategory()

    }, [tokens?.token]);


    const fetchListCustomerAddress = async () => {
        try {
            const response = await axios.get(`/api/v1/core/custaddresses/`,
                {
                    headers:
                    {
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },

                })
            const filteredData = response.data.filter(item => item.customer === customerDetail.id);
            setCustomerAddress(filteredData);
        } catch (err) {
            (console.log(err))
        }
    }

    useEffect(() => {

        if (customerDetail.id !== undefined) {
            fetchListCustomerAddress();
        } else if (tokens?.token !== undefined) {
            fetchListCustomerAddress();
        }
    }, [customerDetail.id, tokens?.token]);



    const handleDelete = async (rowId) => {
        const result = await Swal.fire({
            title: 'Apakah anda yakin ingin menghapus alamat ini?',
            text: 'Anda tidak dapat mengembalikan alamat ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus alamat',
            cancelButtonText: 'Batalkan',
        });


        if (result.isConfirmed) {
            try {

                const responseDelete = await axios.delete(`/api/v1/core/custaddresses/${rowId}/`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        withCredentials: true,
                    },
                });
                fetchListCustomerAddress();
                // console.log( responseDelete )
                Swal.fire('Terhapus!', '', 'success');

            } catch (err) {
                console.log(err);
                Swal.fire('Error', 'Terjadi kesalahan saat menghapus!', 'error');

            }
        } else {
            Swal.fire('Dibatalkan', '', 'info');
        }
    };




    const getColumns = () => [
        {
            header: 'Tipe Alamat',
            accessorFn: row => (
                <>
                    {(() => {
                        switch (row?.address_type) {
                            case 'OF':
                                return <span >Alamat Kantor</span>;
                            case 'BL':
                                return <span >Alamat Pengiriman</span>;
                            case 'DV':
                                return <span >Alamat Penagihan</span>;
                            default:
                                return null;
                        }
                    })()}
                </>
            ),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Kota',
            accessorKey: 'city',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Kode Pos',
            accessorKey: 'zip_code',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Ubah',
            accessorFn: (row) => (
                <IconButton aria-label="edit" color="secondary" onClick={() => { handleOpenUbahAlamat(row) }} >
                    <MdEdit />
                </IconButton>
            ),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Hapus',
            accessorFn: (row) => (
                <IconButton aria-label="delete" color="error" onClick={() => handleDelete(row.id)} >
                    <AiFillDelete />
                </IconButton>
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
        data: customerAddress,
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
                <p style={{ fontFamily: 'Poppins-Medium' }}>
                    Daftar Alamat Perusahaan
                </p>
            </Box>
        ),
        renderToolbarInternalActions: ({ table }) => (
            <Flex gap="xs" align="center">
                {/* add custom button to print table  */}
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    id='tabelButton'
                >
                    Tambah Alamat
                </Button>
            </Flex>
        ),
    });


    const defaultValue = {
        name: customerDetail?.name || '',
        pic: customerDetail?.pic || '',
        phone: customerDetail?.phone || '',
        email: customerDetail?.email || '',
        mobile: customerDetail?.mobile || '',
        npwp: customerDetail?.npwp || '',
        field: customerDetail?.field || '',
        credit_limit: parseFloat(customerDetail?.credit_limit) || 0,
        credit_score: customerDetail?.credit_score || '',
        top: customerDetail?.top || '',
        category: customerCategory || '',

    };


    const handleEditCustomer = async (values) => {
        // console.log( values )
        const finalData = {
            ...values,
            credit_score: ratingValue
        }

        try {
            const response = await axios.patch(`/api/v1/core/customers/${custid}/`, finalData,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },
                }
            );

            // console.log( response );
            Swal.fire({
                icon: 'success',
                title: 'Customer berhasil diubah',
                showConfirmButton: false,
                timer: 2000
            })
            navigate('/customer');
        } catch (err) {
            console.log(err)

            Swal.fire({
                icon: 'error',
                title: 'Warning!',
                text: 'Something is wrong',
            })
        }
    }

    return (
        <>
            <NavbarComponent />
            <Container style={{ minWidth: '90%' }} >
                <Formik
                    initialValues={defaultValue}
                    enableReinitialize={true}
                    onSubmit={handleEditCustomer}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit} autoComplete='off'>
                            <Grid container spacing={3} >
                                <Grid item md={12} xs={12} marginY={5} >
                                    <h2 style={{ fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                                        Data Perusahaan
                                    </h2>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        id="name"
                                        fullWidth
                                        required
                                        label="Nama Perusahaan"
                                        value={values.name}
                                        onChange={handleChange("name")}
                                        variant="outlined"
                                        sx={styleForm}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        id="pic"
                                        fullWidth
                                        required
                                        label="Nama Personal Kontak"
                                        value={values.pic}
                                        onChange={handleChange("pic")}
                                        variant="outlined"
                                        sx={styleForm}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        id="phone"
                                        fullWidth
                                        required
                                        label="No. Telp Perusahaan"
                                        value={values.phone}
                                        onChange={handleChange("phone")}
                                        variant="outlined"
                                        sx={styleForm}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        id="email"
                                        fullWidth
                                        required
                                        label="Email Perusahaan"
                                        value={values.email}
                                        onChange={handleChange("email")}
                                        variant="outlined"
                                        sx={styleForm}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={2} direction="row">
                                        <FormControl fullWidth sx={styleForm}>
                                            <InputLabel id="demo-simple-select-label">Kategori Perusahaan *</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={values.category || ''} // Ensure that the value is always defined
                                                label="Customer Category"
                                                required
                                                onChange={(e) => {
                                                    setFieldValue("category", e.target.value);
                                                }}
                                                sx={{
                                                    '& .MuiSelect-select.MuiSelect-select': {
                                                        fontFamily: 'Poppins-Light',
                                                        fontSize: '16px',
                                                    },
                                                }}
                                            >
                                                {listCategory.map((data) => (
                                                    <MenuItem key={data.id} value={data.id} sx={selectFormValue}>
                                                        {data.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button variant='contained' style={{ minHeight: '50px' }} onClick={handleAddCategory}>
                                            <IoIosAddCircleOutline size={30} />
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        id="mobile"
                                        fullWidth
                                        required
                                        label="No. Hp Personal Kontak"
                                        value={values.mobile}
                                        onChange={handleChange("mobile")}
                                        variant="outlined"
                                        sx={styleForm}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        id="npwp"
                                        fullWidth
                                        required
                                        label="NPWP Perusahaan"
                                        value={values.npwp}
                                        onChange={handleChange("npwp")}
                                        variant="outlined"
                                        sx={styleForm}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        id="field"
                                        fullWidth
                                        required
                                        label="Bidang Industri Perusahaan"
                                        value={values.field}
                                        onChange={handleChange("field")}
                                        variant="outlined"
                                        sx={styleForm}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Field name="credit_limit">
                                        {({ field }) => (
                                            <TextField
                                                {...field}
                                                id="credit_limit"
                                                fullWidth
                                                required
                                                type='text'
                                                label="Batas Kredit Pelanggan"
                                                variant="outlined"
                                                value={`Rp ${values.credit_limit.toLocaleString()}`} // Display formatted value
                                                onChange={(e) => handleChangePrice(e, setFieldValue)}
                                                sx={styleForm}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        id="customerTop"
                                        type='number'
                                        fullWidth
                                        label="Jangka Waktu Pembayaran Pelanggan"
                                        required
                                        value={values.top}
                                        onChange={handleChange("top")}
                                        variant="outlined"
                                        sx={styleForm}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} style={{ display: 'flex', alignItems: 'center' }}>
                                    <RatingComponent ratingValue={ratingValue} setRatingValue={setRatingValue} />
                                </Grid>
                            </Grid>
                            <div>
                                <Box sx={{ overflow: "auto" }} marginTop={5}>
                                    <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                                        <MantineReactTable
                                            table={table}
                                        />
                                    </Box>
                                </Box>
                            </div>
                            <div>
                                <Stack spacing={2} direction="row" marginY={3}>
                                    <Button
                                        type="submit"
                                        variant='contained'
                                        id='tabelButton'
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
                            </div>
                        </form>
                    )}
                </Formik>
            </Container>
            <ModalTambahAlamatBaru
                openModalAddress={openModalAddress}
                setOpenModalAddress={setOpenModalAddress}
                custid={custid}
                fetchListCustomerAddress={fetchListCustomerAddress}

            />
            <ModalUbahAlamat
                modalUbahAlamat={modalUbahAlamat}
                setModalUbahAlamat={setModalUbahAlamat}
                fetchListCustomerAddress={fetchListCustomerAddress}
                idSelected={idSelected}
            />
            <ModalAddCategory
                addCategory={addCategory}
                setAddCategory={setAddCategory}
                fetchListCategory={fetchListCategory}
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
