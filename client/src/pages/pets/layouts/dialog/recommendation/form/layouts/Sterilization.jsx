// Libraries
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { select } from "../../index.style"; // Styles
const sterilization = [{ id: 'yes', name: 'YES' }, { id: 'no', name: 'NO' }]; // Sterilization

const Sterilization = () => {
    const { control, getValues } = useContext(FormCntxt);
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography variant= "body2" sx={{ fontWeight:'bold', color:'black', fontSize:'15px'}}>*Is it a Spayed or Neutered?</Typography>
            <Box sx= { select }>
                <Controller control= { control } name= "sterilization" defaultValue= "no"
                    render= { ({ field: { onChange, value } }) => (
                        <Autocomplete options= { sterilization } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                            noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                            onChange= { (e, item) => { onChange(item.id); } }
                            value= { sterilization.find(data => { return data.id === (getValues().sterilization !== undefined ? getValues().sterilization : value) }) } />
                    ) } />
            </Box>
        </Stack>
    );
}

export default Sterilization;