import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../API/axios';
import { LogoGsk } from '../../assets';
import { AppBar, Box, Collapse, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { MdMenu } from "react-icons/md";
import { CustomList } from '../CustomList';
import { MdClose } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { AuthContext } from '../../auth';


function NavbarComponent() {
    const { tokens, setTokens, setUserInfo, userInfo } = useContext(AuthContext);
    const [openSidebar, setOpenSidebar] = useState(false)

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar)
    }
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

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


    const ListNavigasi = () => {
        if (userInfo?.groups.includes(3)) {
            return (
                <List>
                    <CustomList title={'Home'} link={'/sales'} disablePadding={true} />
                    <CustomList title={'Funnels'} link={'/funnels'} disablePadding={true} />
                    <CustomList title={'Order Request'} link={'/order-request'} disablePadding={true} />

                    <ListItemButton sx={{ marginTop: 2 }} onClick={handleClick}>
                        <ListItemIcon>
                            <FaDatabase />
                        </ListItemIcon>
                        <ListItemText primary="Master Data" id='dropdownText' />
                        {open ? <MdExpandLess color='white' size={20} /> : <MdExpandMore color='white' size={20} />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CustomList title={'Customer'} link={'/customer'} disablePadding={true} />
                    </Collapse>

                </List>

            )
        } else if (userInfo?.groups.includes(4)) {
            return (
                <List>
                    <CustomList title={'Home'} link={'/sales-manager'} disablePadding={true} />
                    <CustomList title={'Data Funnels'} link={'/data-funnels'} disablePadding={true} />
                </List>
            )
        } else {
            <></>
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
                    <img
                        alt='logoGSK'
                        src={LogoGsk}
                        width={70}
                        height={70}
                    />
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

                            {ListNavigasi()}
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

    )
}

export default NavbarComponent