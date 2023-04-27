// Libraries
import { useContext } from "react";
import { Box, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { look, records } from "core/api/index.func"; // APIs
import { useGet, usePost } from "core/global/function/index.func"; // Functions

// Layouts
import Item from "./layouts/Item";
import Dashboard from "./layouts/Dashboard";

// Constants
import { search } from "./index.style"; // Styles

const Index = () => {
    const { setList } = useContext(ListCntxt);
    const { mutate: find, isLoading: finding } = usePost({ fetch: look, onSuccess: data => setList(data) });
    const { isFetching: fetching } = 
        useGet({ key: ['srvc_list'], fetch: records({ table: 'tbl_services', data: {} }), options: { refetchOnWindowFocus: false }, 
            onSuccess: data => {
                let _data = [];
                data.forEach(item => { item['evaluator'] = atob(localStorage.getItem('token')); _data.push(item); });
                setList(_data);
            }
        });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                    <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3c4048' }}>Releasing</Typography>
                    <FontAwesomeIcon icon= { solid('circle') } style= {{ fontSize: '10px' }} />
                    <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3c4048' }}>Pick up</Typography>
                </Stack>
                <Dashboard />
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                    <form autoComplete= "off">
                        <Box sx= { search }>
                            <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
                            <TextField variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true }} placeholder= "Search..." sx= {{ padding: '5px 0 0 0' }}
                                onChange= { e => { find({ table: 'tbl_services', data: { condition: e.target.value !== '' ? (e.target.value).toUpperCase() : e.target.value } }); } } />
                        </Box>
                    </form>
                </Stack>
            </Stack>
            { !fetching && !finding ? <Item /> :
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center" 
                    sx= {{ backgroundColor: '#FFFFFF', padding: '10px 20px', border: 'solid 1px #F3F3F3', borderRadius: '10px' }} spacing= { 2 }>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" sx= {{ flexGrow: 1 }} spacing= { 1 }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ flexGrow: 1 }}>
                            <Skeleton variant= "rounded" sx= {{ width: '50%', height: '10px' }} />
                            <Skeleton variant= "rounded" sx= {{ width: '25%', height: '10px' }} />
                            <Skeleton variant= "rounded" sx= {{ width: '25%', height: '10px' }} />
                        </Stack>
                    </Stack>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                        <Skeleton variant= "rounded" sx= {{ padding: '15px' }} />
                        <Skeleton variant= "rounded" sx= {{ padding: '15px' }} />
                        <Skeleton variant= "rounded" sx= {{ padding: '15px' }} />
                    </Stack>
                </Stack> }
        </Stack>
    );
}

export default Index;