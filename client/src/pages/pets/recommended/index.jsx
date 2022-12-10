// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

// Assets
import Pet1 from 'assets/images/pets/pet1.png';

const Index = () => {
    let colors = [ '#feca57', '#ee5253', '#0abde3', '#ff9ff3', '#ff9f43', '#f368e0', '#01a3a4', '#00d2d3', '#54a0ff', '#341f97' ];

    return (
        <Container maxWidth= "lg">
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Typography sx= {{ fontFamily: 'Tommy Bold', color: '#204c6f', fontSize: { xs: '160%', md: '170%' } }}>Recommended</Typography>
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '30px 0' }}>
                    <Grid item xs= { 12 } sm= { 4 } md= { 3 } sx= {{ padding: { xs: '5px 15px', sm: '5px 10px', lg: '5px 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden', paddingBottom: '20px', height: '100%' }}>
                            <Box sx= {{ width: '100%', height: '250px', backgroundColor: colors[Math.floor(Math.random() * 10)] }} />
                            <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: { xs: '-65% 0 10px 0', md: '-75% 0 20px 0' } }}><img src= { Pet1 } alt= "pet" width= "60%" height= "auto" /></Box>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 20px' }}>
                                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                        <Typography sx= {{ fontWeight: 'bold', color: '#777d9c', fontSize: '105%' }}>1 Year Old, 15KG</Typography>
                                        <Typography sx= {{ color: '#1ec2df', fontSize: { md: '110%' } }}><FontAwesomeIcon icon= { solid('mars') } /></Typography>
                                    </Stack>
                                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ margin: '10px 0 20px 0' }}>
                                        <Typography sx= {{ color: '#ffde88', fontWeight: 'bold', backgroundColor: '#ffde883b', padding: '2px 10px', borderRadius: '10px' }}># friendly</Typography>
                                        <Typography sx= {{ color: '#1aa6d1', fontWeight: 'bold', backgroundColor: '#1aa6d13b', padding: '2px 10px', borderRadius: '10px'  }}># smart</Typography>
                                    </Stack>
                                    <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                                        <Typography sx= {{ backgroundColor: '#204c6f', color: '#f5f6fa', '&:hover': { backgroundColor: '#1b405d' }, borderRadius: '7px', padding: { xs: '10px 50px', md: '7px 35px' } }}>Adopt Me</Typography>
                                    </Box>
                                </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}

export default Index;