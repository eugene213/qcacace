// Libraries
import { Autocomplete, Box, Grid, Skeleton, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Core
import { dropdown, generateQR, get } from "core/api/index.func"; // APIs
import { useGet, usePost } from "core/global/function/index.func"; // Custom react query
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { error, input, select, textarea } from "../index.style"; // Styles
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const Form = () => {
    const { type } = useParams();
    const { getValues, control, errors, register } = useContext(FormCntxt);
    const [ qrcode, setQrcode ] = useState('');
    const { data: category, isFetching } = useGet(['category'], get({ table: 'tbl_pet_category', type: 'dropdown', query: 'WHERE status= 1 ORDER BY name ASC' }), {});
    const { data: breed, mutate: menu, isLoading } = usePost(dropdown);

    useEffect(() => { if(!isFetching) { if(type !== 'new') { menu({ table: 'tbl_breed', data: { query: getValues()?.category_id} }); } } }, [isFetching, type, menu, getValues]);
    useEffect(() => { if(!isFetching) if(type === 'view') generateQR(getValues().series_no, setQrcode); }, [ isFetching, getValues, type]);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ padding: { xs: '40px 15px', sm: '40px 35px' } }}>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Pet Category</Typography>
                    {
                        isFetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : category?.length > 0 ?
                            <Box sx= { select }>
                                <Controller control= { control } name= "category_id" defaultValue= { 0 }
                                    render= { ({ field: { onChange, value } }) => (
                                        <Autocomplete options= { category } disabled= { type !== 'new' } disableClearable
                                            getOptionLabel= { category => category.name || category.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                            isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                            onChange= { (e, item) => { onChange(item.id); menu({ table: 'tbl_breed', data: { query: item.id } }); } }
                                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                            value= { category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) !== undefined ?
                                                category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) : category?.length === 0 ?
                                                { id: 0, name: '-- SELECT AN ITEM BELOW --' } : category[0] } />
                                    ) } /> 
                            </Box> : ''
                    }
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.category_id?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Breed</Typography>
                    { isFetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : <Box sx= { select }>
                    { !isLoading ?
                        breed !== undefined ?
                            breed.length > 0 ?
                                <Controller control= { control } name= "breed_id" defaultValue= { 0 }
                                    render= { ({ field: { onChange, value } }) => (
                                        <Autocomplete options= { breed } disabled= { type === 'view' } disableClearable
                                            getOptionLabel= { breed => breed.name || breed.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                            isOptionEqualToValue= { (option, value) => option.name === value.name || breed.id === value.id }
                                            onChange= { (e, item) => { onChange(item.id); } }
                                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                            value= { breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) !== undefined ?
                                                breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) : breed.length === 0 ?
                                                { id: 0, name: '-- SELECT AN ITEM BELOW --' } : breed[0] } />
                                    ) } />
                                : <Typography color= "text.disabled">You must create a breed for this category!</Typography>
                            : <Typography color= "text.disabled">Please select a pet category first!</Typography>
                        : <Typography color= "text.disabled">Loading...</Typography> }
                    </Box> }
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.category_id?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">Name</Typography>
                    <TextField { ...register('name') } name= "name" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.name?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Gender</Typography>
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
            <Grid item xs= { 12 } sm= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Age</Typography>
                    <TextField { ...register('age') } name= "age" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.age?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Size</Typography>
                    <TextField { ...register('size') } name= "size" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.size?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Color</Typography>
                    <TextField { ...register('color') } name= "color" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.color?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Tags</Typography>
                    <TextareaAutosize name= "tags" { ...register('tags') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { type === 'view' } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.tags?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Desciprtion</Typography>
                    <TextareaAutosize name= "description" { ...register('description') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { type === 'view' } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.description?.message }</Typography>
                </Stack>
            </Grid>
            { type === 'view' ? 
                <Grid item xs= { 12 }>
                    <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img src= { qrcode } alt= "qrcode" style= {{ width: '250px', height: '250px' }} />
                    </Box>
                </Grid> : '' }
        </Grid>
    );
}

export default Form;