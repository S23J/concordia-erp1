import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Grid, IconButton } from '@mui/material';
import { AuthContext } from '../../../auth';
import axios from '../../../API/axios';
import Swal from 'sweetalert2';
import { MdInfo } from "react-icons/md";
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ModalApproval, NavbarComponent } from '../../../component';
import { numberFormat } from '../../../utils';


function ListFunnels() {
    const { tokens, userInfo } = useContext(AuthContext);
    const [listFunnels, setListFunnels] = useState([]);
    const [visibilityModalApproval, setVisibilityModalApproval] = useState(false);
    const [selectedId, setSelectedId] = useState()
    const navigate = useNavigate();

    const toogleOpenModalApproval = () => {
        setVisibilityModalApproval(!visibilityModalApproval)
    }

    const openModalApproval = (row) => {
        setSelectedId(row.id)
        toogleOpenModalApproval()
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
            setListFunnels(response.data)
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
        if (userInfo?.id != null) fetchListFunnels()
    }, [userInfo?.id]);

    const getColumns = () => [
        {
            header: 'Detail',
            accessorFn: (row) => (
                <IconButton aria-label="delete" onClick={() => { openModalApproval(row) }}>
                    <MdInfo color={'black'} />
                </IconButton>
            ),
            mantineTableHeadCellProps: {
                align: 'left',
            },
            mantineTableBodyCellProps: {
                align: 'left',
            },
        },
        {
            accessorFn: (row) => new Date(row.created_at),
            header: 'Tanggal',
            filterVariant: 'date-range',
            Cell: ({ cell }) => cell.getValue().toLocaleDateString(),
            mantineTableHeadCellProps: {
                align: 'left',
            },
            mantineTableBodyCellProps: {
                align: 'left',
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



    ];

    const columns = getColumns();

    const table = useMantineReactTable({
        columns,
        enableDensityToggle: false,
        initialState: { density: 'xs' },
        data: listFunnels,
        enableGlobalFilter: false,
        enableColumnResizing: false,
        isMultiSortEvent: () => true,
        mantineTableProps: {
            striped: true,

        },
    });


    return (
        <>
            <NavbarComponent />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container marginTop={3} style={{ maxWidth: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ fontFamily: 'Poppins-Regular' }}>
                            Daftar Funnels
                        </h2>
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
            <ModalApproval
                fetchListFunnels={fetchListFunnels}
                open={visibilityModalApproval}
                id={selectedId}
                setVisibilityModalApproval={setVisibilityModalApproval}
                toogleOpenModalApproval={toogleOpenModalApproval}
            />
        </>
    )
}

export default ListFunnels
