//  Libraries
import { Autocomplete, Box, Grid, InputAdornment, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { input, select, textarea } from "../index.style"; // Styles
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const OwnerInformation = () => { 
    const { register, errors, control, getValues } = useContext(FormCntxt);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>*First name</Typography>
                    <TextField { ...register('fname') } name= "fname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.fname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>Middle name</Typography>
                    <TextField { ...register('mname') } name= "mname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.mname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>*Last name</Typography>
                    <TextField { ...register('lname') } name= "lname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.lname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 7 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>*Contact no.</Typography>
                    <TextField { ...register('contact_no') } name= "contact_no" variant= "standard"
                        InputProps= {{ disableUnderline: true, startAdornment: <InputAdornment position="start">+63</InputAdornment>, }}
                        inputProps= {{ maxLength: 10 }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.contact_no?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>*Gender</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "owner_gender" defaultValue= "male"
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                                    noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                    renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                    onChange= { (e, item) => { onChange(item.id); } } disabled= { true }
                                    value= { gender.find(data => { return data.id === (getValues().owner_gender !== undefined ? getValues().owner_gender : value) }) } />
                            ) } />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom variant= "body2" sx={{ fontWeight:'600', color:'black'}}>Address</Typography>
                    <TextareaAutosize name= "address" { ...register('address') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.address?.message }</Typography>
                </Stack>
            </Grid>
            { getValues()?.type !== 'adoption' ? <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom variant= "body2" sx={{ fontWeight:'600', color:'black'}}>*Reason for surrendering</Typography>
                    <TextareaAutosize name= "reason" { ...register('reason') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.reason?.message }</Typography>
                </Stack>
            </Grid> : '' }
        </Grid>
    );
}

export default OwnerInformation;