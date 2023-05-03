// Libraries
import { Autocomplete, Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

// Core
import { days, months, years } from "core/constants/Date.const"; // Constants
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { select } from "../index.style"; // Styles

const AppointmentDate = () => {
    const { type } = useParams();
    const [ day, setDay ] = useState(days(new Date().getMonth() + 1, new Date().getFullYear()));
    const { control, getValues } = useContext(FormCntxt);
    
    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Month</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "month" defaultValue= { new Date().getMonth() + 1 }
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { months() } disableClearable getOptionLabel= { opt => opt.name || opt.id } disabled= { type !== 'new' }
                                    noOptionsText= "No results.." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                    renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) }
                                    onChange= { (e, item) => {
                                        onChange(item.id);
                                        setDay(days(item.id, (getValues().byear !== undefined ? getValues().byear : new Date().getFullYear()))); } }
                                    value= { months().find(data => { return data.id === (getValues().month !== undefined ? getValues().month : value) }) } />
                            ) } />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Day</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "day" defaultValue= { new Date().getDate() }
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { day } disableClearable getOptionLabel= { opt => opt.name || opt.id } disabled= { type !== 'new' }
                                    noOptionsText= "No results.." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                    renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) }
                                    onChange= { (e, item) => { onChange(item.id); } }
                                    value= { day.find(data => { return data.id === (getValues().day !== undefined ? getValues().day : value) }) } />
                            ) } />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Year</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "year" defaultValue= { new Date().getFullYear() }
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { years() } disableClearable getOptionLabel= { opt => opt.name || opt.id } disabled= { type !== 'new' }
                                    noOptionsText= "No results.." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                    renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) }
                                    onChange= { (e, item) => {
                                        onChange(item.id);
                                        setDay(days((getValues().bday !== undefined ? getValues().bday : new Date().getDate()), item.id)); } }
                                    value= { years().find(data => { return data.id === (getValues().year !== undefined ? getValues().year : value) }) } />
                            ) } />
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default AppointmentDate;