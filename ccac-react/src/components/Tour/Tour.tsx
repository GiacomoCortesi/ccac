import {Fragment} from "react";
import * as React from "react";
import {useGetAllEvents} from "../../services/api-event-service";
import {IEvent} from "../../models/event";
import Concert from "../Concert/Concert";
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";
import DrawerAppBar from "../AppBar/DrawerAppBar";

const Tour = () => {
    const { data, error, isLoading } = useGetAllEvents()
    console.log(data)
    return(
        <Fragment>
            <DrawerAppBar/>
            {/*<Box style={{ backgroundImage: `url(${bgCous})`}} sx={{height: window.innerHeight, width: "100%"}}>*/}
            {/*    <TableContainer component={Box} sx={{flexDirection: "column", margin: "auto", width: "75%", padding: "7.5em"}}>*/}
            {/*        <Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
            {/*            <TableBody>*/}
            {/*        {data && Array.isArray(data.events) && data.events.map((item:IEvent, index)=> (*/}
            {/*            <Concert key={index} event={item}></Concert>*/}
            {/*        ))}*/}
            {/*            </TableBody>*/}
            {/*        </Table>*/}
            {/*    </TableContainer>*/}
            {/*</Box>*/}
            <Box sx={{height: window.innerHeight, width: "100%"}}>
                <Box sx={{ padding: "9.5em"}}>
                    {data && Array.isArray(data.events) && data.events.map((item:IEvent, index)=> (
                        <><Concert key={index} event={item}/><Divider/></>
                    ))}
                </Box>
            </Box>
        </Fragment>
    )
}

export default Tour
