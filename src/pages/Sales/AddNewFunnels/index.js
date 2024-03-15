import React, { useContext, useState } from 'react'
import { NavbarComponent } from '../../../component'
import { Col, Form, Row } from 'react-bootstrap'
import { AuthContext } from '../../../auth'
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Flex } from '@mantine/core';
import ModalAddFunnelsProduct from '../../../component/Modal/Sales/ModalAddFunnelsProduct';

function AddNewFunnels ()
{
    const { userInfo } = useContext( AuthContext );
    const [ addFunnelsProduct, setAddFunnelsProduct ] = useState( false );
    const handleOpen = () =>
    {
        setAddFunnelsProduct( true );
    }
    const [ dataTable, setDataTable ] = useState( [] );
    const addDataToTable = ( newData ) =>
    {
        setDataTable( [ ...dataTable, newData ] );
    };



    const [ age, setAge ] = useState( '' );
    const handleChange = ( event ) =>
    {
        setAge( event.target.value );
    };


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
            accessorKey: 'price',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: 'Deskripsi',
            accessorKey: 'desc',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
        },

    ];

    const columns = getColumns();


    const table = useMantineReactTable( {
        columns,
        enableDensityToggle: false,
        initialState: { density: 'xs' },
        data: dataTable,
        enableRowNumbers: true,
        rowNumberMode: 'static',
        enableGlobalFilter: false,
        enableColumnResizing: false,
        isMultiSortEvent: () => true,
        mantineTableProps: {
            striped: true,

        },
        renderTopToolbarCustomActions: ( { table } ) => (
            <Box
                sx={ {
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                } }
            >
            </Box>
        ),
        //customize built-in buttons in the top-right of top toolbar
        renderToolbarInternalActions: ( { table } ) => (
            <Flex gap="xs" align="center">
                {/* add custom button to print table  */ }
                <Button
                    onClick={ handleOpen }
                    variant="contained"
                    id='tabelButton'
                >
                    Tambah Produk
                </Button>
            </Flex>
        ),
    } );



    return (
        <>
            <NavbarComponent />
            <Container style={ { minWidth: '90%' } } >
                <h2 className='text-center' style={ { fontFamily: 'Poppins-Regular' } }>
                    Buat Funnels Baru
                </h2>
                <h5 className='text-center mb-4' style={ { fontFamily: 'Poppins-Regular' } }>
                    Sales: { userInfo?.first_name } { userInfo?.last_name }
                </h5>
                <Container style={ { minWidth: '90%' } }>
                    <Grid container spacing={ 3 } marginTop={ 3 }> {/* Add spacing between grid containers */ }
                        <Grid item md={ 4 } xs={ 12 }>
                            <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                <Grid item xs={ 12 }>
                                    <TextField
                                        id="customer"
                                        fullWidth
                                        required
                                        label="Customer"
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
                                        label="Contact Person"
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
                                        label="Phone"
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
                                        variant="outlined"
                                        sx={ styleForm }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={ 4 } spacing={ 3 }>
                            <Grid item xs={ 12 }>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="position"
                                            fullWidth
                                            required
                                            label="Position"
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="catatan"
                                            label="Remark"
                                            fullWidth
                                            multiline
                                            rows={ 8 }
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={ 4 } spacing={ 3 }>
                            <Grid item xs={ 12 }>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="subTotal"
                                            fullWidth
                                            required
                                            label="Sub Total"
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="ppn"
                                            fullWidth
                                            required
                                            label="PPN (%)"
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        <TextField
                                            id="grandTotal"
                                            fullWidth
                                            required
                                            label="Grand Total"
                                            variant="outlined"
                                            sx={ styleForm }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={ 3 } marginBottom={ 3 }> {/* Add spacing between grid items and set marginBottom */ }
                                    <Grid item xs={ 12 }>
                                        {/* <TextField
                                            id="status"
                                            fullWidth
                                            required
                                            label="Status"
                                            variant="outlined"
                                            sx={ styleForm }
                                        /> */}
                                        <FormControl fullWidth sx={ styleForm }>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={ age }
                                                label="Status"
                                                required
                                                onChange={ handleChange }
                                                sx={ {
                                                    '& .MuiSelect-select.MuiSelect-select': { // Target the selected value
                                                        fontFamily: 'Poppins-Light', // Apply your custom styles
                                                        fontSize: '16px',
                                                    },
                                                } }
                                            >
                                                <MenuItem value={ 0 } sx={ selectFormValue }>0%-Gagal</MenuItem>
                                                <MenuItem value={ 20 } sx={ selectFormValue }>20%-Lead</MenuItem>
                                                <MenuItem value={ 40 } sx={ selectFormValue }>40%-Permintaan Harga</MenuItem>
                                                <MenuItem value={ 60 } sx={ selectFormValue }>60%-Penawaran Harga</MenuItem>
                                                <MenuItem value={ 80 } sx={ selectFormValue }>80%-Menunggu PO</MenuItem>
                                                <MenuItem value={ 100 } sx={ selectFormValue }>100%-Done</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Container>
                    <Box sx={ { overflow: "auto" } }>
                        <Box sx={ { width: "100%", display: "table", tableLayout: "fixed" } }>
                            <MantineReactTable
                                table={ table }
                            />
                        </Box>
                    </Box>
                </Container>
            </Container>
            <ModalAddFunnelsProduct
                addFunnelsProduct={ addFunnelsProduct }
                setAddFunnelsProduct={ setAddFunnelsProduct }
                addDataToTable={ addDataToTable }
            />
        </>
    )
}

export default AddNewFunnels



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
