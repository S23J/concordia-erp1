import React, { useContext } from 'react'
import { Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from '../../auth/Context/AuthContext';
import axios from '../../API/axios';
import { LogoGsk } from '../../assets/images/image';

function NavbarComponent ()
{
    const { tokens, setTokens, setUserInfo } = useContext( AuthContext );
    const navigate = useNavigate();

    const LogoutSession = async () =>
    {
        const confirmDelete = await Swal.fire( {
            title: 'Apakah anda yakin ingin keluar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Keluar',
            cancelButtonText: 'Batal',
        } );

        if ( !confirmDelete.isConfirmed ) {

            return;
        }
        try {
            await axios.post(
                '/api/v1/profiles/auth/logout/',
                {},
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        withCredentials: true,
                        Authorization: `Token ${tokens.token}`,
                    },
                }
            );

            sessionStorage.removeItem( 'userInfo' );
            sessionStorage.removeItem( 'token' );
            sessionStorage.removeItem( 'groups' );
            setTokens();
            setUserInfo();
            Swal.fire( {
                icon: 'success',
                title: 'Logout Berhasil',
                showConfirmButton: false,
                timer: 2000,
            } );
            navigate( '/' );
        } catch ( error ) {
            // console.log( error );
            Swal.fire( {
                icon: 'error',
                title: 'Warning!',
                text: 'Logout gagal!',
            } );
        }
    };



    return (
        <Navbar expand={ false } className="mb-3 mx-2" sticky="top" style={ { backgroundColor: '#FFFFFF', minHeight: '70px' } }>
            <Container fluid>
                <Navbar.Toggle style={ { backgroundColor: 'white' } } />
                {/* <div >
                    <h5 >Greetings, </h5>
                </div> */}
                <Navbar.Brand style={ { cursor: 'default' } }>
                    <Image
                        src={ LogoGsk }
                        fluid
                        width={ 80 }
                    />
                </Navbar.Brand>
                <Navbar.Offcanvas
                    id={ `offcanvasNavbar-expand-${false}` }
                    aria-labelledby={ `offcanvasNavbarLabel-expand-${false}` }
                    placement="start"
                    data-bs-theme="dark"
                    className='bg-dark'
                    style={ { maxWidth: '200px', backgroundColor: '#1E1E1E', color: 'white' } }
                >
                    <Offcanvas.Header closeButton style={ { fontFamily: 'Poppins-Medium' } }>
                        <Offcanvas.Title id={ `offcanvasNavbarLabel-expand-${false}` }>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body style={ { fontFamily: 'Poppins-Regular' } }>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <NavLink
                                to='/home'
                                className='my-2'
                                style={ { textDecoration: 'none', color: 'white' } }
                            >
                                Home
                            </NavLink>
                            {/* { groups?.includes( 'HRD GA' ) || groups?.includes( 'superuser' ) ?

                                (
                                    <>
                                        <NavLink
                                            to='/data-karyawan'
                                            className='my-2'
                                            style={ { textDecoration: 'none', color: 'white' } }
                                        >
                                            Data Karyawan
                                        </NavLink>
                                        <NavLink
                                            to='/report'
                                            className='my-2'
                                            style={ { textDecoration: 'none', color: 'white' } }
                                        >
                                            Report
                                        </NavLink>

                                    </>
                                )
                                :
                                (
                                    <>

                                        <NavLink
                                            to='/data-absensi'
                                            className='my-2'
                                            style={ { textDecoration: 'none', color: 'white' } }
                                        >
                                            Data Absensi
                                        </NavLink>
                                    </>
                                )
                            } */}
                            <NavLink className='my-2' onClick={ LogoutSession } style={ { textDecoration: 'none', color: 'white' } }>Keluar</NavLink>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent