import Box from "@mui/material/Box";
import {WhatsApp} from "@mui/icons-material";
import {Typography} from "@mui/material";
import React from "react";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";

interface ContactWAProps {
    variant: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
}
const ContactWA = (props: ContactWAProps) => {
    return (
        <Box sx={{margin: 1.25, display: "flex", alignItems: "center"}}>
            <WhatsApp/>
            <Typography variant={props.variant} sx={{margin: 1.25}}>whatsapp: +39 3341201715</Typography>
        </Box>
    )
}

export default ContactWA
