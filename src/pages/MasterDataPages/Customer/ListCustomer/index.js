import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../auth';
import { useNavigate } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MdEdit } from 'react-icons/md';
import { Box, Button, Grid, IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import axios from '../../../../API/axios';
import { NavbarComponent } from '../../../../component';

function ListCustomer() {
    const { tokens } = useContext(AuthContext);
    const [listCustomer, setListCustomer] = useState([]);
    const navigate = useNavigate();

    const handleAddCustomer = () => {
        navigate('/add-customer')
    }
    const editCustomer = (row) => {
        navigate("/edit-customer/" + row.id)
    }

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
            // console.log( res.data )
        } catch (err) {
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


    const getColumns = () => [
        {
            header: 'Customer Name',
            accessorKey: 'name',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'PIC',
            accessorKey: 'pic',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Mobile Phone',
            accessorKey: 'mobile',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Phone',
            accessorKey: 'phone',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Field',
            accessorKey: 'field',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'NPWP',
            accessorKey: 'npwp',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Edit',
            accessorFn: (row) => (
                <IconButton aria-label="delete" color="secondary" onClick={() => { editCustomer(row) }}>
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

    ];



    const columns = getColumns();


    const table = useMantineReactTable({
        columns,
        enableDensityToggle: false,
        initialState: { density: 'xs' },
        data: listCustomer,
        enableRowNumbers: true,
        rowNumberMode: 'static',
        enableGlobalFilter: false,
        enableColumnResizing: false,
        isMultiSortEvent: () => true,
        mantineTableProps: {
            striped: true,

        },
        // renderTopToolbarCustomActions: ( { table } ) => (
        //     <Box
        //         sx={ {
        //             display: 'flex',
        //             gap: '16px',
        //             padding: '8px',
        //             flexWrap: 'wrap',
        //         } }
        //     >
        //     </Box>
        // ),
        // renderToolbarInternalActions: ( { table } ) => (
        //     <Flex gap="xs" align="center">
        //         {/* add custom button to print table  */ }
        //         <Button
        //             onClick={ handleOpen }
        //             variant="contained"
        //             id='tabelButton'
        //         >
        //             Tambah Produk
        //         </Button>
        //     </Flex>
        // ),
    });


    return (
        <>
            <NavbarComponent />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container marginTop={3} style={{ maxWidth: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item lg={6} xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ fontFamily: 'Poppins-Regular' }}>
                            Customer
                        </h2>
                    </Grid>
                    <Grid item lg={6} xs={6}>
                        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                            <Button
                                variant='contained'
                                id='tabelButton'
                                onClick={handleAddCustomer}
                                sx={{
                                    minHeight: '50px',
                                }}
                            >
                                Tambah baru
                            </Button>
                        </div>
                    </Grid>
                </Grid>

            </div>
            <div>
                <Box sx={{ overflow: "auto" }} marginY={5} marginX={3}>
                    <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                        <MantineReactTable
                            table={table}
                        />
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default ListCustomer
