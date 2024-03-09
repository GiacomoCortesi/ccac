import Box from "@mui/material/Box";
import * as React from "react";
import ContactBooking from "../Contact/ContactBooking"
import ContactMail from "../Contact/ContactMail"
import ContactWA from "../Contact/ContactWA"
import DrawerAppBar from "../AppBar/DrawerAppBar";
import { useMediaQuery, useTheme } from "@mui/material";

const Contact = () => {
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <Box>
            <DrawerAppBar />
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <ContactBooking variant={matchesMD ? 'body2' : 'body1'} />
                <ContactWA variant={matchesMD ? 'body2' : 'body1'} />
                <ContactMail variant={matchesMD ? 'body2' : 'body1'} />
            </Box>
        </Box>
    )
}

export default Contact
