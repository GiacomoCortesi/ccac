import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { useGetOrder } from "../../services/api-order-service";
import AppBar from "../AppBar/AppBar";
import ContactMail from "../Contact/ContactMail";
import ContactWA from "../Contact/ContactWA";
import Loading from "../Loading/Loading";

const Order = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetOrder(id ? id : "")

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box margin={1.75}>
            <AppBar />
            {isLoading && <Loading />}
            {data && <Paper variant={"outlined"}>
                <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>Ordine {data.id}</Typography>
                <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>Stato: {data.status.message}</Typography>
                <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>{data.status.description}</Typography>
                <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>Data ordine: {data.date}</Typography>
                <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>Metodo di spedizione: {data.shipping.method}</Typography>
                <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>Spesa spedizione: {data.shipping.cost.value} {data.shipping.cost.currency}</Typography>
                <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>Spesa carrello: {data.cart.total.value} {data.cart.total.currency}</Typography>
                <Divider />
                <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>Spesa complessiva: {data.total.value} {data.total.currency}</Typography>
                <br />
                <Typography sx={{ marginTop: 1.25, marginLeft: 1.25 }}>Per qualsiasi cosa, contattaci:</Typography>
                <ContactMail variant={matchesMD ? 'body2' : 'body1'} />
                <ContactWA variant={matchesMD ? 'body2' : 'body1'} />
            </Paper>}
        </Box>
    )
}

export default Order
