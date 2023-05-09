// Libraries
import { ThemeProvider } from "@emotion/react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";

// Constants
import { btnback, card } from "./index.style"; // Styles
import { theme } from "core/global/theme/index.style"; // Theme

// Layouts
import PetInfo from "./PetInfo";
import Registration from "./steps/Registration";
import Verifying from "./steps/Verifying";
import PersonalInformation from "./steps/PersonalInformation";
import Documents from "./steps/Documents";
import Appointment from "./steps/Appointment";
import Finish from "./steps/Finish";

const Index = () => {
    const input = {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': { borderBottom: 'none' },
                    '&:after': { borderBottom: 'none' },
                    '&.Mui-disabled:before': { borderBottom: 'none' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
                },
                input: { fontSize: '120%', textTransform: 'uppercase', fontWeight:'bold' }
            }
        }
    }

    const email = {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': { borderBottom: 'none' },
                    '&:after': { borderBottom: 'none' },
                    '&.Mui-disabled:before': { borderBottom: 'none' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
                },
                input: { textAlign: 'center', fontSize: '130%', fontWeight:'bold' }
            }
        }
    }

    const code = {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': { borderBottom: 'none' },
                    '&:after': { borderBottom: 'none' },
                    '&.Mui-disabled:before': { borderBottom: 'none' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
                },
                input: { textAlign: 'center', fontSize: '120%', textTransform: 'uppercase', fontWeight:'bold' }
            }
        }
    }

    return (
        <Container maxWidth= "lg">
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                    <Typography sx= { btnback } component= { Link } to= "/pets"><FontAwesomeIcon icon= { solid('chevron-left') } /></Typography>
                </Stack>
                <Box sx= { card }>
                    <Grid container direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start', md: 'space-evenly' }} alignItems= "stretch" spacing= { 5 }>
                        <Grid item xs= { 12 } md= { 4 } lg= { 3 }><PetInfo /></Grid>
                        <Grid item xs= { 12 } md= { 6 } lg= { 5 } sx= {{ height: '100%', overflow: 'hidden' }}>
                            <Routes>
                                <Route exact path= "/" element= { <ThemeProvider theme= { theme(email) }><Registration /></ThemeProvider> } />
                                <Route exact path= "/:userid/verify" element= { <ThemeProvider theme= { theme(code) }><Verifying /></ThemeProvider> } />
                                <Route exact path= "/:userid/personal-information" element= { <ThemeProvider theme= { theme(input) }><PersonalInformation /></ThemeProvider> } />
                                <Route exact path = "/:userid/documents" element= { <ThemeProvider theme= { theme(input) }><Documents /></ThemeProvider> } />
                                <Route exact path= "/:userid/:adoptid/appointment" element= { <ThemeProvider theme= { theme(input) }><Appointment  /></ThemeProvider> } />
                                <Route exact path= "/:userid/:adoptid/finish" element= { <ThemeProvider theme= { theme(input) }><Finish /></ThemeProvider> } />
                            </Routes>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Container>
    );
}

export default Index;