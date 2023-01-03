// Libraries
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Constants
import { caption, cardaddress, cardmessage, cardquote, cardtitle, subtitle, title } from "./index.style"; // Styles

// Assets
import Feedback1 from 'assets/images/feedback/feedback1.jpg';

const Index = () => {
    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
            <Grid item>
                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx= { subtitle }>Happy Moments</Typography>
                    <Typography sx= { title }>Inspirational Stories</Typography>
                    <Typography sx= { caption }>There are many happy stories of people after finding their best friends.</Typography>
                </Box>
            </Grid>
            <Grid item sx= {{ padding: '10px', marginTop: '50px' }}>
                <Container maxWidth= "lg">
                    <Grid container direction= "row" justifyContent= "center" alignItems= "center">
                        <Grid item xs= { 12 } sm= { 10 } md= { 8 } lg= { 7 } sx= {{ padding: '10px', boxShadow: 1, borderRadius: '30px' }}>
                            <Grid container direction= "row" justifyContent= "center" alignItems= "center">
                                <Grid item xs= { 12 } sm= { 5 } lg= { 4 }><img src= { Feedback1 } alt= "feedback" width= "100%" height= "auto" style= {{ borderRadius: '30px' }} /></Grid>
                                <Grid item xs= { 12 } sm= { 7 } lg= { 8 }>
                                    <Stack direction= "column" justifyContent= "center" alignItems= "stretch" sx= {{ padding: '20px 30px' }}>
                                        <Typography sx= { cardquote }><FontAwesomeIcon icon= { solid('quote-left') } /></Typography>
                                        <Typography sx= { cardtitle }>Thraia Mercadejas and Maggy</Typography>
                                        <Typography sx= { cardaddress }>Novaliches, Holycross</Typography>
                                        <Typography sx= { cardmessage }>I was a student living alone in the city when the pandemic started in 2020. Being the social person that I am, quarantine made me feel sad. 
                                        I dont have someone to talk to in the house since my family is in our province and I am not allowed to go outside to see my friends either but I had no choice since I need to stay here in Quezon City. 
                                        All I do for months is to sit in front of my laptop and study. My anxiety was getting worse when suddenly, I saw the adoption post of Quezon City Animal Care and Adoption Center.  
                                        A cute dog caught my attention. 
                                        Her beautiful eyes suddenly made me feel at ease. It is like talking to me through her eyes and thats when an idea came to my mind. 
                                        I want to adopt this cute little dog!.</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
}

export default Index;