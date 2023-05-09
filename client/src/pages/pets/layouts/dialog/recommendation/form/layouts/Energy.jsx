// Libraries
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { select } from "../../index.style"; // Styles
const energy = [{ id: 'low', name: 'LOW' }, { id: 'high', name: 'HIGH' }]; // Gender

const Energy = () => {
    const { control, getValues } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography variant= "body2" sx={{ fontWeight:'bold', color:'black', fontSize:'15px'}}>*Are you looking for a pet with a certain energy level?</Typography>
            <Box sx= { select }>
                <Controller control= { control } name= "energy_level" defaultValue= "high"
                    render= { ({ field: { onChange, value } }) => (
                        <Autocomplete options= { energy } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                            noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                            onChange= { (e, item) => { onChange(item.id); } }
                            value= { energy.find(data => { return data.id === (getValues().energy_level !== undefined ? getValues().energy_level : value) }) } />
                    ) } />
            </Box>
        </Stack>
    );
}

export default Energy;