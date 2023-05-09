// Libraries
import { Avatar, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

const ValidId = ({ fetching }) => {
    const { register, getValues } = useContext(FormCntxt);
    const [ valid_id, setValidid ] = useState('#');

    useEffect(() => { register('valid_id'); if(!fetching) { setValidid(getValues().valid_id !== undefined ? JSON.parse(getValues().valid_id) : '#'); } }, [ fetching, getValues, register ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography gutterBottom sx={{ fontWeight:'600'}}>*QC ID or Brgy. ID.</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Stack direction= "row" justifyContent= "center" alignItems= "center" 
                    sx= {{ backgroundColor: '#e0e0e0', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                    <Avatar src= { valid_id } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ValidId;