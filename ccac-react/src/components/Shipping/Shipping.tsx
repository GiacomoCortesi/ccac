import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup, Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { IShipping } from "../../models/shipping";

interface ShippingProps {
    fromShippingComponent: Function
    shippingMethod: string
    shippingOptions: IShipping[]
}
const Shipping = (props: ShippingProps) => {
    const [shippingMethod, setShippingMethod] = useState(props.shippingMethod)
    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShippingMethod((event.target as HTMLInputElement).value);
        props.fromShippingComponent(event.target.value)
    }
    return (
        <Box>
            <FormControl>
                <FormLabel id="shipping-method-selection">Metodo di spedizione</FormLabel>
                <RadioGroup
                    aria-labelledby="shipping-method-radio-group"
                    defaultValue={'Ritiro'}
                    name="radio-buttons-group"
                    sx={{ flexDirection: "row" }}
                    onChange={handleSelectChange}
                >
                    {props.shippingOptions.map((shippingOption: IShipping, index) => {
                        return (<Card key={index} sx={{ maxWidth: 300, minHeight: 175, margin: 0.5 }}>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {shippingOption.title}
                                    </Typography>
                                    {shippingOption.method === "Ritiro" ? <WhatsAppIcon /> : <LocalShippingIcon />}
                                </Box>
                                <Typography variant="h5" component="div">
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {shippingOption.location}
                                </Typography>
                                {shippingOption?.detail &&
                                    <Typography variant="body2">
                                        {shippingOption.detail}
                                    </Typography>
                                }
                                {shippingOption?.working_days &&
                                    <Typography variant={"body2"}>
                                        Consegna in {shippingOption.working_days} giorni lavorativi
                                    </Typography>
                                }
                                <Typography variant="body2">
                                    Costo: {shippingOption.cost.value} {shippingOption.cost.currency}
                                </Typography>
                            </CardContent>
                            <FormControlLabel sx={{ marginLeft: 1 }} value={shippingOption.method} control={<Radio />} label={shippingOption.method} />
                        </Card>)
                    })}
                </RadioGroup>
            </FormControl>
        </Box>
    )
}
export default Shipping
