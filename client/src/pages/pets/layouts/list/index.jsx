// Libraries
import { Box, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext, useEffect } from "react";

// Core
import { RecommendationCntxt } from "core/context/Recommendation"; // Context

// Layouts
import Items from "./layouts/Items";
import Recommended from "./layouts/Recommended";
import Recommendation from "../dialog/recommendation";
import Reminder from "../dialog/reminder";

// Constants
import { btnrecommend, petcontainer, search } from "./index.style"; // Styles

const Index = ({ fetching, find, finding }) => {
    const { setOpen, recommendation } = useContext(RecommendationCntxt);

    useEffect(() => { if(localStorage.getItem('recommend') !== null) recommendation(JSON.parse(localStorage.getItem('recommend'))) }, [ recommendation ]);
    
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 1 }>
            <Stack direction= "row" justifyContent= { localStorage.getItem('recommend') !== null ? "space-between" : "flex-end" } alignItems= "center" spacing= { 1 }>
                { localStorage.getItem('recommend') !== null ? <Typography variant= "h6" sx= {{ fontFamily: 'Tommy Bolder', color: '#1B4168' }}>Recommended</Typography> : '' }
                <Typography variant= "h6" sx= { btnrecommend } onClick= { () => { setOpen(true) } }><FontAwesomeIcon icon= { solid('sliders') } /></Typography>
            </Stack>
            { localStorage.getItem('recommend') !== null ? <Recommended /> : '' }
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
                <Typography variant= "h6" sx= {{ fontFamily: 'Tommy Bolder', color: '#1B4168' }}>List</Typography>
                <form autoComplete= "off">
                    <Box sx= { search }>
                        <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
                        <TextField variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true }} placeholder= "Search..." sx= {{ padding: '5px 0 0 0' }}
                            onChange= { e => { find({ table: 'tbl_pets', data: { condition: e.target.value !== '' ? (e.target.value).toUpperCase() : e.target.value, is_adopt: 0 } }); } } />
                    </Box>
                </form>
            </Stack>
            { !fetching && !finding ? <Items /> : 
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ padding: '0 0 40px 0' }}>
                    { [0, 1, 2].map(index => (
                        <Grid item xs= { 12 } md= { 6 } lg= { 4 } key= { index } sx= {{ padding: '10px 8px' }}>
                            <Stack direction= {{ xs: 'column', sm: 'row' }} justifyContent= "flex-start" alignItems= "start" sx= { petcontainer } spacing= { 2 }>
                                <Stack direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start' }} alignItems= "center" sx= {{ width: { xs: '100%', sm: '40%', md: '50%' } }}>
                                    <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px', borderRadius: '20px' }} />
                                </Stack>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                                    <Skeleton variant= "text" sx= {{ fontSize: '1.6rem', width: '50%' }} />
                                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                        <Skeleton variant= "text" sx= {{ fontSize: '1.6rem', width: '50%' }} />
                                        <Skeleton variant= "rounded" sx= {{ width: '20px', height: '20px' }} />
                                    </Stack>
                                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ marginTop: '5px' }}>
                                        <Grid item xs= { 4 } sm= { 3 } md= { 4 }><Skeleton variant= "text" sx= {{ fontSize: '1rem' }} /></Grid>
                                    </Grid>
                                    <Skeleton variant= "text" sx= {{ fontSize: '1.2rem', width: '25%' }} />
                                    <Skeleton variant= "rounded" sx= {{ width: '100%', height: '50px' }} />
                                </Stack>
                            </Stack>
                        </Grid>
                    )) }
                </Grid> }
                <Recommendation />
                <Reminder />
        </Stack>
    );
}

export default Index;