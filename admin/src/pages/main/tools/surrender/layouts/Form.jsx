// Libraries
import { Box, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { theme } from "core/global/theme/index.style"; // Theme

// Layouts
import Photo from "./forms/Photo";
import PetClassification from "./forms/PetClassification";
import PetCondition from "./forms/PetCondition";
import Email from "./forms/Email";
import OwnerInformation from "./forms/OwnerInformation";
import DocumentaryRequirements from "./forms/DocumentaryRequirements";

// Constants
import { btntxt, card } from "../index.style"; // Context
import { validation } from "../index.validation"; // Validation
import { successToast, usePost } from "core/global/function/index.func";
import { save } from "core/api/index.func";
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

const email = {
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

const Form = () => {
    const  navigate = useNavigate();
    const { handleSubmit, setValidation, setError } = useContext(FormCntxt);
    const { mutate: saving } = usePost({ fetch: save, onSuccess: data => {
        if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
        else { successToast(data.message, 3000, navigate('/tools/petprogram', { replace: true })); }
    } });

    useEffect(() => { setValidation(validation()); }, [ setValidation ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ height: '100%', paddingBottom: '20px' }} spacing= { 2 }>
            <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Surrender a pet</Typography>
            <Box sx= { card }>
                <form autoComplete= "off">
                    <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                        <Grid item><Photo /></Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'18px' }} gutterBottom>Pet Classification</Typography>
                                <ThemeProvider theme= { theme(input) }><PetClassification /></ThemeProvider>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'18px' }}gutterBottom>Other information</Typography>
                                <ThemeProvider theme= { theme(input) }><PetCondition /></ThemeProvider>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'18px' }}gutterBottom>Owner information</Typography>
                                <ThemeProvider theme= { theme(email) }><Email /></ThemeProvider>
                                <ThemeProvider theme= { theme(input) }><OwnerInformation /></ThemeProvider>
                            </Stack>
                        </Grid>
                        <Grid item><DocumentaryRequirements /></Grid>
                    </Grid>
                </form>
            </Box>
            <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" sx= {{ paddingTop: '20px' }}>
                <Grid item xs= { 5 } sm= { 3 }>
                    <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                        let errors = [];
                        data['type'] = 'surrender';
                        data['application_type'] = 'walk-in';

                        if(data.photo === undefined) { errors.push({ name: 'photo', message: 'This field is required' }); }
                        if(data.category_id === 0 || data.category_id === undefined) { errors.push({ name: 'category_id', message: 'This field is required' }); }
                        if(data.breed_id === 0 || data.breed_id === undefined) { errors.push({ name: 'breed_id', message: 'This field is required' }); }
                        if(data.coat_id === 0 || data.coat_id === undefined) { errors.push({ name: 'coat_id', message: 'This field is required' }); }
                        if(data.life_stages_id === 0 || data.life_stages_id === undefined) { errors.push({ name: 'life_stages_id', message: 'This field is required' }); }
                        if((data.tags).length === 0) { errors.push({ name: 'tags', message: 'This field is required' }); }
                        if(data.valid_id === undefined || data.valid_id === '') { errors.push({ name: 'valid_id', message: 'This field is required!' }); }

                        if(!(errors.length > 0)) { saving({ table: 'tbl_services', data: data }); }
                        else { errors.forEach(err => setError(err.name, { message: err.message })); } 
                    }) }>Submit</Box>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Form;