import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import axios from '../../API/axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../auth';
import { LogoGsk } from '../../assets';
import { Grid, Container, Box, TextField, Button, CircularProgress, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl } from '@mui/material';
function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const { setTokens, setUserInfo } = useContext(AuthContext);
    const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };


    const win = window.sessionStorage
    const handleSubmitLogin = async (event) => {
        event.preventDefault()
        setIsSubmittingLogin(true);
        setDisabled(true)
        const data = {
            username: username,
            password: password,
        }
        // console.log(data)
        try {
            const response = await axios.post(`/api/v1/profiles/auth/login/`, data,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        withCredentials: true,
                    }
                }

            );
            console.log(response)
            const userInfo = response?.data.user
            const userToken = response?.data
            if (userInfo.groups[0] === 3) {
                setTokens({ token: userToken.token });
                win.setItem("token", JSON.stringify({ token: userToken.token }))
                setUserInfo(userInfo);
                win.setItem("userInfo", JSON.stringify(userInfo))
                navigate('/sales')
            } else if (userInfo.groups[0] === 4) {
                setTokens({ token: userToken.token });
                win.setItem("token", JSON.stringify({ token: userToken.token }))
                setUserInfo(userInfo);
                win.setItem("userInfo", JSON.stringify(userInfo))
                navigate('/sales-manager')
            }
            Swal.fire({
                icon: 'success',
                title: 'Login berhasil',
                showConfirmButton: false,
                timer: 2000
            })
            setIsSubmittingLogin(false);
            setDisabled(false);
        } catch (err) {
            // console.log(err)
            if (!err?.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Server tidak ada respon',
                })
                setIsSubmittingLogin(false);
                setDisabled(false);
            } else if (err.response?.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...!',
                    text: `${err.response?.data.non_field_errors}`,
                })
                setIsSubmittingLogin(false);
                setDisabled(false);
            } else if (err.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...!',
                    text: `Periksa kembali Username dan Password anda`,
                })
                setIsSubmittingLogin(false);
                setDisabled(false);
            }

        }
        setIsSubmittingLogin(false);
        setDisabled(false);
    };

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

    return (
        <Container
            id='containerFluid'
            sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
            <Grid sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }} container>
                <Box id='cardLogin' sx={{ display: 'flex', width: '60%', p: 2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

                    <form onSubmit={handleSubmitLogin} autoComplete='off'>
                        <Grid container item spacing={1} xs={12} md={12}>
                            <Grid container item xs={12} md={6} sx={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={LogoGsk} />
                            </Grid>
                            <Grid container item spacing={3} xs={12} md={6} className='my-auto mb-3 mt-3'>
                                <Grid item xs={12}>
                                    <h3
                                        className='text-center mb-4'
                                        style={{ fontFamily: 'Poppins-SemiBold' }}
                                    >
                                        Login
                                    </h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="Username"
                                        required
                                        fullWidth
                                        autoComplete="username"
                                        value={username}
                                        onChange={(event) => {
                                            setUsername(event.target.value);
                                        }}
                                        label="Username"
                                        variant="outlined"
                                        sx={styleForm}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <FormControl xs={12} sx={[styleForm, { width: '100%' }]} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={togglePassword}
                                                        edge="end"
                                                    >
                                                        {passwordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            id="outlined-adornment-password"
                                            type={passwordShown ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                            required
                                            fullWidth
                                            label="Password"

                                            sx={styleForm}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="d-grid gap-2 my-4">

                                        <Button
                                            type="submit"
                                            id='actionButtonLogin'
                                            sx={{ border: '2px solid #01155C' }}
                                            variant='text'

                                            disabled={disabled}
                                        >
                                            {isSubmittingLogin ? <CircularProgress size={22} sx={{ color: '#01155C' }} /> : 'Masuk'}
                                        </Button>

                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Box>

            </Grid >

        </Container >
    )
}

export default Login


const formStyles = {
    label: {
        fontFamily: 'Poppins-Medium',
        color: '#222',
    },
    input: {
        color: '#222',
        fontFamily: 'Poppins-Regular',
        minHeight: '50px',
        borderColor: '#ced4da', // Initial border color
    },
};
