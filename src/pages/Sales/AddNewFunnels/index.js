import React, { useContext } from 'react'
import { NavbarComponent } from '../../../component'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { AuthContext } from '../../../auth'
import { Box, Grid, TextField } from '@mui/material';

function AddNewFunnels ()
{
    const { userInfo } = useContext( AuthContext );

    return (
        <>
            <NavbarComponent />
            <Container fluid>
                <h2 className='text-center' style={ { fontFamily: 'Poppins-Regular' } }>
                    Buat Funnels Baru
                </h2>
                <h5 className='text-center mb-4' style={ { fontFamily: 'Poppins-Regular' } }>
                    Sales: { userInfo?.first_name } { userInfo?.last_name }
                </h5>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 8 }>

                    </Grid>
                </Grid>
                <Container>

                    {/* <Box
                        component="form"
                        sx={ {
                            '& > :not(style)': { m: 1, width: '25ch' },
                        } }
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField id="filled-basic" label="Filled" variant="filled" />
                        <TextField id="standard-basic" label="Standard" variant="standard" />
                    </Box> */}
                    {/* <Row >
                        <Col lg={ 6 } className='my-auto'>
                            <Form>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={ formStyles.label } htmlFor='customerName'>Customer*</Form.Label>
                                        <Form.Control
                                            id='customer'
                                            type="text"
                                            // onChange={ ( e ) => setUser( e.target.value ) }
                                            // value={ username }
                                            required
                                            style={ formStyles.input }
                                        />

                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col md={ 6 }>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={ formStyles.label } htmlFor='contactPerson'>Contact Person*</Form.Label>
                                            <Form.Control
                                                id='contactPerson'
                                                type="text"
                                                // onChange={ ( e ) => setUser( e.target.value ) }
                                                // value={ username }
                                                required
                                                style={ formStyles.input }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={ 6 }>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={ formStyles.label } htmlFor='positionCustomer'>Position*</Form.Label>
                                            <Form.Control
                                                id='positionCustomer'
                                                type="text"
                                                // onChange={ ( e ) => setUser( e.target.value ) }
                                                // value={ username }
                                                required
                                                style={ formStyles.input }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={ 6 }>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={ formStyles.label } htmlFor='phone'>Phone*</Form.Label>
                                            <Form.Control
                                                id='phone'
                                                type="number"
                                                // onChange={ ( e ) => setUser( e.target.value ) }
                                                // value={ username }
                                                required
                                                style={ formStyles.input }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={ 6 }>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={ formStyles.label } htmlFor='email'>Email*</Form.Label>
                                            <Form.Control
                                                id='email'
                                                type="email"
                                                // onChange={ ( e ) => setUser( e.target.value ) }
                                                // value={ username }
                                                required
                                                style={ formStyles.input }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={ formStyles.label } htmlFor='catatan'>Remark*</Form.Label>
                                        <Form.Control
                                            id='catatan'
                                            type="text"
                                            // onChange={ ( e ) => setUser( e.target.value ) }
                                            // value={ username }
                                            as="textarea"
                                            rows={ 3 }
                                            required
                                            style={ formStyles.input }
                                        />
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Col>
                        <Col lg={ 6 }>

                        </Col>
                    </Row> */}
                </Container>

            </Container>
        </>
    )
}

export default AddNewFunnels


const formStyles = {
    label: {
        fontFamily: 'Poppins-Medium',
        color: '#222',
        fontSize: '16px'
    },
    input: {
        color: '#222',
        fontFamily: 'Poppins-Regular',
        minHeight: '50px',
        borderColor: '#ced4da',
        fontSize: '15px'
    },
};
