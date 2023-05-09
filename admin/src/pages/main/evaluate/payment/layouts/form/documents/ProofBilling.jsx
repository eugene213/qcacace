// Libraries
import { Avatar, Stack, Typography } from "@mui/material";
import { FormCntxt } from "core/context/FormCntxt.func";
import { useContext, useEffect, useState } from "react";

const ProofBilling = ({ fetching }) => {
    const { register, getValues } = useContext(FormCntxt);
    const [ proof_billing, setProofBilling ] = useState('#');

    useEffect(() => { 
        register('proof_billing'); 
        if(!fetching) { setProofBilling(getValues().proof_billing !== undefined && getValues().proof_billing !== null && getValues().proof_billing !== '' ? JSON.parse(getValues().proof_billing) : '#'); }
    }, [ fetching, getValues, register ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography gutterBottom sx={{ fontWeight:'600'}}>*Proof of Billing/Payslip</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Stack direction= "row" justifyContent= "center" alignItems= "center" 
                    sx= {{ backgroundColor: '#e0e0e0', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                    <Avatar src= { proof_billing } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ProofBilling;