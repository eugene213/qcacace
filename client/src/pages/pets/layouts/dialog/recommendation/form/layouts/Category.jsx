// Libraries
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { select } from "../../index.style"; // Styles

const Category = (props) => {
    const { category, setbreeds, setcoat, setlifestages } = props;
    const { control, getValues, errors } = useContext(FormCntxt);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('recommend'));

        if(typeof data === 'object' && data !== null) {
            setbreeds({ table: 'tbl_breed', data: { id: data.category_id } });
            setcoat({ table: 'tbl_coat', data: { id: data.category_id } });
            setlifestages({ table: 'tbl_life_stages', data: { id: data.category_id } });
        }
    }, [ setbreeds, setcoat, setlifestages ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography variant= "body2" color= "text.secondary" sx={{ fontWeight:'bold', color:'black', fontSize:'15px'}}>*What type of pet are you interested in adopting?</Typography>
            <Box sx= { select }>
                <Controller control= { control } name= "category_id" defaultValue= { 0 }
                    render= { ({ field: { onChange, value } }) => (
                        <Autocomplete options= { category } disableClearable
                            getOptionLabel= { category => category.name || category.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                            isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                            onChange= { (e, item) => { 
                                onChange(item.id); 
                                setbreeds({ table: 'tbl_breed', data: { id: item.id } }); 
                                setcoat({ table: 'tbl_coat', data: { id: item.id } }); 
                                setlifestages({ table: 'tbl_life_stages', data: { id: item.id } }); 
                            } }
                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                            value= { category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) !== undefined ?
                                            category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) : 
                                            category?.length === 0 ? { id: 0, name: '-- SELECT AN ITEM BELOW --' } : category[0] } /> ) } /> 
            </Box>
            <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.category_id?.message }</Typography>
        </Stack>
    );
}

export default Category;