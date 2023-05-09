// Libraries
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { select } from "../../index.style"; // Styles

const Coat = (props) => {
    const { breed, breedloading } = props;
    const { control, getValues, errors } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            <Typography variant= "body2" color= "text.secondary" sx={{ fontWeight:'bold', color:'black', fontSize:'15px'}}>*What is your prefer breed type for a pet?</Typography>
            <Box sx= { select }>
            { !breedloading ?
                breed !== undefined ?
                    breed.length > 0 ?
                        <Controller control= { control } name= "breed_id" defaultValue= { 0 }
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { breed } disableClearable getOptionLabel= { breed => breed.name || breed.id } noOptionsText= "No results.." 
                                    getOptionDisabled= { option => option.id === 0 } isOptionEqualToValue= { (option, value) => option.name === value.name || breed.id === value.id }
                                    onChange= { (e, item) => { onChange(item.id); } } renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                    value= { breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) !== undefined ?
                                        breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) : breed.length === 0 ?
                                        { id: 0, name: '-- SELECT AN ITEM BELOW --' } : breed[0] } />
                            ) } />
                        : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">You must create a breed for this category!</Typography>
                    : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Please select a pet category first!</Typography>
                : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Loading...</Typography> }
            </Box>
            <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.breed_id?.message }</Typography>
        </Stack>
    );
}

export default Coat;