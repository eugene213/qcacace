// Libraries
import { Autocomplete, Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { months } from "core/constants/Date.const" // Constants;
import { availabledates, save } from "core/api/index.func"; // API
import { successToast, usePost } from "core/global/function/index.func"; // Function

// Constants
import { btntxt, datenormal, dateactive, datedisabled, select } from "../index.style"; // Styles

const Appointment = () => {
    const { id, userid, adoptid } = useParams();
    const navigate = useNavigate();
    const { control, getValues, setValue, handleSubmit, register, errors, setError } = useContext(FormCntxt);
    const [ day, setDay ] = useState();
    const [ available, setAvailable ] = useState([]);
    const { mutate: dates } = usePost({ fetch: availabledates, onSuccess: data => setAvailable(data) });
    const { mutate: saving } =
        usePost({ fetch: save, 
            onSuccess: data => { if(data.result === 'success') successToast(data.message, 3000, navigate(`/pets/${id}/adopt/${userid}/${adoptid}/finish`, { replace: true })); } });

    useEffect(() => { 
        setValue('appmonth', (new Date().getMonth() + 1));
        dates({ month: (new Date()).getMonth() + 1, year: (new Date()).getFullYear() });
        register('appday'); },
    [ setValue, dates, register ]);

    return (
        <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" spacing= { 3 } sx= {{ height: '100%' }}>
            <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch" spacing= { 2 }>
                <Typography variant= "h5" sx={{ fontWeight:'600'}}>Choose appointment schedule</Typography>
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                    <Grid item xs= { 12 } sm= { 6 } md= { 5 }>
                        <Box sx= { select }>
                            <Controller control= { control } name= "appmonth" defaultValue= { new Date().getMonth() + 1 }
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { months() } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                                        noOptionsText= "No results.." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) }
                                        onChange= { (e, item) => { onChange(item.id); dates({ month: item.id, year: (new Date()).getFullYear() }); } }
                                        value= { months().find(data => { return data.id === (getValues().appmonth !== undefined ? getValues().appmonth : value) }) } />
                                ) } />
                        </Box>
                    </Grid>
                    <Grid item xs= { 12 }><Typography variant= "body2" sx={{ fontWeight:'600'}}>Available dates:</Typography></Grid> 
                    <Grid item xs= { 12 }>
                        { available.length > 0 ? 
                            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                                { available?.map((d, index) => (
                                    <Grid item xs= { 3 } key= { index }>
                                        <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ width: '100%', height: '100%' }}>
                                            { d.year < new Date().getFullYear() ?
                                                <Typography variant= "h6" sx= { datedisabled }>{ d.day }</Typography> : 
                                                d.month < (new Date().getMonth() + 1) ?
                                                <Typography variant= "h6" sx= { datedisabled }>{ d.day }</Typography> : 
                                                d.day < new Date().getDate() || d.slot === 0 ?
                                                    <Typography variant= "h6" sx= { datedisabled }>{ d.day }</Typography> :
                                                    <Typography variant= "h6" sx= { day === d.day ? dateactive : datenormal }
                                                        onClick= { () => { setDay(d.day); setValue('appday', d.day); setError('appday', { message: '' }); } }>{ d.day }</Typography> }
                                        </Stack>
                                    </Grid>    
                                )) }
                            </Grid> : <Typography>No record`s found.</Typography> }
                    </Grid>
                    <Grid item xs= { 12 }><Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.appday?.message }</Typography></Grid>
                </Grid>
            </Stack>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }><Box sx= { btntxt } component= { Link } to= { `/pets/${id}/adopt/${userid}/documents` }>Back</Box></Grid>
                <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }>
                    <Box sx= { btntxt } onClick= { handleSubmit(data => {
                        if(data.appday === null || data.appday === undefined) { setError('appday', { message: 'Please select appointment date!' }); }
                        else { 
                            data['id'] = atob(adoptid);
                            data['adopter_id'] = atob(userid);
                            data['appyear'] = new Date().getFullYear();
                            saving({ table: 'tbl_schedule', data: data });
                        }
                    })}>Next</Box>
                </Grid>
            </Grid> 
        </Stack>
    );
}

export default Appointment;