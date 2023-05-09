// Libraries
import { Box, Checkbox, Dialog, DialogContent, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { ReminderCntxt } from "core/context/ReminderCntxt.func"; // Context
import { Controller } from "react-hook-form";

const Index = () => {
    const { open, link, setOpen } = useContext(ReminderCntxt);
    const { getValues, setValue, control, handleSubmit, setError, errors } = useContext(FormCntxt);
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    return (
        <Dialog fullScreen= { fullscreen } open= { open } fullWidth maxWidth= "sm">
           <DialogContent sx= {{ padding: '30px 50px' }}>
               <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                   <Typography>You are eligible to adopt if you are at least 18 years old and meet the following condition:</Typography>
                   <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } sx= {{ paddingLeft: '20px' }}>
                       <Typography>* If you are residence of Quezon City.</Typography>
                       <Typography>* If you have the capacity to take care of pet.</Typography>
                   </Stack>
                   <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                       <Typography sx= {{ fontWeight: 'bold', fontStyle: 'italic' }}>Reminder:</Typography>
                       <Typography>The adoption process of QCACAC has (4) phases.</Typography>
                       <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                           <Typography><b>1. Interview.</b> In the process, we need to confirm if you are eligible to adopt and take care of the pet.
                               We conduct the interview through google meet on on-site.</Typography>
                           <Typography variant= "body2" sx= {{ fontStyle: 'italic' }}>Note: The QCACAC staff may also conduct a home visit if needed.</Typography>
                       </Stack>
                       <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                           <Typography><b>2. Documentary Requirements.</b> After the interview, the adopter needs to pass the document requirements for validation purpose 
                               and contract making such as:</Typography>
                           <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } sx= {{ paddingLeft: '20px' }}>
                               <Typography>* QC ID or Brgy. ID.</Typography>
                               <Typography>* 1x1 picture.</Typography>
                               <Typography>* Picture of the house, showing the area designated for the pet.</Typography>
                               <Typography>* Proof of billing / pay slip.</Typography>
                           </Stack>
                       </Stack>
                       <Typography><b>3. Adoption Fee.</b> The QCACAC has an adoption fee of Php 500/pet. (Ordinance No. SP-3132-S-2022).</Typography>
                       <Typography><b>4. Releasing of Pet.</b> Once the three steps are done, you may now claim the pet at QCACAC located at Clemente St., 
                           Lupang Pangako, Payatas, Quezon City.</Typography>
                   </Stack>
                   <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                       <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                           <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                               <Controller control= { control } name= "agree" defaultValue= { false }
                                   render= { ({ field: { onChange } }) => (
                                       <Checkbox sx= {{ color: '#919eab', '&.Mui-checked': { color: '#2065d1' } }}
                                           checked= { getValues().agree ?? true } onChange= { e => { setValue('agree', getValues().agree ?? true); onChange(e.target.checked); } } /> ) 
                                   } />
                           </Box>
                           <Typography>I have read and understood the conditions for adoption process.</Typography>
                       </Stack>
                       <Typography color= "error.main">{ errors.agree?.message }</Typography>
                   </Stack>
                   <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 4 }>
                       <Typography onClick= { () => setOpen(false) } sx= {{ cursor: 'pointer' }}>Cancel</Typography>
                       <Typography sx= {{ cursor: 'pointer' }} onClick= { handleSubmit(data => {
                               if(!(data.agree)) { setError('agree', { message: 'Please check to proceed!' }); }
                               else { navigate(link); }
                           }) }>Proceed</Typography>
                   </Stack>
               </Stack>
           </DialogContent>
        </Dialog>
    );
}

export default Index;