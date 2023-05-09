// Libraries
import { useContext } from "react";
import { Stack, TextField, Typography } from "@mui/material";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { input } from "../../index.style"; // Styles

const Color = () => {
    const { register } = useContext(FormCntxt);
    
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography variant= "body2" sx={{ fontWeight:'bold', color:'black', fontSize:'15px'}}>*What is your prefer color of a pet?</Typography>
            <TextField { ...register('color') } variant= "standard" size= "small" InputProps= {{ disableUnderline: true }} sx= { input } />
        </Stack>
    )
}

export default Color;