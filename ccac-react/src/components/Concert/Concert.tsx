import {IEvent} from "../../models/event";
import {Link, Typography, useMediaQuery, useTheme} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface ConcertProps {
    event: IEvent
}

const Concert = (props: ConcertProps) => {
    const {event} = props
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    const prettyDate = (dateString: string) => {
        let d = new Date(dateString);
         return d.toLocaleString('default', { day: "numeric", month: 'short', year: "numeric", hour: "numeric", minute: "numeric" })
    }

    return(
        // <Fragment>
        //     <TableRow key={event.id}>
        //         <TableCell>
        //             <Typography variant={"h5"}>{event.name.text}</Typography>
        //         </TableCell>
        //         <TableCell>
        //             <Typography variant={"h5"}>{event.description.text}</Typography>
        //         </TableCell>
        //         <TableCell>
        //             <Typography variant={"h5"}>{prettyDate(event.start.local)}</Typography>
        //         </TableCell>
        //         <TableCell>
        //             <Typography variant={"h5"}>{event.venue.name} {event.venue.address.country},{event.venue.address.city}</Typography>
        //         </TableCell>
        //         <TableCell align={"right"}>
        //             <Button variant="outlined">
        //                 <Link target="_blank" href={event.url} underline={"none"} variant={"h4"}>Details</Link>
        //             </Button>
        //         </TableCell>
        //     </TableRow>
        // </Fragment>
        <Box sx={{display: "flex", justifyContent: "space-between", margin: "1em", alignItems: "center", flexDirection: matchesMD ? "column" : "row"}}>
            <Box sx={{width: "17em"}}>
                <Typography align={"center"} variant={"h5"}>{event.name.text}</Typography>
                <Typography align={"center"} variant={"h5"}>{prettyDate(event.start.local)}</Typography>
            </Box>
            <Box sx={{width: "17em"}}>
                <Typography align={"center"} variant={"h5"}>{event.venue.name}</Typography>
                <Typography align={"center"} variant={"h5"}>{event.venue.address.country}, {event.venue.address.city}</Typography>
            </Box>
            {/*<Typography variant={"h5"}>{event.description.text}</Typography>*/}
            <Button sx={{height: "50%"}} variant="outlined">
                <Link target="_blank" href={event.url} underline={"none"} variant={"h5"}>Details</Link>
            </Button>
        </Box>
    )
}

export default Concert
