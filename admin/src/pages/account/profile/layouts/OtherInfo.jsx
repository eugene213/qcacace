// Libraries
import { Autocomplete, Box, Checkbox, Grid, Skeleton, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { error, input, select, textarea } from "../index.style"; // Styles
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender
const ul = [{ id: 'admin', name: 'ADMIN' }, { id: 'evaluator', name: 'EVALUATOR' }]; // User Level

const OtherInfo = ({ fetching }) => {
    const { type } = useParams();
    const { register, errors, control, getValues, check, setCheck } = useContext(FormCntxt);
    
    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Given name</Typography>
                    <TextField { ...register('fname') } name= "fname" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.fname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Middle name</Typography>
                    <TextField { ...register('mname') } name= "mname" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.mname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Surname</Typography>
                    <TextField { ...register('lname') } name= "lname" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.lname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Gender</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "gender" defaultValue= "male"
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id } disabled= { type === 'view' }
                                        noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                        onChange= { (e, item) => { onChange(item.id); } }
                                        value= { gender.find(data => { return data.id === (getValues().gender !== undefined ? getValues().gender : value) }) } />
                                ) } />
                    </Box>
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.gender?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*User Level</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "user_level" defaultValue= "evaluator"
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { ul } disableClearable getOptionLabel= { opt => opt.name || opt.id } disabled= { true }
                                        noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                        onChange= { (e, item) => { onChange(item.id); } }
                                        value= { ul.find(data => { return data.id === (getValues().user_level !== undefined ? getValues().user_level : value) }) } />
                                ) } />
                    </Box>
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.gender?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">Address</Typography>
                    <TextareaAutosize name= "address" { ...register('address') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { type === 'view' } />
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom>Status</Typography>
                    { fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Checkbox sx= {{ color: '#919eab', '&.Mui-checked': { color: '#2065d1' } }} name= "status" { ...register('status', { onChange: () => setCheck(!check) }) } 
                                disabled= { type === 'view' } checked= { getValues().status !== undefined ? getValues().status > 0 ? true : false : check } />
                            <Typography gutterBottom sx= {{ marginTop: '7px' }}>{ getValues().status !== undefined ? getValues().status > 0 ? 'Active' : 'Inactive' : check ? 'Active' : 'Inactive' }</Typography>
                        </Box> }
                </Stack>
            </Grid>
        </Grid>
    );
}

export default OtherInfo;