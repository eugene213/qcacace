// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";

// Core
import { specific } from "core/api/index.func"; // APIs
import { useGet } from "core/global/function/index.func"; // Functions
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { theme } from "core/global/theme/index.style"; // Theme

// Layouts
import Photo from "./pet-information/Photo";
import PetClassification from "./pet-information/PetClassification";
import PetCondition from "./pet-information/PetCondition";
import Email from "./owner-information/Email";
import OwnerInformation from "./owner-information/OwnerInformation";
import ValidId from "./documents/ValidId";
import Picture from "./documents/Picture";
import PetCage from "./documents/PetCage";

// Constants
import { btnicon, card } from "./index.style"; // Styles
import ProofBilling from "./documents/ProofBilling";
const input = {
    MuiInput: {
        styleOverrides: {
            root: {
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&.Mui-disabled:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
            },
            input: { textTransform: 'uppercase', fontWeight:'bold' }
        }
    }
}

const email_input = {
    MuiInput: {
        styleOverrides: {
            root: {
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&.Mui-disabled:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
            },
            input: { fontWeight:'bold' }
        }
    }
}

const Index = () => {
    const { type, id} = useParams();
    const { setValue, getValues } = useContext(FormCntxt);
    
    const { isFetching: fetching } = 
        useGet({ key: ['docs_specific'], fetch: specific({ table: 'tbl_documents', id: id ?? null }), options: { enabled: type !== 'new', refetchOnWindowFocus: false },
            onSuccess: (data) => { 
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count];
                        setValue(_name, data[0][_name] !== null ? _name === 'tags' ? JSON.parse(data[0][_name]) : data[0][_name] : ''); 
                    } 
                }
            }
    });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Payment</Typography>
                <Typography sx= { btnicon } component= { Link } to= "/evaluate/payment" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
            <Box sx= { card }>
                <form autoComplete= "off">
                    <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                        <Grid item><Photo fetching= { fetching } /></Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography sx= {{ fontWeight: '600', textTransform: 'uppercase', color:'black', fontSize:'18px' }} gutterBottom>Pet Classification</Typography>
                                    <ThemeProvider theme= { theme(input) }><PetClassification fetching= { fetching } /></ThemeProvider>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx= {{ fontWeight: '600', textTransform: 'uppercase', color:'black', fontSize:'18px' }}gutterBottom>Other information</Typography>
                                <ThemeProvider theme= { theme(input) }><PetCondition fetching= { fetching } /></ThemeProvider>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx= {{ fontWeight: '600', textTransform: 'uppercase', color:'black', fontSize:'18px' }}gutterBottom>Owner information</Typography>
                                <ThemeProvider theme= { theme(email_input) }><Email fetching= { fetching } /></ThemeProvider>
                                <ThemeProvider theme= { theme(input) }><OwnerInformation fetching= { fetching } /></ThemeProvider>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch">
                                <Typography sx= {{ fontWeight: '600', textTransform: 'uppercase', color:'black', fontSize:'18px' }}gutterBottom>Documentary requirements</Typography>
                                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-end" spacing= { 2 }>
                                    <Grid item xs= { 12 } md= { 6 } lg= { 4 }><ValidId fetching= { fetching } /></Grid>
                                    { getValues()?.type === 'adoption' ? <Grid item xs= { 12 } md= { 6 } lg= { 4 }><Picture fetching= { fetching } /></Grid> : '' }
                                    { getValues()?.type === 'adoption' ? <Grid item xs= { 12 } md= { 6 } lg= { 4 }><PetCage fetching= { fetching } /></Grid> : '' }
                                    { getValues()?.type === 'adoption' ? <Grid item xs= { 12 } md= { 6 } lg= { 4 }><ProofBilling fetching= { fetching } /></Grid> : '' }
                                </Grid>
                            </Stack>
                        </Grid>
                      </Grid>
                </form>
            </Box>
        </Stack>
    );
}

export default Index;