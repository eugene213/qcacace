// Libraries
import { useContext } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { ReminderCntxt } from "core/context/ReminderCntxt.func"; // Context

// Constants
import { btnadopt, petcontainer, petdesc, petfemale, petimage, petmale, petseries, pettag } from "../index.style"; // Styles


const Items = () => {
    const { list } = useContext(ListCntxt);
    const { setOpen, setLink } = useContext(ReminderCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ padding: '0 0 40px 0' }}>
                { list.length > 0 ?
                    list?.map((data, index) => (
                        <Grid item xs= { 12 } md= { 6 } lg= { 4 } key= { index } sx= {{ padding: '10px 8px' }}>
                            <Stack direction= {{ xs: 'column', sm: 'row' }} justifyContent= "flex-start" alignItems= {{ xs: 'flex-start', sm: 'stretch' }} sx= { petcontainer } spacing= { 2 }>
                                <Stack direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start' }} alignItems= "center" sx= {{ width: { xs: '100%', sm: '40%' } }}>
                                    <Box sx= { petimage }><img src= { JSON.parse(data.photo) } alt= "pet" width= "100%"  height= "100%" /></Box>
                                </Stack>
                                <Stack direction= "column" justifyContent= "space-between" alignItems= "flex-start" sx= {{ width: { xs: '100%', sm: '60%' } }} spacing= { 2 }>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                                        <Typography sx= { petseries }>#{ data.series_no }</Typography>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                            <Typography sx= { petdesc }>{ `${data.stage}` }</Typography>
                                            <Typography sx= { data.gender === 'male' ? petmale : petfemale }>
                                                <FontAwesomeIcon icon= { data.gender === 'male' ? solid('mars') : solid('venus') } />
                                            </Typography>
                                        </Stack>
                                        <Typography variant= "caption"><b>Breed:</b> { data.breed }</Typography>
                                        <Typography variant= "caption"><b>Color:</b> { data.color }</Typography>
                                        <Typography variant= "caption"><b>Coat:</b> { data.coat }</Typography>
                                        <Typography>{ (JSON.parse(data.tags)).map((tag, index) => ( <span key= { index } style= { pettag }>#{(tag.name).toLowerCase()}</span> )) }</Typography>
                                    </Stack>
                                    <Stack direction= "row" justifyContent= 'flex-end' alignItems= "center" sx= {{ width: '100%' }}>
                                        <Typography sx= { btnadopt } component= { Link } onClick= { () => { setOpen(true); setLink(`/pets/${btoa(data.id)}/adopt`); } }>Adopt</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Grid>
                    )) : 
                    <Grid item xs= { 12 }>
                        <Stack direction= "row" justifyContent= "center" alignItems= "center">
                            <Typography sx= {{ width: '100%', textAlign: 'center' }}>No record/s found!</Typography>
                        </Stack>
                    </Grid>}
            </Grid>
        </Stack>
    );
}

export default Items;