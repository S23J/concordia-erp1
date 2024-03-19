import { Box, Modal, Typography, IconButton, TextField, Grid, Button, Alert, Container } from '@mui/material';
import { IoCloseOutline } from "react-icons/io5";
import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from '../../../../API/axios';
import { AuthContext } from '../../../../auth';

function ModalApproval({
    open,
    id,
    toogleOpenModalApproval
}) {

    const { userInfo, tokens } = useContext(AuthContext)

    const isMobile = useMediaQuery({ maxWidth: 767 });


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
    };

    console.log(id)

    const fetchDataFunnels = async () => {
        try {
            const response = await axios.get(`/api/v1/crm/funnels/${id}/`,
                {
                    headers:
                    {
                        withCredentials: true,
                        Authorization: `Token ${tokens?.token}`,
                    },
                })
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }


    }

    useEffect(() => {

        if (id != null) fetchDataFunnels()

    }, [id]);
    return (
        <Modal
            open={open}
            onClose={toogleOpenModalApproval}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Grid container>
                    <Grid item container xs={12} sx={{ overflow: 'auto', maxHeight: '70vh', height: '70vh', }}>
                        ?
                    </Grid>
                    <Grid item container xs={12} sx={{ maxHeight: '10vh', height: '10vh', }}>
                        hi
                    </Grid>

                </Grid>

            </Box>
        </Modal >
    )
}

export default ModalApproval;


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
        minWidth: '100%'
    },
};
