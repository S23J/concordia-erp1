import React, { useContext } from 'react'
import { Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from '../../auth/Context/AuthContext';
import axios from '../../API/axios';
import { LogoGsk } from '../../assets';


function NavbarComponent ()
{
    const { tokens, setTokens, setUserInfo, userInfo } = useContext( AuthContext );
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


    const menuNavigasi = () =>
    {
        if ( userInfo?.groups.includes( 4 ) ) {
            return (
                <>
                    <NavLink
                        to='/sales-manager'
                        className='my-2'
                        style={ { textDecoration: 'none', color: 'white' } }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        // to='/data-karyawan'
                        className='my-2'
                        style={ { textDecoration: 'none', color: 'white' } }
                    >
                        Data Funnels
                    </NavLink>
                </>

            )
        } else if ( userInfo?.groups.includes( 3 ) ) {
            return (
                <>
                    <NavLink
                        to='/sales'
                        className='my-2'
                        style={ { textDecoration: 'none', color: 'white' } }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/funnels'
                        className='my-2'
                        style={ { textDecoration: 'none', color: 'white' } }
                    >
                        Funnels
                    </NavLink>
                    <NavLink
                        to='/order-request'
                        className='my-2'
                        style={ { textDecoration: 'none', color: 'white' } }
                    >
                        Order Request
                    </NavLink>
                </>
            )
        }
    }



    return (
        <Navbar expand={ false } className="mx-2" sticky="top" style={ { backgroundColor: '#FFFFFF' } }>
            <Container fluid>
                <Navbar.Toggle className='ms-3' style={ { backgroundColor: '#FFFFFF' } } />
                <Navbar.Brand style={ { cursor: 'default' } }>
                    <Image
                        src={ LogoGsk }
                        fluid
                        width={ 70 }
                    />
                </Navbar.Brand>
                <Navbar.Offcanvas
                    id={ `offcanvasNavbar-expand-${false}` }
                    aria-labelledby={ `offcanvasNavbarLabel-expand-${false}` }
                    placement="start"
                    data-bs-theme="dark"
                    className='bg-dark d-flex flex-column h-100'
                    style={ { maxWidth: '200px', backgroundColor: '#1E1E1E', color: 'white' } }
                >
                    <Offcanvas.Header closeButton style={ { fontFamily: 'Poppins-Medium' } }>
                        <Offcanvas.Title id={ `offcanvasNavbarLabel-expand-${false}` }>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body style={ { fontFamily: 'Poppins-Regular', flexGrow: '1' } }>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            { menuNavigasi() }
                        </Nav>
                    </Offcanvas.Body>
                    <Nav className="mt-auto">
                        <NavLink
                            className='my-2 ms-3 mb-5'
                            onClick={ LogoutSession }
                            style={ {
                                fontFamily: 'Poppins-Regular',
                                textDecoration: 'none',
                                color: 'white'
                            } }
                        >
                            Keluar
                        </NavLink>
                    </Nav>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>

    )
}

export default NavbarComponent