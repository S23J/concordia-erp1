import { Box, LinearProgress, Typography } from "@mui/material";

export function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography sx={{
                    fontFamily: 'Poppins-Regular',
                }} variant="body2" color="text.secondary">{`${props.value
                    }%`}</Typography>
            </Box>
        </Box>
    );
}