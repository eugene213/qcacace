// Libraries
import { Avatar, Stack, Typography } from "@mui/material";
import { FormCntxt } from "core/context/FormCntxt.func";
import { useContext, useEffect, useState } from "react";

const ValidId = ({ fetching }) => {
    const { register, getValues } = useContext(FormCntxt);
    const [ pet_cage, setPetCage ] = useState('#');

    useEffect(() => { 
        register('pet_cage'); 
        if(!fetching) { setPetCage(getValues().pet_cage !== undefined && getValues().pet_cage !== null && getValues().pet_cage !== '' ? JSON.parse(getValues().pet_cage) : '#'); }
    }, [ fetching, getValues, register ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography gutterBottom sx={{ fontWeight:'600'}}>*Picture Of House's Outside, Showing
                The Area Designated For The Desire Animal For Adoption.</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Stack direction= "row" justifyContent= "center" alignItems= "center" 
                    sx= {{ backgroundColor: '#e0e0e0', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                    <Avatar src= { pet_cage } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ValidId;