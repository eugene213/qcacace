// Libraries
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { select } from "../../index.style"; // Styles
const weight = [{ id: 'underweight', name: 'UNDERWEIGHT' }, { id: 'ideal', name: 'IDEAL' }, { id: 'overweight', name: 'OVERWEIGHT' }]; // Weight

const Weight = () => {
    const { control, getValues } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography variant= "body2" sx={{ fontWeight:'bold', color:'black', fontSize:'15px'}}>*What is your prefer weight of a pet?</Typography>
            <Box sx= { select }>
                <Controller control= { control } name= "weight" defaultValue= "ideal"
                    render= { ({ field: { onChange, value } }) => (
                        <Autocomplete options= { weight } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                            noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                            onChange= { (e, item) => { onChange(item.id); } }
                            value= { weight.find(data => { return data.id === (getValues().weight !== undefined ? getValues().weight : value) }) } />
                    ) } />
            </Box>
        </Stack>
    );
}

export default Weight;