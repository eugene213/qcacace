// Libraries
import { Grid, Skeleton, ThemeProvider } from "@mui/material";
import { useContext, useEffect } from "react";

// Core
import { theme } from "core/global/theme/index.style"; // Theme
import { dropdown } from "core/api/index.func"; // API
import { useGet, usePost } from "core/global/function/index.func"; // Function
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Layouts
import Gender from "./layouts/Gender";
import Sterilization from "./layouts/Sterilization";
import Category from "./layouts/Category";
import Breed from "./layouts/Breed";
import Coat from "./layouts/Coat";
import LifeStages from "./layouts/LifeStages";
import Weight from "./layouts/Weight";
import Energy from "./layouts/Energy";
import Color from "./layouts/Color";
import Tags from "./layouts/Tags";

const Form = () => {
    const { setValue } = useContext(FormCntxt);
    const { data: category, isFetching: categoryfetching } = useGet({ key: ['ctg_dropdown'], fetch: dropdown({ table: 'tbl_category', data: {} }) });
    const { data: breed, mutate: setbreeds, isLoading: breedloading } = usePost({ fetch: dropdown });
    const { data: coat, mutate: setcoat, isLoading: coatloading } = usePost({ fetch: dropdown });
    const { data: lifestages, mutate: setlifestages, isLoading: lifestagesloading } = usePost({ fetch: dropdown });
    const { data: tags, isFetching: tagfetching } = useGet({ key: ['tag_dropdown'], fetch: dropdown({ table: 'tbl_tags', data: {} }) });

    const input = {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': { borderBottom: 'none' },
                    '&:after': { borderBottom: 'none' },
                    '&.Mui-disabled:before': { borderBottom: 'none' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
                },
                input: { textAlign: 'left', textTransform: 'uppercase', fontWeight:'bold' }
            }
        }
    }

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('recommend'));

        if(typeof data === 'object' && data !== null) {
            for(let count = 0; count < (Object.keys(data)).length; count++) {
                let _name = (Object.keys(data))[count];
                setValue(_name, data[_name] !== null ? data[_name] : '');
            }
        }
    }, [ setValue ]);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 }>
            <Grid item xs= { 12 }>
                <ThemeProvider theme= { theme(input) }>
                { categoryfetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : 
                    category?.length > 0 ? 
                        <Category category= { category } setbreeds= { setbreeds } setcoat= { setcoat } setlifestages= { setlifestages } /> : '' }
                </ThemeProvider>
            </Grid>
            <Grid item xs= { 12 } md= { 4 }>
                <ThemeProvider theme= { theme(input) }>
                { breedloading ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : <Breed breed= { breed } breedloading= { breedloading } /> }
                </ThemeProvider>
            </Grid>
            <Grid item xs= { 12 } md= { 4 }>
                <ThemeProvider theme= { theme(input) }>
                { coatloading ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : <Coat coat= { coat } coatloading= { coatloading } /> }
                </ThemeProvider>
            </Grid>
            <Grid item xs= { 12 } md= { 4 }>
                <ThemeProvider theme= { theme(input) }>
                { lifestagesloading ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : <LifeStages lifestages= { lifestages } lifestagesloading= { lifestagesloading } /> }
                </ThemeProvider>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }><ThemeProvider theme= { theme(input) }><Gender /></ThemeProvider></Grid>
            <Grid item xs= { 12 } sm= { 6 }><ThemeProvider theme= { theme(input) }><Sterilization /></ThemeProvider></Grid>
            <Grid item xs= { 12 } sm= { 6 }><ThemeProvider theme= { theme(input) }><Weight /></ThemeProvider></Grid>
            <Grid item xs= { 12 } sm= { 6 }><ThemeProvider theme= { theme(input) }><Energy /></ThemeProvider></Grid>
            <Grid item xs= { 12 }><ThemeProvider theme= { theme(input) }><Color /></ThemeProvider></Grid>
            <Grid item xs= { 12 }>
                <ThemeProvider theme= { theme(input) }>
                { tagfetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : tags.length > 0 ? <Tags tags= { tags } /> : '' }
                </ThemeProvider>
            </Grid>
        </Grid>
    );
}

export default Form;