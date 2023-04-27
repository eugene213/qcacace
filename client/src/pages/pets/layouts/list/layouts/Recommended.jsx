// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Constants
import { btnadopt, petcontainer, petdesc, petfemale, petimage, petmale, petseries, pettag } from "../index.style"; // Styles

const Recommended = ({ recommended, recommending }) => {

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ padding: '0 0 40px 0' }}>
            { !recommending ? 
                recommended?.length > 0 ?
                    recommended?.map((data, index) => (
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
                                        <Typography sx= { btnadopt } component= { Link } to= { `/pets/${btoa(data.id)}/adopt` }>Adopt</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Grid>
                    )) 
                : <Grid item xs= { 12 }><Typography sx= {{ width: '100%', textAlign: 'center' }}>No recommendation/s found!</Typography></Grid> : 
                <Grid item xs= { 12 } md= { 6 } lg= { 4 }>
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
                </Grid> }
        </Grid>
    );
}

export default Recommended;