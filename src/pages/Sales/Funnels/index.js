import React from 'react'
import NavbarComponent from '../../../component/Navbar'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Funnels ()
{
    const navigate = useNavigate();

    const handleAddFunnels = () =>
    {
        navigate( '/tambah-funnels' );
    }

    return (
        <>
            <NavbarComponent />
            <Container fluid className='mt-4'>
                <Row >
                    <Col lg={ 6 } className='my-auto'>
                        <h2 className='text-start' style={ { fontFamily: 'Poppins-Regular' } }>
                            Funnels
                        </h2>
                    </Col>
                    <Col lg={ 6 }>
                        <div className='text-end'>
                            <Button
                                variant='btn'
                                onClick={ handleAddFunnels }
                                style={ {
                                    backgroundColor: '#01155C',
                                    color: '#FFFFFF',
                                    fontFamily: 'Poppins-Medium',
                                    minHeight: '50px',
                                    minWidth: '120px'
                                } }
                            >
                                Buat baru
                            </Button>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Funnels
