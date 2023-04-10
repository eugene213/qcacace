// Libraries
import { useContext } from "react";
import { Autocomplete, Box, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { useGet } from "core/global/function/index.func"; // Function
import { dropdown } from "core/api/index.func"; // API

// Constants
import { input, select } from "../index.style"; // Styles
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender
const sterilization = [{ id: 'yes', name: 'YES' }, { id: 'no', name: 'NO' }]; // Sterilization
const energy = [{ id: 'high', name: 'HIGH ENERGY' }, { id: 'low', name: 'LOW ENERGY' }]; // Energy
const weight = [{ id: 'underweight', name: 'UNDERWEIGHT' }, { id: 'ideal', name: 'IDEAL' }, { id: 'overweight', name: 'OVERWEIGHT' }]; // Weight

const PetCondition = () => {
    const { control, getValues, errors, register } = useContext(FormCntxt);
    const { data: tags, isFetching: tagfetching } = useGet({ key: ['tag_dropdown'], fetch: dropdown({ table: 'tbl_tags', data: {} }) });

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{ fontWeight:'600', color:'black'}}>*Gender</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "gender" defaultValue= "male"
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                                    noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                    renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                    onChange= { (e, item) => { onChange(item.id); } } disabled= { true }
                                    value= { gender.find(data => { return data.id === (getValues().gender !== undefined ? getValues().gender : value) }) } />
                            ) } />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{ fontWeight:'600', color:'black'}}>*Energy</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "energy_level" defaultValue= "high"
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { energy } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                                        noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                        onChange= { (e, item) => { onChange(item.id); } } disabled= { true }
                                        value= { energy.find(data => { return data.id === (getValues().energy_level !== undefined ? getValues().energy_level : value) }) } />
                                ) } />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight:'600', color:'black' }}>*Spayed or Neutered</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "sterilization" defaultValue= "no"
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { sterilization } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                                        noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                        onChange= { (e, item) => { onChange(item.id); } } disabled= { true }
                                        value= { sterilization.find(data => { return data.id === (getValues().sterilization !== undefined ? getValues().sterilization : value) }) } />
                                ) } />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{ fontWeight:'600', color:'black'}}>*Weight</Typography> 
                    <Box sx= { select }>
                        <Controller control= { control } name= "weight" defaultValue= "ideal"
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { weight } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                                        noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                        onChange= { (e, item) => { onChange(item.id); } } disabled= { true }
                                        value= { weight.find(data => { return data.id === (getValues().weight !== undefined ? getValues().weight : value) }) } />
                                ) } />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{ fontWeight:'600', color:'black'}}>*Color</Typography>
                    <TextField { ...register('color') } name= "color" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.color?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{ fontWeight:'600', color:'black'}}>*Tags</Typography>
                    { tagfetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : tags?.length > 0 ?
                        <Box sx= { select }>
                            <Controller control= { control } name= "tags" defaultValue= { [] }
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { tags } multiple disableClearable
                                        getOptionLabel= { tags => tags.name || tags.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                        isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        onChange= { (e, item) => { onChange(item); } } disabled= { true }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                        value= { getValues().tags !== undefined ? (getValues().tags).length > 0 ? getValues().tags : [] : value }
                                        />
                                ) } /> 
                        </Box> : '' }
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.tags?.message }</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default PetCondition;