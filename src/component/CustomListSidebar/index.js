import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CustomList = ({ title, link, disablePadding }) => {
    const navigate = useNavigate()
    return (
        <ListItem key={title} disablePadding={disablePadding ? disablePadding : false}>
            <ListItemButton onClick={() => navigate(link)}>
                <ListItemText primaryTypographyProps={{ fontFamily: 'Poppins-Regular' }} sx={{ color: 'white' }} primary={title} />
            </ListItemButton>
        </ListItem>
    )

};