import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import bgCous from "../../static/bgCous.jpg";
import epLuceCover from "../../static/ep_luce_cover.jpg";
import DrawerAppBar from "../AppBar/DrawerAppBar";
import Footer from "../Footer/Footer";

const Home = (props: any) => {
    const theme = useTheme()
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Fragment>
            <DrawerAppBar />
            <Box style={{ backgroundImage: `url(${bgCous})`, backgroundSize: "100% 100%" }} sx={{ height: window.innerHeight, width: "100%" }}>
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100%' }}>
                    <Box style={{ display: "flex", height: matchesSM ? "17em" : "33em", width: matchesSM ? "17em" : "33em", border: "none" }}>
                        <img
                            alt={"CousCous a colazione Luce EP cover"}
                            src={`${epLuceCover}?w=500px&h=500px&fit=crop&auto=format`}>
                        </img>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Fragment>
    )
}

export default Home
