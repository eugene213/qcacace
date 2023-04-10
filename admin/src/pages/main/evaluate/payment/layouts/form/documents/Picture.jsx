// Libraries
import { Avatar, Stack, Typography } from "@mui/material";
import { FormCntxt } from "core/context/FormCntxt.func";
import { useContext, useEffect, useState } from "react";

const Picture = ({ fetching }) => {
    const { register, getValues } = useContext(FormCntxt);
    const [ picture, setPicture ] = useState('#');

    useEffect(() => { 
        register('picture'); 
        if(!fetching) { setPicture(getValues().picture !== undefined && getValues().picture !== '' && getValues().picture !== null ? JSON.parse(getValues().picture) : '#'); }
    }, [ fetching, getValues, register ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography gutterBottom sx={{ fontWeight:'600'}}>*Applicant 1X1 picture</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Stack direction= "row" justifyContent= "center" alignItems= "center" 
                    sx= {{ backgroundColor: '#e0e0e0', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                    <Avatar src= { picture } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Picture;