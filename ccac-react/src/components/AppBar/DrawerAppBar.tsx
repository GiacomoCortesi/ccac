import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import Coffee from "../Coffee/Coffee";
import { Link, useMediaQuery, useTheme } from "@mui/material";
import { Fragment } from "react";
import AppBarSimple from "./AppBarSimple";

const drawerWidth = 240;

export default function DrawerAppBar() {
    const theme = useTheme()
    const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ height: "100%", textAlign: 'center', marginTop: 10, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <RouterLink to='/' style={{ textDecoration: "none" }}>
                <Typography color={theme.palette.primary.light} variant={"h5"} style={{ fontFamily: 'ntseawave', fontWeight: 'bold' }}>HOME</Typography>
            </RouterLink>
            <RouterLink style={{ textDecoration: "none", marginTop: 1.50 }} to={"/products"}>
                <Typography color={theme.palette.primary.light} variant={"h5"} style={{ fontFamily: 'ntseawave', fontWeight: 'bold' }}>COMPRA</Typography>
            </RouterLink>
            <Link color={theme.palette.primary.light} target="_blank" href={"https://linktr.ee/couscousacolazioneluce"} underline={"none"} variant={"h5"} style={{ fontFamily: 'ntseawave', fontWeight: 'bold', marginTop: 1.50 }}>ASCOLTA</Link>
            <RouterLink style={{ textDecoration: "none", marginTop: 1.50 }} to={"/contact"}>
                <Typography color={theme.palette.primary.light} variant={"h5"} style={{ fontFamily: 'ntseawave', fontWeight: 'bold' }}>CONTATTI</Typography>
            </RouterLink>
            <Link color={theme.palette.primary.light} target={"_blank"} href={"https://rcwaves.it/couscousacolazione2024"} underline={"none"} variant={"h5"} style={{ fontFamily: 'ntseawave', fontWeight: 'bold' }}>PRESSKIT</Link>
            <Box style={{ margin: 10 }}>
                <Coffee />
            </Box>
        </Box>
    );
    return (
        <Fragment>
            {matchesSM && <AppBarSimple />}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' }, position: "absolute", top: "20px", left: "20px" }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
        </Fragment>
    );
}
