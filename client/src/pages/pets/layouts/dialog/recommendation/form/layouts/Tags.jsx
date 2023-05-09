// Libraries
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { select } from "../../index.style"; // Styles

const Tags = (props) => {
    const { tags } = props;
    const { control, getValues } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography variant= "body2" color= "text.secondary" sx={{ fontWeight:'bold', color:'black', fontSize:'15px'}}>*What personalities of a pet you want to adopt?</Typography>
            <Box sx= { select }>
                <Controller control= { control } name= "tags" defaultValue= { [] }
                    render= { ({ field: { onChange, value } }) => (
                        <Autocomplete options= { tags } multiple disableClearable
                            getOptionLabel= { tags => tags.name || tags.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                            isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                            onChange= { (e, item) => { onChange(item); } }
                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                            value= { getValues().tags !== undefined ? (getValues().tags).length > 0 ? getValues().tags : [] : value }
                            />
                    ) } /> 
            </Box>
        </Stack>
    );
}

export default Tags;