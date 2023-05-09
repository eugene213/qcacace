// Libraries
import { Autocomplete, Box, Grid, InputAdornment, Skeleton, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Function
import { specific, update } from "core/api/index.func"; // API

// Constants
import { btntxt, date, input, select, textarea } from "../index.style"; // Styles
import { personalinformation } from "../index.validation"; // Validation
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const PersonalInformation = () => {
    const { id, userid } = useParams();
    const navigate = useNavigate();
    const { register, errors, getValues, control, handleSubmit, setValidation, setValue, setError } = useContext(FormCntxt);
    const { isFetching: fetching } = 
        useGet({ key: ['fp_specific'], fetch: specific({ table: 'tbl_furr_parent', id: atob(userid) }), options: { refetchOnWindowFocus: false },
            onSuccess: (data) => {
                if(Array.isArray(data)) 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count];
                        setValue(_name, _name === 'gender' && data[0][_name] === null ? 'male' : data[0][_name]);
                    }
            }
        });

    const { mutate: updating } = 
        usePost({ fetch: update,
            onSuccess: (data) => {
                if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                else { successToast(data.message, 3000, navigate(`/pets/${id}/adopt/${userid}/documents`, { replace: true })); }
            }
        });
    
    useEffect(() => { register('application_type', { value: 'online' }); setValidation(personalinformation()); }, [ setValidation, register ]);

    return (
        <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" spacing= { 1 } sx= {{ height: '100%' }}>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Typography variant= "h5" sx={{fontWeight:'600'}} >Personal Information</Typography>
                <form autoComplete= "off">
                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                        <Grid item xs= { 12 } sm= { 6 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx={{fontWeight:'600'}}>*First name</Typography>
                                { fetching ? <Skeleton variant= "rounded" height= "35px" /> :
                                    <TextField { ...register('fname') } name= "fname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } /> }
                                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.fname?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 6 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx={{fontWeight:'600'}}>Middle name</Typography>
                                { fetching ? <Skeleton variant= "rounded" height= "35px" /> :
                                    <TextField { ...register('mname') } name= "mname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } /> }
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 6 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx={{fontWeight:'600'}}>*Last name</Typography>
                                { fetching ? <Skeleton variant= "rounded" height= "35px" /> :
                                    <TextField { ...register('lname') } name= "lname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } /> }
                                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.lname?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 6 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx={{fontWeight:'600'}}>*Birthdate</Typography>
                                { fetching ? <Skeleton variant= "rounded" height= "35px" /> :
                                    <Box sx= { date }>
                                        <Controller control= { control } name= "birthdate" defaultValue= { `${dayjs(new Date()).year()}-${dayjs(new Date()).month() + 1}-${dayjs(new Date()).date()}` }
                                            render= { ({ field: { onChange, value } }) => (
                                                <LocalizationProvider dateAdapter= { AdapterDayjs }>
                                                    <DatePicker value= { value } renderInput= { (params) => <TextField { ...params } variant= "standard" size= "small" fullWidth /> }
                                                        onChange= { e => { onChange(`${dayjs(e).year()}-${dayjs(e).month() + 1}-${dayjs(e).date()}`); } } />
                                                </LocalizationProvider> ) }>
                                        </Controller>
                                    </Box> }
                                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.birthdate?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 7 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx={{fontWeight:'600'}}>*Contact no.</Typography>
                                { fetching ? <Skeleton variant= "rounded" height= "35px" /> :
                                    <TextField { ...register('contact_no') } name= "contact_no" variant= "standard"
                                        InputProps= {{ disableUnderline: true, startAdornment: <InputAdornment position="start">+63</InputAdornment>, }}
                                        inputProps= {{ maxLength: 10 }} sx= { input } /> }
                                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.contact_no?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 5 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography color= "text.secondary" variant= "body2" sx={{fontWeight:'600', color:'black', fontSize:'15px'}}>*Gender</Typography>
                                { fetching ? <Skeleton variant= "rounded" height= "35px" /> :
                                    <Box sx= { select }>
                                        <Controller control= { control } name= "gender" defaultValue= "male"
                                                render= { ({ field: { onChange, value } }) => (
                                                    <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                                                        noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                                        getOptionDisabled= { option => option.id === 0 } onChange= { (e, item) => { onChange(item.id); } }
                                                        value= { gender.find(data => { return data.id === (getValues().gender !== undefined ? getValues().gender : value) }) } />
                                                ) } />
                                    </Box> }
                                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.gender?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography color= "text.secondary" variant= "body2" sx={{fontWeight:'600', color:'black', fontSize:'15px'}}>Address</Typography>
                                { fetching ? <Skeleton variant= "rounded" height= "50px" /> :
                                    <TextareaAutosize name= "address" { ...register('address') } minRows= { 4 } maxRows= { 4 } style= { textarea } /> }
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Stack>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                <Grid item xs= { 12 }>
                    <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" sx= {{ paddingTop: '20px' }}>
                        <Grid item xs= { 12 } md= { 5 } lg= { 3 }>
                            <Box sx= { btntxt } onClick= { handleSubmit(data => { data['id'] = atob(userid); updating({ table: 'tbl_furr_parent', data: data }); }) }>Next</Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default PersonalInformation;