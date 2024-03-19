import React, { useContext, useEffect, useState } from 'react'
import NavbarComponent from '../../../component/Navbar'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { AuthContext } from '../../../auth';
import axios from '../../../API/axios';
import Swal from 'sweetalert2';
import { MdInfo } from "react-icons/md";
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ModalApproval } from '../../../component';


function ListFunnels() {
    const { tokens, userInfo } = useContext(AuthContext);
    const [listFunnels, setListFunnels] = useState([]);
    const [visibilityModalApproval, setVisibilityModalApproval] = useState(false);
    const [selectedId, setSelectedId] = useState()
    const navigate = useNavigate();
    const handleAddFunnels = () => {
        navigate('/tambah-funnels');
    }

    const toogleOpenModalApproval = () => {
        setVisibilityModalApproval(!visibilityModalApproval)
    }

    const openModalApproval = (row) => {
        setSelectedId(row.id)
        toogleOpenModalApproval()
    }
    const numberFormat = (value) =>
        new Intl.NumberFormat('IN-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value);

    const fetchListFunnels = () => {
        axios.get(`/api/v1/crm/funnels/`,
            {
                headers:
                {
                    withCredentials: true,
                    Authorization: `Token ${tokens?.token}`,
                },

            })
            .then(res => {
                setListFunnels(res.data)

            }).catch(err => {
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
            })
    }

    useEffect(() => {

        if (userInfo?.id != null) fetchListFunnels()

    }, [userInfo?.id]);


    const getColumns = () => [
        {
            accessorFn: (row) => new Date(row.created_at),
            header: 'Tanggal',
            filterVariant: 'date-range',
            Cell: ({ cell }) => cell.getValue().toLocaleDateString(),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Funnel No.',
            accessorKey: 'funnel_no',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Status',
            accessorFn: (row) => (
                <>
                    {(() => {
                        switch (row.status) {
                            case 0:
                                return '0% - Gagal';
                            case 20:
                                return '20% - Lead';
                            case 40:
                                return '40% - Permintaan Harga';
                            case 60:
                                return '60% - Penawaran Harga';
                            case 80:
                                return '80% - Menunggu PO';
                            case 100:
                                return '100% - Done';
                            default:
                                return null
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
            header: 'Pelanggan',
            accessorKey: 'customer',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Kontak',
            accessorKey: 'contact_person',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Grand Total',
            accessorFn: row => (

                `${numberFormat(row.grand_total)}`

            ),
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Approval',
            accessorFn: (row) => (
                <>
                    {(() => {
                        switch (row.approval) {
                            case null:
                                return 'Belum diApprove';
                            case true:
                                return 'Sudah diApprove';
                            case false:
                                return 'Tidak diApprove';
                            default:
                                return null
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
            header: 'Detail',
            accessorFn: (row) => (
                <IconButton aria-label="delete" color="secondary" onClick={() => { openModalApproval(row) }}>
                    <MdInfo color={'black'} />
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
        data: listFunnels,
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
                            Funnels
                        </h2>
                    </Grid>
                    <Grid item lg={6} xs={6}>
                        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                            <Button
                                variant='contained'
                                id='tabelButton'
                                onClick={handleAddFunnels}
                                sx={{
                                    minHeight: '50px',
                                }}
                            >
                                Buat baru
                            </Button>
                        </div>
                    </Grid>
                </Grid>

            </div>
            <div>
                <Box sx={{ overflow: "auto" }} marginTop={5} marginX={3}>
                    <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                        <MantineReactTable
                            table={table}
                        />
                    </Box>
                </Box>
            </div>
            <ModalApproval open={visibilityModalApproval} id={selectedId} toogleOpenModalApproval={toogleOpenModalApproval} />
        </>
    )
}

export default ListFunnels
