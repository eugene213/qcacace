// Libraries
import { Avatar, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

const Photo = ({ fetching }) => {
    const { register, getValues } = useContext(FormCntxt);
    const [ pic, setPic ] = useState('#');

    useEffect(() => { register('photo'); if(!fetching) { setPic(getValues().photo !== undefined ? JSON.parse(getValues().photo) : '#'); } }, [ fetching, getValues, register ]);

    return (
        <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ marginBottom: '50px' }}>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "center">
                <Avatar src= { pic } sx= {{ width: '145px', height: '145px', border: 'solid 5px #DFE4EA' }} />
                <Typography variant= "h6" sx= {{ fontWeight: 'bold' }}>#{ getValues()?.series_no }</Typography>
            </Stack>
        </Stack>
    );
}

export default Photo;