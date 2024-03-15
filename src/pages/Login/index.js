import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import axios from '../../API/axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../auth';
import { LogoGsk } from '../../assets';

function Login() {
    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
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
        // console.log( data )
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
            // console.log( response )
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
            // console.log( err )
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
    };

    return (
        <Container
            fluid
            className='vh-100 d-flex align-items-center justify-content-center'
            id='containerFluid'
        >
            <div
                id='cardLogin'
                className='text-center'
            >
                <Row
                    className='mx-auto mt-5'
                    style={{ maxWidth: '95%' }}
                >
                    <Col lg={6}
                        className='my-auto '
                    // style={ { minHeight: '' } }
                    >
                        <Image
                            src={LogoGsk}
                            fluid
                        />
                    </Col>
                    <Col lg={6} className='my-auto mb-3 mt-3'>
                        <h3
                            className='text-center mb-4'
                            style={{ fontFamily: 'Poppins-SemiBold' }}
                        >
                            Login
                        </h3>
                        <Form className='text-start' onSubmit={handleSubmitLogin}>
                            <Form.Group className="mb-3">
                                <Form.Label style={formStyles.label} htmlFor='usernameLogin'>Username*</Form.Label>
                                <Form.Control
                                    id='username'
                                    type="text"
                                    disabled={disabled}
                                    onChange={(e) => setUser(e.target.value)}
                                    value={username}
                                    required
                                    placeholder="Masukkan username anda"
                                    style={formStyles.input}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label style={formStyles.label} htmlFor='passwordLogin'>Password*</Form.Label>
                                <Form.Control
                                    id='password'
                                    type={passwordShown ? "text" : "password"}
                                    disabled={disabled}
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={password}
                                    required
                                    placeholder="Masukkan password anda"
                                    style={formStyles.input}
                                />
                                <p className='mt-2' onClick={togglePassword} style={{ fontFamily: 'Poppins-Regular', cursor: 'pointer', maxWidth: '250px' }}>{passwordShown ? "Sembunyikan" : "Tampilkan"} password <span >{passwordShown ? <AiFillEyeInvisible /> : <AiFillEye />} </span></p>
                            </Form.Group>
                            {/* <div>
                                <p
                                    className='mt-4'
                                    onClick={ handleShowLupaPassword }
                                    style={ { fontFamily: 'Poppins-Regular', cursor: 'pointer', textDecoration: 'underline', color: '#12B3ED' } }
                                >
                                    Lupa password?
                                </p>
                            </div> */}
                            <div className="d-grid gap-2 my-4">
                                {isSubmittingLogin ? (
                                    <Button
                                        type="submit"
                                        // id='actionButtonLogin'
                                        style={{ border: '2px solid #01155C' }}
                                        variant='btn'
                                        disabled={disabled}
                                    >
                                        <Spinner animation="border" size='sm' style={{ color: '#01155C' }} />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        id='actionButtonLogin'
                                        variant='primary'
                                        disabled={disabled}
                                    >
                                        Masuk
                                    </Button>
                                )}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Container>
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
