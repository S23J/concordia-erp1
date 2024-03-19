import React, { useContext, useState } from 'react'
import { Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from '../../auth/Context/AuthContext';
import axios from '../../API/axios';
import { LogoGsk } from '../../assets';
import { AppBar, Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { MdMenu } from "react-icons/md";
import { CustomList } from '../CustomListSidebar';
import { MdClose } from "react-icons/md";


function NavbarComponent() {
    const { tokens, setTokens, setUserInfo, userInfo } = useContext(AuthContext);
    const [openSidebar, setOpenSidebar] = useState(false)

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar)
    }

    const navigate = useNavigate();

    const LogoutSession = async () => {
        toggleSidebar()
        const confirmDelete = await Swal.fire({
            title: 'Apakah anda yakin ingin keluar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Keluar',
            cancelButtonText: 'Batal',
        });

        if (!confirmDelete.isConfirmed) {

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

            sessionStorage.removeItem('userInfo');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('groups');
            setTokens();
            setUserInfo();
            Swal.fire({
                icon: 'success',
                title: 'Logout Berhasil',
                showConfirmButton: false,
                timer: 2000,
            });
            navigate('/');
        } catch (error) {
            // console.log( error );
            Swal.fire({
                icon: 'error',
                title: 'Warning!',
                text: 'Logout gagal!',
            });
        }
    };

    const listLinkNavigasi = {
        salesManager: [
            {
                title: 'Home',
                link: '/sales-manager'
            },
            {
                title: 'Data Funnels',
                link: '/data-funnels'
            },
        ],
        sales: [
            {
                title: 'Home',
                link: '/sales'
            },
            {
                title: 'Funnels',
                link: '/funnels'
            },
            {
                title: 'Order Request',
                link: '/order-request'
            },
        ]
    }


    const menuNavigasi = () => {
        if (userInfo?.groups.includes(4)) {
            return (
                <>
                    <NavLink
                        to='/sales-manager'
                        className='my-2'
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        // to='/data-karyawan'
                        className='my-2'
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        Data Funnels
                    </NavLink>
                </>

            )
        } else if (userInfo?.groups.includes(3)) {
            return (
                <>
                    <NavLink
                        to='/sales'
                        className='my-2'
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/funnels'
                        className='my-2'
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        Funnels
                    </NavLink>
                    <NavLink
                        to='/order-request'
                        className='my-2'
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        Order Request
                    </NavLink>
                </>
            )
        }
    }

    return (
        <AppBar sx={{ backgroundColor: 'white' }} position="static">
            <Toolbar>
                <Grid container justifyContent={'space-between'} alignItems={'center'} p={1}>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2, backgroundColor: 'white' }}
                        onClick={() => toggleSidebar()}
                    >
                        <MdMenu color='black' />
                    </IconButton>
                    <img src={LogoGsk} width={70} height={70} />
                </Grid>

            </Toolbar>
            <Drawer open={openSidebar} onClose={toggleSidebar}>
                <Box sx={{ width: 250, backgroundColor: '#1E1E1E', height: '100vh', }} role="presentation">
                    <Grid container sx={{ height: '100%' }} justifyContent={'space-between'} alignItems={'space-between'}>
                        <Grid item xs={12}>
                            <List >
                                <ListItem key={'Menu'} sx={{ justifyContent: 'space-between' }}>
                                    <ListItemText primaryTypographyProps={{ fontFamily: 'Poppins-Bold' }} sx={{ color: 'white' }} primary={'Menu'} />
                                    <ListItemIcon onClick={toggleSidebar}>
                                        <MdClose color='white' size={28} />
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                            <List>
                                <CustomList userInfo={userInfo} listLinkNavigasi={listLinkNavigasi} navigate={navigate} />
                            </List>
                        </Grid>
                        <Grid container alignItems={'flex-end'} item xs={12}>
                            <List>
                                <ListItem key={'keluar'} disablePadding>
                                    <ListItemButton onClick={LogoutSession}>
                                        <ListItemText primaryTypographyProps={{ fontFamily: 'Poppins-Regular' }} sx={{ color: 'white', }} primary={'Keluar'} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </AppBar >
        // <Navbar expand={ false } className="mx-2" sticky="top" style={ { backgroundColor: '#FFFFFF' } }>
        //     <Container fluid>
        //         <Navbar.Toggle className='ms-3' style={ { backgroundColor: '#FFFFFF' } } />
        //         <Navbar.Brand style={ { cursor: 'default' } }>
        //             <Image
        //                 src={ LogoGsk }
        //                 fluid
        //                 width={ 70 }
        //             />
        //         </Navbar.Brand>
        //         <Navbar.Offcanvas
        //             id={ `offcanvasNavbar-expand-${false}` }
        //             aria-labelledby={ `offcanvasNavbarLabel-expand-${false}` }
        //             placement="start"
        //             data-bs-theme="dark"
        //             className='bg-dark d-flex flex-column h-100'
        //             style={ { maxWidth: '200px', backgroundColor: '#1E1E1E', color: 'white' } }
        //         >
        //             <Offcanvas.Header closeButton style={ { fontFamily: 'Poppins-Medium' } }>
        //                 <Offcanvas.Title id={ `offcanvasNavbarLabel-expand-${false}` }>
        //                     Menu
        //                 </Offcanvas.Title>
        //             </Offcanvas.Header>
        //             <Offcanvas.Body style={ { fontFamily: 'Poppins-Regular', flexGrow: '1' } }>
        //                 <Nav className="justify-content-end flex-grow-1 pe-3">
        //                     { menuNavigasi() }
        //                 </Nav>
        //             </Offcanvas.Body>
        //             <Nav className="mt-auto">
        //                 <NavLink
        //                     className='my-2 ms-3 mb-5'
        //                     onClick={ LogoutSession }
        //                     style={ {
        //                         fontFamily: 'Poppins-Regular',
        //                         textDecoration: 'none',
        //                         color: 'white'
        //                     } }
        //                 >
        //                     Keluar
        //                 </NavLink>
        //             </Nav>
        //         </Navbar.Offcanvas>
        //     </Container>
        // </Navbar>

    )
}

export default NavbarComponent