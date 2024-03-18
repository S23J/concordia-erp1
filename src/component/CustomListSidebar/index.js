import { ListItem, ListItemButton, ListItemText } from "@mui/material";

export const CustomList = ({ userInfo, listLinkNavigasi, navigate, LogoutSession }) => {
    if (userInfo?.groups.includes(4)) {
        return (
            listLinkNavigasi.salesManager.map((item, index) => (
                <ListItem key={item.title} disablePadding>
                    <ListItemButton onClick={() => navigate(item.link)}>
                        <ListItemText primaryTypographyProps={{ fontFamily: 'Poppins-Regular' }} sx={{ color: 'white' }} primary={item.title} />
                    </ListItemButton>
                </ListItem>
            )))
    } else if (userInfo?.groups.includes(3)) {
        return (
            listLinkNavigasi.sales.map((item, index) => (
                <ListItem key={item.title} disablePadding>
                    <ListItemButton onClick={() => navigate(item.link)}>
                        <ListItemText primaryTypographyProps={{ fontFamily: 'Poppins-Regular' }} sx={{ color: 'white' }} primary={item.title} />
                    </ListItemButton>
                </ListItem>
            ))
        )
    }
    return null; // Return null if neither condition is met
};