// Libraries
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Constants
import { Services } from "core/constants/Services.const"; // Items
import { itemText, itemTitle, subtitle, title } from "./index.style"; // Styles

const Index = () => {
    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
            <Grid item>
                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography sx= { subtitle }>Our Services</Typography>
                    <Typography sx= { title }>What we Offer</Typography>
                </Box>
            </Grid>
            <Grid item>
                    <Container maxWidth= "lg">
                        <Grid container direction= "row" justifyContent= "center" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
                            {
                                Services().map((item, index) => (
                                    <Grid item xs= { 12 } sm= { 7 } md= { 6 } lg= { 4 } key= { index } sx= {{ padding: { xs: '20px 0', md: '20px 30px' } }}>
                                        <Stack direction= "column" justifyContent= "space-between" alignItems= "center" sx= {{ height: '100%' }}>
                                        <Typography sx= { itemTitle }>{ item.title }</Typography>
                                        <Typography sx= { itemText }>{ item.info }</Typography>
                                        <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Typography component= { Link } to= { item.link } sx= {{ color: '#142F4B' }}>{ `View more >>` }</Typography></Box>
                                        </Stack>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
            </Grid>
        </Grid>
    );
}

export default Index;