// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Dialog, DialogContent, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { RecommendationCntxt } from "core/context/Recommendation"; // Context

// Constants
import BG from 'assets/images/section.jpg'; // Assets
import { btntxt } from "../../list/index.style"; // Styles
import Form from "./form"; // Layout
import { validation } from "./index.validation"; // Validation

const Index = () => {
    const { open, setOpen, recommendation } = useContext(RecommendationCntxt);
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { setValidation, handleSubmit, setError, } = useContext(FormCntxt);
        
    useEffect(() => { setValidation(validation()); }, [ setValidation ]);

    return (
        <Dialog fullScreen= { fullscreen } open= { open } fullWidth maxWidth= "md">
            <DialogContent sx= {{ backgroundImage: `url(${BG})` }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= 'stretch'>
                    <Stack direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ marginBottom: '40px' }}>
                        <Typography variant= "h5" sx= {{ fontWeight: 'bold' }}>Tell us what you want!</Typography>
                        <Typography sx= {{ fontSize: '150%', color: '#C3C3C3', cursor: 'pointer' }} onClick= { () => setOpen(false) }><FontAwesomeIcon icon= { solid('xmark') } /></Typography>
                    </Stack>
                    <Form />
                    <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" sx= {{ marginTop: '40px' }}>
                        <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                            <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                                let _errors = [];

                                data['is_adopt'] = 0;
                                if(data.category_id === 0) { _errors.push({ name: 'category_id', message: 'This field is required!' }); }
                                if(data.breed_id === undefined || data.breed_id === 0) { _errors.push({ name: 'breed_id', message: 'This field is required!' }); }
                                if(data.coat_id === undefined || data.coat_id === 0) { _errors.push({ name: 'coat_id', message: 'This field is required!' }); }
                                if(data.life_stages_id === undefined || data.life_stages_id === 0) { _errors.push({ name: 'life_stages_id', message: 'This field is required!' }); }

                                if(!(_errors.length > 0)) { localStorage.setItem('recommend', JSON.stringify(data)); recommendation(data); setOpen(false); }
                                else { _errors.forEach(err => setError(err.name, { message: err.message })); }
                            })}>Save</Box>
                        </Grid>
                    </Grid>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default Index;