import Box from "@mui/material/Box";
import {MailOutline} from "@mui/icons-material";
import {Typography} from "@mui/material";
import React from "react";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";

interface ContactBookingProps {
    variant: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
}


const ContactBooking = (props: ContactBookingProps) => {
    return (
        <Box sx={{margin: 1.25, display:"flex", alignItems: "center"}}>
            <MailOutline/>
            <Typography variant={props.variant} sx={{margin: 1.25}}>booking: defrancesconicolas2@gmail.com</Typography>
        </Box>
    )
}

export default ContactBooking
