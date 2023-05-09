// Libraries
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { select } from "../../index.style"; // Styles

const LifeStages = (props) => {
    const { lifestages, lifestagesloading } = props;
    const { control, getValues, errors } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            <Typography variant= "body2" color= "text.secondary" sx={{ fontWeight:'bold', color:'black', fontSize:'15px'}}>*What type of life stage are you interested.</Typography>
            <Box sx= { select }>
            { !lifestagesloading ?
                lifestages !== undefined ?
                    lifestages.length > 0 ?
                        <Controller control= { control } name= "life_stages_id" defaultValue= { 0 }
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { lifestages } disableClearable getOptionLabel= { lifestages => lifestages.name || lifestages.id } noOptionsText= "No results.." 
                                    getOptionDisabled= { option => option.id === 0 } isOptionEqualToValue= { (option, value) => option.name === value.name || lifestages.id === value.id }
                                    onChange= { (e, item) => { onChange(item.id); } } renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                    value= { lifestages?.find(data => { return data.id === (getValues().life_stages_id !== undefined ? getValues().life_stages_id : value) }) !== undefined ?
                                        lifestages?.find(data => { return data.id === (getValues().life_stages_id !== undefined ? getValues().life_stages_id : value) }) : lifestages.length === 0 ?
                                        { id: 0, name: '-- SELECT AN ITEM BELOW --' } : lifestages[0] } />
                            ) } />
                        : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">You must create a life stage for this category!</Typography>
                    : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Please select a pet category first!</Typography>
                : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Loading...</Typography> }
            </Box>
            <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.life_stages_id?.message }</Typography>
        </Stack>
    );
}

export default LifeStages;